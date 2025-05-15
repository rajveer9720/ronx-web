import { useEffect, useRef } from "react";
import { Network } from "vis-network/standalone";
import { DataSet } from "vis-data";

interface VisNode {
  id: number;
  label: string;
  level: number;
  value: number;
  color: string;
}

interface VisEdge {
  id?: number;
  from: number;
  to: number;
}

const MatrixChart: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const nodes = new DataSet<VisNode>([
      { id: 1, label: "", level: 0, value: 40, color: "#FFD700" },
      { id: 2, label: "", level: 1, value: 30, color: "#ffffff" },
      { id: 3, label: "", level: 1, value: 30, color: "#ffffff" },
      { id: 4, label: "", level: 2, value: 20, color: "#FF8800" },
      { id: 5, label: "", level: 2, value: 20, color: "#ffffff" },
      { id: 6, label: "", level: 2, value: 20, color: "#ffffff" },
    ]);

    const edges = new DataSet<VisEdge>([
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
      { from: 3, to: 6 },
    ]);

    const options: import("vis-network").Options = {
      layout: {
        hierarchical: {
          direction: "UD",
          nodeSpacing: 100,
          levelSeparation: 0,
        },
      },
      nodes: {
        shape: "dot",
        size: 10,
        font: { color: "#fff", size: 12, face: "Arial" },
        scaling: { min: 10, max: 40 },
      },
      edges: {
        arrows: { to: false },
        color: "#aaa",
        smooth: true,
      },
      // interaction: { hover: true },
      physics: false,
    };

    const network = new Network(containerRef.current, { nodes, edges }, options);
    return () => network.destroy();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#3167eb",
        borderRadius: "20px",
        padding: "20px",
        width: "250px",
        height: "250px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        color: "white",
      }}
    >
      <div style={{ fontSize: "16px", fontWeight: 600, marginBottom: "10px" }}>
        Lvl 1 <span style={{ float: "right" }}>🪙 8</span>
      </div>
      <div
        ref={containerRef}
        style={{
          flex: 1,
          minHeight: "150px",
        }}
      />
      <div style={{ marginTop: "10px", fontSize: "14px", display: "flex", justifyContent: "space-between" }}>
        <span>👥 5281</span>
        <span>🔁 427</span>
      </div>
    </div>
  );
};

export default MatrixChart;