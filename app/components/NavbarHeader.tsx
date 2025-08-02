import React, { useEffect, useState } from "react";
import axios from "axios";
import LogoNexus from "./LogoNexus";
import ChevronDownIcon from "./ChevronDownIcon";
import { useCluster } from "../context/ClusterContext"; // adjust path as needed

type Cluster = {
  cluster_id: string;
  cluster_name: string;
};

export default function NavbarHeader() {
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const { selectedCluster, setSelectedCluster } = useCluster();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:3333/data/clusters")
      .then(res => {
        setClusters(res.data);
        if (res.data.length > 0 && !selectedCluster) {
          setSelectedCluster(res.data[0].cluster_id);
        }
      })
      .catch(err => {
        console.error("Error fetching clusters:", err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex items-center">
      <LogoNexus width={50} height={50} className="mr-1" />
      <div className="relative flex items-center">
        <select
          className="text-white outline-none font-nunito text-lg h-[50px] px-2 pr-8 bg-[#242C35]"
          value={selectedCluster}
          onChange={e => setSelectedCluster(e.target.value)}
          style={{
            backgroundColor: "#242C35",
            color: "#fff",
            WebkitAppearance: "none",
            MozAppearance: "none",
            appearance: "none",
          }}
        >
          {clusters.map(cluster => (
            <option
              key={cluster.cluster_id}
              value={cluster.cluster_id}
              className="text-black font-nunito text-lg"
              style={{
                backgroundColor: "#23272f",
                color: "#fff",
              }}
            >
              {cluster.cluster_name}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>
    </div>
  );
}