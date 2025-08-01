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
import { format, parseISO } from "date-fns";

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

export default function Performance() {
  const { selectedCluster } = useCluster();
  const [selected, setSelected] = useState("Last 7 days");
  const [IOPSData, setIOPSData] = useState<any[]>([]);
  const [throughputData, setThroughputData] = useState<any[]>([]);

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

  const iopsTickFormatter = useMemo(() => getSparseTickFormatter(IOPSData), [IOPSData]);
  const throughputTickFormatterX = useMemo(() => getSparseTickFormatter(throughputData), [throughputData]);

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
            <option className="text-center">Last 24 hours</option>
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
          <div className="h-[25%] w-full flex items-end justify-start font-nunito font-normal text-[16px] pb-2 pl-4 text-[#C7CACC]" style={{ background: "#1B222C" }}>
            IOPS
          </div>
          {/* Graph plot section (bottom 75%) */}
          <div className="h-[75%] w-full flex items-center justify-center" style={{ background: "#1B222C" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={IOPSData}>
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
                  axisLine={{ stroke: "#373F48" }}
                  tickLine={false}
                />
                <Tooltip />
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
              className="w-full flex items-center justify-start border-b border-l"
              style={{
                borderColor: "#333B4480",
                borderLeft: "1px solid #333B4480",
                borderRight: "1px solid #333B4480",
                background: "#222C36CC",
                height: "33%",
              }}
            >
              <span style={{ color: "#AA7EDD", marginLeft: 8 }}>Read</span>
            </div>
            <div
              className="w-full flex items-center justify-start border-b border-l"
              style={{
                borderColor: "#333B4480",
                borderLeft: "1px solid #333B4480",
                borderRight: "1px solid #333B4480",
                background: "#222C36CC",
                height: "33%",
              }}
            >
              <span style={{ color: "#00A3CA", marginLeft: 8 }}>Write</span>
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
          <div className="h-[25%] w-full flex items-end justify-start font-nunito font-normal text-[16px] pb-2 pl-4 text-[#C7CACC]" style={{ background: "#1B222C" }}>
            Throughput
          </div>
          {/* Graph plot section (bottom 75%) */}
          <div className="h-[75%] w-full flex items-center justify-center" style={{ background: "#1B222C" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={throughputData}>
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
                  axisLine={{ stroke: "#373F48" }}
                  tickLine={false}
                />
                <Tooltip />
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
              className="w-full flex items-center justify-start border-b border-l"
              style={{
                borderColor: "#333B4480",
                borderLeft: "1px solid #333B4480",
                borderRight: "1px solid #333B4480",
                background: "#222C36CC",
                height: "33%",
              }}
            >
              <span style={{ color: "#AA7EDD", marginLeft: 8 }}>Read</span>
            </div>
            <div
              className="w-full flex items-center justify-start border-b border-l"
              style={{
                borderColor: "#333B4480",
                borderLeft: "1px solid #333B4480",
                borderRight: "1px solid #333B4480",
                background: "#222C36CC",
                height: "33%",
              }}
            >
              <span style={{ color: "#00A3CA", marginLeft: 8 }}>Write</span>
            </div>
          </div>
          <div className="w-full" style={{ height: "18%" }}></div>
        </div>
      </div>
    </div>
  );
}