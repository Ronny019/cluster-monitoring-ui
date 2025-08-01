"use client"
import React, { createContext, useContext, useState } from "react";

type ClusterContextType = {
  selectedCluster: string;
  setSelectedCluster: (id: string) => void;
};

const ClusterContext = createContext<ClusterContextType | undefined>(undefined);

export const useCluster = () => {
  const ctx = useContext(ClusterContext);
  if (!ctx) throw new Error("useCluster must be used within ClusterProvider");
  return ctx;
};

export const ClusterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCluster, setSelectedCluster] = useState<string>("");

  return (
    <ClusterContext.Provider value={{ selectedCluster, setSelectedCluster }}>
      {children}
    </ClusterContext.Provider>
  );
};