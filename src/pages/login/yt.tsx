import { useEffect, useRef } from "react";
import { Network, Node, Options } from "vis-network/standalone";
import { DataSet } from "vis-data";

const MatrixChart: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const nodes = new DataSet<Node>([
    { id: 1, label: "12345", color: "#FFD700", value: 40, level: 1 },
    { id: 2, label: "12345", color: "#ffffff", value: 30, level: 2 },
    { id: 3, label: "12345", color: "#ffffff", value: 30, level: 3 },
    { id: 4, label: "12345", color: "#FF8800", value: 20, level: 4 },
    { id: 5, label: "12345", color: "#ffffff", value: 20, level: 5 },
    { id: 6, label: "12345", color: "#ffffff", value: 20, level: 6 },
  ]);

  const options: Options = {
    layout: {
      hierarchical: {
        // enable: true,
        direction: "UD",
        nodeSpacing: 100,
        levelSeparation: 100,
      },
    },
    nodes: {
      shape: "circle",
      size: 100,
      // font: { color: "#fff", size: 12, face: "Arial" },
      scaling: { min: 10, max: 40 },
    },
    interaction: {
      dragNodes: false,
      dragView: false,
    },
    // physics: false,
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const network = new Network(containerRef.current, { nodes }, options);
    return () => network.destroy();
  });

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
      <div
        style={{
          marginTop: "10px",
          fontSize: "14px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>👥 5281</span>
        <span>🔁 427</span>
      </div>
    </div>
  );
};

export default MatrixChart;
