import React, { useEffect, useState } from "react";
import axios from "axios";
import LogoNexus from "./LogoNexus";
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
      <LogoNexus width={50} height={26} className="mr-2" />
      <select
        className="text-white font-semibold outline-none"
        value={selectedCluster}
        onChange={e => setSelectedCluster(e.target.value)}
      >
        {clusters.map(cluster => (
          <option
            key={cluster.cluster_id}
            value={cluster.cluster_id}
            className="text-black"
            style={{ backgroundColor: "#242C35", color: "#fff"}}
          >
            {cluster.cluster_name}
          </option>
        ))}
      </select>
    </div>
  );
}