"use client";
import { useState, useEffect, useMemo } from "react";
import ChevronDownIcon from "../components/ChevronDownIcon";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import axios from "axios";
import { useCluster } from "../context/ClusterContext"; // adjust path as needed
import { format, parseISO, format as formatDate } from "date-fns";

function yTickFormatter(value: number) {
  return `${value / 1000}k`;
}

function throughputTickFormatter(value: number) {
  return `${value} GB/s`;
}

// Helper to show only first, last, and a few in between
function getSparseTickFormatter(data: any[]) {
  if (!data || data.length === 0) return () => "";
  const total = data.length;
  // Show first, last, and 3 in between (adjust as needed)
  const showIndexes = new Set([
    0,
    Math.floor(total / 4),
    Math.floor(total / 2),
    Math.floor((3 * total) / 4),
    total - 1,
  ]);
  return (value: string, index: number) => {
    if (showIndexes.has(index)) {
      try {
        return format(parseISO(value), "MMM dd");
      } catch {
        return value;
      }
    }
    return "";
  };
}

function filterLastNDays(data: any[], days: number) {
  if (!data || data.length === 0) return [];
  const now = new Date();
  const cutoff = new Date(now);
  cutoff.setDate(now.getDate() - (days - 1));
  return data.filter((d) => {
    try {
      const dt = parseISO(d.datetime);
      return dt >= cutoff && dt <= now;
    } catch {
      return false;
    }
  });
}

