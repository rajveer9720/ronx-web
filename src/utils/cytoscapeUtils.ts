import cytoscape from "cytoscape";

export const createElementsFromNodes = (nodesData: { id: string }[]) => {
  const nodes = nodesData.map((node) => ({
    data: { id: node.id },
  }));

  const edges = [];
  const nodeIds = nodesData.map((node) => node.id);

  if (nodeIds.includes("1") && nodeIds.includes("3")) {
    edges.push({ data: { id: "e1-3", source: "1", target: "3" } });
  }
  if (nodeIds.includes("1") && nodeIds.includes("4")) {
    edges.push({ data: { id: "e1-4", source: "1", target: "4" } });
  }
  if (nodeIds.includes("2") && nodeIds.includes("5")) {
    edges.push({ data: { id: "e2-5", source: "2", target: "5" } });
  }
  if (nodeIds.includes("2") && nodeIds.includes("6")) {
    edges.push({ data: { id: "e2-6", source: "2", target: "6" } });
  }

  return [...nodes, ...edges];
};

export const createGridX3Elements = (nodesData: { id: string }[]) => {
  const nodes = nodesData.slice(0, 3).map((node) => ({
    data: { id: node.id },
  }));

  return nodes;
};

export const createNodeStyles = (color: string) => [
  {
    selector: "node",
    style: {
      shape: "roundrectangle",
      "background-color": color,
    },
  },
];

export const createEdgeStyles = () => [
  {
    selector: "edge",
    style: {
      width: 2,
      "line-color": "#8e44ec",
      "target-arrow-color": "transparent",
      "target-arrow-shape": "none",
      "curve-style": "bezier",
    },
  },
];

export const createGridLayout = (count: number) => ({
  name: "grid",
  rows: 1,
  cols: count,
  fit: true,
  padding: 10,
});

export const createDagreLayout = () =>
  ({
    name: "dagre",
    rankDir: "TB",
    rankSep: 30,
    nodeSep: 40,
    fit: true,
    padding: 10,
  }) as any;

export const calculateResponsiveHeight = (
  isMobile: boolean,
  parentHeight: number
) => (isMobile ? Math.max(parentHeight, 160) : 160);

export const cleanupCytoscape = (cy: cytoscape.Core | null) => {
  if (cy) {
    try {
      cy.destroy();
    } catch (err) {}
  }
};

export const applyNodeColors = (cy: cytoscape.Core, nodesData: any[]) => {
  cy.nodes().forEach((node) => {
    const nodeData = nodesData.find((n) => n.id === node.id());
    if (nodeData?.nodeColor) {
      node.style("background-color", nodeData.nodeColor);
      node.style("background-opacity", 1);
    }

    node.lock();
  });
};

export const GRID_X3 = {
  DESKTOP_HEIGHT: 100,
  MOBILE_HEIGHT: 0,
  DEFAULT_NODE_SIZE: 50,
};

export const GRID_X4 = {
  DESKTOP_HEIGHT: 200,
  MOBILE_HEIGHT: 180,
  DESKTOP_NODE_SIZE: 60,
  MOBILE_NODE_SIZE: 36,
};
