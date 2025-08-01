"use client";
import { useState } from "react";
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

const data1 = [
  { date: "Jul 01", read: 20000, write: 10000 },
  { date: "Jul 02", read: 40000, write: 40000 },
  { date: "Jul 03", read: 60000, write: 30000 },
  { date: "Jul 04", read: 80000, write: 20000 },
  { date: "Jul 05", read: 100000, write: 50000 },
];
// New data for second graph (Throughput in GB/s)
const throughputData1 = [
  { date: "Jul 01", value: 0.5 },
  { date: "Jul 02", value: 1.0 },
  { date: "Jul 03", value: 1.5 },
  { date: "Jul 04", value: 2.0 },
  { date: "Jul 05", value: 2.0 },
];

const throughputData2 = [
  { date: "Jul 01", value: 0.2 },
  { date: "Jul 02", value: 0.8 },
  { date: "Jul 03", value: 1.2 },
  { date: "Jul 04", value: 1.7 },
  { date: "Jul 05", value: 1.9 },
];

function yTickFormatter(value: number) {
  return `${value / 1000}k`;
}

function throughputTickFormatter(value: number) {
  return `${value} GB/s`;
}

export default function Performance() {
  const [selected, setSelected] = useState("Last 7 days");
  const [ReadIOPS, setReadIOPS] = useState<number | null>(0);
  const [WriteIOPS, setWriteIOPS] = useState<number | null>(0);
  const [ReadThroughput, setReadThroughput] = useState<number | null>(null);
  const [WriteThroughput, setWriteThroughput] = useState<number | null>(null);
//   const datapoints = useActiveTooltipDataPoints();

  // Update IOPS values on hover
  const handleIOPSMouseMove = (state: any) => {
    // const datapoints = useActiveTooltipDataPoints();
    // if (state) {
    //   setReadIOPS(state.activePayload[0].value);
    //   setWriteIOPS(state.activePayload[1].value);
    // }
  };

  // Update Throughput values on hover
  const handleThroughputMouseMove = (state: any) => {
    // if (state && state.activePayload && state.activePayload.length >= 2) {
    //   setReadThroughput(state.activePayload[0].value);
    //   setWriteThroughput(state.activePayload[1].value);
    // }
  };

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
              <LineChart data={data1} onMouseMove={handleIOPSMouseMove}>
                <CartesianGrid stroke="#373F48" strokeDasharray="0" vertical={false} />
                <XAxis
                  dataKey="date"
                  type="category"
                  allowDuplicatedCategory={false}
                  tick={{ fill: "#C7CACC", fontFamily: "Nunito", fontSize: 12 }}
                  axisLine={{ stroke: "#373F48" }}
                  tickLine={false}
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
                <Line type="monotone" dataKey="read" data={data1} stroke="#AA7EDD" strokeWidth={2} dot={false} name="Source 1" />
                <Line type="monotone" dataKey="write" data={data1} stroke="#00A3CA" strokeWidth={2} dot={false} name="Source 2" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Readings area */}
        <div className="w-[10%] h-full bg-[#1B222B] rounded-none flex flex-col items-center text-white font-nunito">
          <div className="flex flex-col w-full" style={{ height: "82%" }}>
            <div className="w-full flex items-end justify-start border-b" style={{ borderColor: "#333B4480", height: "34%" }}>
              <span className="font-nunito pb-2 pl-2 text-[#858B90]">IOPS</span>
            </div>
            <div className="w-full flex items-center justify-center border-b" style={{ borderColor: "#333B4480", borderRight: "1px solid #333B4480", background: "#222C36CC", height: "33%" }}>
              <span style={{ color: "#AA7EDD" }}>Read</span>
            </div>
            <div className="w-full flex items-center justify-center border-b" style={{ borderColor: "#333B4480", borderRight: "1px solid #333B4480", background: "#222C36CC", height: "33%" }}>
              <span style={{ color: "#00A3CA" }}>Write</span>
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
              <LineChart data={throughputData1} onMouseMove={handleThroughputMouseMove}>
                <CartesianGrid stroke="#373F48" strokeDasharray="0" vertical={false} />
                <XAxis
                  dataKey="date"
                  type="category"
                  allowDuplicatedCategory={false}
                  tick={{ fill: "#C7CACC", fontFamily: "Nunito", fontSize: 12 }}
                  axisLine={{ stroke: "#373F48" }}
                  tickLine={false}
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
                <Line type="monotone" dataKey="value" data={throughputData1} stroke="#AA7EDD" strokeWidth={2} dot={false} name="Source 1" />
                <Line type="monotone" dataKey="value" data={throughputData2} stroke="#00A3CA" strokeWidth={2} dot={false} name="Source 2" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Second readings area */}
        <div className="w-[10%] h-full bg-[#1B222B] rounded-none flex flex-col items-center text-white font-nunito">
          <div className="flex flex-col w-full" style={{ height: "82%" }}>
            <div className="w-full flex items-end justify-start border-b" style={{ borderColor: "#333B4480", height: "34%" }}>
              <span className="font-nunito pb-2 pl-2 text-[#858B90]">Throughput</span>
            </div>
            <div className="w-full flex items-center justify-center border-b" style={{ borderColor: "#333B4480", borderRight: "1px solid #333B4480", background: "#222C36CC", height: "33%" }}>
              <span style={{ color: "#AA7EDD" }}>Read</span>
            </div>
            <div className="w-full flex items-center justify-center border-b" style={{ borderColor: "#333B4480", borderRight: "1px solid #333B4480", background: "#222C36CC", height: "33%" }}>
              <span style={{ color: "#00A3CA" }}>Write</span>
            </div>
          </div>
          <div className="w-full" style={{ height: "18%" }}></div>
        </div>
      </div>
    </div>
  );
}