export default function Performance() {
  const { selectedCluster } = useCluster();
  const [selected, setSelected] = useState("Last 7 days");
  const [IOPSData, setIOPSData] = useState<any[]>([]);
  const [throughputData, setThroughputData] = useState<any[]>([]);

  // State for latest values
  const [latestIOPS, setLatestIOPS] = useState<{ read: number; write: number } | null>(null);
  const [latestThroughput, setLatestThroughput] = useState<{ read: number; write: number } | null>(null);

  // Fetch IOPS and Throughput data when selectedCluster changes
  useEffect(() => {
    if (!selectedCluster) return;

    axios
      .get(`http://127.0.0.1:3333/data/timeseries?cluster_id=${selectedCluster}&type=IOPS`)
      .then(res => {
        // Expecting: { data: [{ datetime, read, write }, ...] }
        setIOPSData(res.data[0].data || []);
      })
      .catch(err => {
        setIOPSData([]);
        console.error("Error fetching IOPS data:", err);
      });

    axios
      .get(`http://127.0.0.1:3333/data/timeseries?cluster_id=${selectedCluster}&type=Throughput`)
      .then(res => {
        setThroughputData(res.data[0].data || []);
      })
      .catch(err => {
        setThroughputData([]);
        console.error("Error fetching Throughput data:", err);
      });
  }, [selectedCluster]);

  // Only show last 7 days of data
  const filteredIOPSData = useMemo(() => filterLastNDays(IOPSData, 7), [IOPSData]);
  const filteredThroughputData = useMemo(() => filterLastNDays(throughputData, 7), [throughputData]);

  const iopsTickFormatter = useMemo(() => getSparseTickFormatter(filteredIOPSData), [filteredIOPSData]);
  const throughputTickFormatterX = useMemo(() => getSparseTickFormatter(filteredThroughputData), [filteredThroughputData]);

  // Format: Dec. 5, 10:14am
  const now = formatDate(new Date(), "MMM. d, h:mmaaa").replace("AM", "am").replace("PM", "pm");

  // Find the data point with the latest datetime
  useEffect(() => {
    if (filteredIOPSData.length > 0) {
      const latest = filteredIOPSData.reduce((a, b) =>
        parseISO(a.datetime) > parseISO(b.datetime) ? a : b
      );
      setLatestIOPS({ read: latest.read, write: latest.write });
    } else {
      setLatestIOPS(null);
    }
  }, [filteredIOPSData]);

  useEffect(() => {
    if (filteredThroughputData.length > 0) {
      const latest = filteredThroughputData.reduce((a, b) =>
        parseISO(a.datetime) > parseISO(b.datetime) ? a : b
      );
      setLatestThroughput({ read: latest.read, write: latest.write });
    } else {
      setLatestThroughput(null);
    }
  }, [filteredThroughputData]);

  return (
    <div className="flex flex-col min-h-screen bg-[#1B222B] overflow-hidden">
      {/* Top bar with title and select */}
      <div className="flex w-full justify-between items-start pt-6 pl-6 pr-6">
        <div className="font-nunito font-light text-[21px] leading-[32px] tracking-[0px] align-bottom">
          Performance Metrics
        </div>
        <div className="relative flex items-center">
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="bg-[#222C36] border border-[#373F48] min-w-[140px] h-[24px] pl-2 pr-8 rounded-none font-nunito font-normal text-[14px] text-white text-center appearance-none flex items-center justify-center"
          >
            <option className="text-center">Last 7 days</option>
          </select>
          <span className="absolute right-2 pointer-events-none flex items-center h-full">
            <ChevronDownIcon className="h-5 w-5 text-gray-400" />
          </span>
        </div>
      </div>
      {/* Graph section below the top bar */}
      <div className="w-[calc(100%-48px)] h-[192px] bg-[#242C35] rounded-none mt-8 ml-6 mr-6 flex items-center justify-start p-0">
        {/* Graph area */}
        <div className="w-[90%] h-full flex flex-col">
          {/* Title section (top 25%) */}
          <div className="h-[25%] w-full flex items-end justify-between font-nunito font-normal text-[16px] pb-2 pl-4 pr-4 text-[#C7CACC]" style={{ background: "#1B222C" }}>
            <span>IOPS</span>
            <span className="text-xs text-white opacity-70 self-end">{now}</span>
          </div>
          {/* Graph plot section (bottom 75%) */}
          <div className="h-[75%] w-full flex items-center justify-center" style={{ background: "#1B222C" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredIOPSData}>
                <CartesianGrid stroke="#373F48" strokeDasharray="0" vertical={false} />
                <XAxis
                  dataKey="datetime"
                  type="category"
                  allowDuplicatedCategory={false}
                  tick={{ fill: "#C7CACC", fontFamily: "Nunito", fontSize: 12 }}
                  axisLine={{ stroke: "#373F48" }}
                  tickLine={false}
                  interval="preserveStartEnd"
                  tickFormatter={iopsTickFormatter}
                />
                <YAxis
                  tickFormatter={yTickFormatter}
                  ticks={[0, 50000, 100000]}
                  domain={[0, 100000]}
                  tick={{ fill: "#C7CACC", fontFamily: "Nunito", fontSize: 12 }}
                  axisLine={false} // <-- Remove the left border
                  tickLine={false}
                />
                {/* <Tooltip /> */}
                <Line type="monotone" dataKey="read" stroke="#AA7EDD" strokeWidth={2} dot={false} name="Read" />
                <Line type="monotone" dataKey="write" stroke="#00A3CA" strokeWidth={2} dot={false} name="Write" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Readings area */}
        <div className="w-[10%] h-full bg-[#1B222B] rounded-none flex flex-col items-start text-white font-nunito justify-center">
          <div className="flex flex-col w-full h-full justify-center">
            <div
              className="w-full flex items-end justify-start border-b"
              style={{ borderColor: "#333B4480", height: "34%" }}
            >
              <span className="font-nunito pb-2 pl-2 text-[#858B90]">IOPS</span>
            </div>
            <div
              className="w-full flex flex-col items-start justify-center border-b border-l"
              style={{
                borderColor: "#333B4480",
                borderLeft: "1px solid #333B4480",
                borderRight: "1px solid #333B4480",
                background: "#222C36CC",
                height: "33%",
              }}
            >
              <span className="text-xs text-left pl-2 pt-1 pb-0" style={{ color: "#A6AAAE" }}>Read</span>
              <span style={{ color: "#AA7EDD", marginLeft: 8 }}>
                {latestIOPS?.read}
                <span style={{ fontSize: "0.8em", marginLeft: 2 }}>IOPS</span>
              </span>
            </div>
            <div
              className="w-full flex flex-col items-start justify-center border-b border-l"
              style={{
                borderColor: "#333B4480",
                borderLeft: "1px solid #333B4480",
                borderRight: "1px solid #333B4480",
                background: "#222C36CC",
                height: "33%",
              }}
            >
              <span className="text-xs text-left pl-2 pt-1 pb-0" style={{ color: "#A6AAAE" }}>Write</span>
              <span style={{ color: "#00A3CA", marginLeft: 8 }}>
                {latestIOPS?.write}
                <span style={{ fontSize: "0.8em", marginLeft: 2 }}>IOPS</span>
              </span>
            </div>
          </div>
          <div className="w-full" style={{ height: "18%" }}></div>
        </div>
      </div>
      {/* Second graph section below the first one */}
      <div className="w-[calc(100%-48px)] h-[192px] bg-[#242C35] rounded-none mt-6 ml-6 mr-6 flex items-center justify-start p-0">
        {/* Second graph area */}
        <div className="w-[90%] h-full flex flex-col">
          {/* Title section (top 25%) */}
          <div className="h-[25%] w-full flex items-end justify-between font-nunito font-normal text-[16px] pb-2 pl-4 pr-4 text-[#C7CACC]" style={{ background: "#1B222C" }}>
            <span>Throughput</span>
            <span className="text-xs text-white opacity-70 self-end">{now}</span>
          </div>
          {/* Graph plot section (bottom 75%) */}
          <div className="h-[75%] w-full flex items-center justify-center" style={{ background: "#1B222C" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredThroughputData}>
                <CartesianGrid stroke="#373F48" strokeDasharray="0" vertical={false} />
                <XAxis
                  dataKey="datetime"
                  type="category"
                  allowDuplicatedCategory={false}
                  tick={{ fill: "#C7CACC", fontFamily: "Nunito", fontSize: 12 }}
                  axisLine={{ stroke: "#373F48" }}
                  tickLine={false}
                  interval="preserveStartEnd"
                  tickFormatter={throughputTickFormatterX}
                />
                <YAxis
                  tickFormatter={throughputTickFormatter}
                  ticks={[0, 1, 2]}
                  domain={[0, 2]}
                  tick={{ fill: "#C7CACC", fontFamily: "Nunito", fontSize: 12 }}
                  axisLine={false} // <-- Remove the left border
                  tickLine={false}
                />
                {/* <Tooltip /> */}
                <Line type="monotone" dataKey="read" stroke="#AA7EDD" strokeWidth={2} dot={false} name="Read" />
                <Line type="monotone" dataKey="write" stroke="#00A3CA" strokeWidth={2} dot={false} name="Write" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Second readings area */}
        <div className="w-[10%] h-full bg-[#1B222B] rounded-none flex flex-col items-start text-white font-nunito justify-center">
          <div className="flex flex-col w-full h-full justify-center">
            <div
              className="w-full flex items-end justify-start border-b"
              style={{ borderColor: "#333B4480", height: "34%" }}
            >
              <span className="font-nunito pb-2 pl-2 text-[#858B90]">Throughput</span>
            </div>
            <div
              className="w-full flex flex-col items-start justify-center border-b border-l"
              style={{
                borderColor: "#333B4480",
                borderLeft: "1px solid #333B4480",
                borderRight: "1px solid #333B4480",
                background: "#222C36CC",
                height: "33%",
              }}
            >
              <span className="text-xs text-left pl-2 pt-1 pb-0" style={{ color: "#A6AAAE" }}>Read</span>
              <span style={{ color: "#AA7EDD", marginLeft: 8 }}>
                {latestThroughput?.read}
                <span style={{ fontSize: "0.8em", marginLeft: 2 }}>GB/s</span>
              </span>
            </div>
            <div
              className="w-full flex flex-col items-start justify-center border-b border-l"
              style={{
                borderColor: "#333B4480",
                borderLeft: "1px solid #333B4480",
                borderRight: "1px solid #333B4480",
                background: "#222C36CC",
                height: "33%",
              }}
            >
              <span className="text-xs text-left pl-2 pt-1 pb-0" style={{ color: "#A6AAAE" }}>Write</span>
              <span style={{ color: "#00A3CA", marginLeft: 8 }}>
                {latestThroughput?.write}
                <span style={{ fontSize: "0.8em", marginLeft: 2 }}>GB/s</span>
              </span>
            </div>
          </div>
          <div className="w-full" style={{ height: "18%" }}></div>
        </div>
      </div>
    </div>
  );
}