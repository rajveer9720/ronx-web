import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";
import "./MatrixChart.css";
import {
  createElementsFromNodes,
  createNodeStyles,
  createEdgeStyles,
  createDagreLayout,
  cleanupCytoscape,
  applyNodeColors,
  GRID_X4,
} from "../../utils/cytoscapeUtils";
import { Box } from "@mui/material";
import { NodeData } from "../../interfaces/grid";

interface GridX4Props {
  nodesData: NodeData[];
}

cytoscape.use(dagre);

const GridX4 = ({ nodesData }: GridX4Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cyRef = useRef<cytoscape.Core | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const [labels, setLabels] = useState<React.ReactNode[]>([]);
  const [height, setHeight] = useState(GRID_X4.DESKTOP_HEIGHT);
  const [responsiveNodeSize, setResponsiveNodeSize] = useState<number>(
    GRID_X4.DESKTOP_NODE_SIZE
  );

  const nodeInfoMap = useMemo(() => {
    const map = new Map();
    nodesData.forEach((node) => map.set(node.id, node));
    return map;
  }, [nodesData]);

  const elements = useMemo(
    () => createElementsFromNodes(nodesData),
    [nodesData]
  );

  const style = useMemo(
    () => [
      ...createNodeStyles("transparent", responsiveNodeSize),
      ...createEdgeStyles(),
    ],
    [responsiveNodeSize]
  );

  const layoutConfig = useMemo(() => createDagreLayout(), []);

  const drawNodeLabels = useCallback(() => {
    const cy = cyRef.current;
    if (!cy) return;

    const newLabels = cy.nodes().map((node) => {
      const pos = node.renderedPosition();
      const id = node.id();
      const nodeInfo = nodeInfoMap.get(id);
      const label = nodeInfo?.label || id;
      const hasLink = Boolean(nodeInfo?.link);

      return (
        <Box
          key={id}
          className="node-label"
          sx={{
            position: "absolute",
            left: `${pos.x}px`,
            top: `${pos.y}px`,
          }}
        >
          {hasLink ? (
            <a href={nodeInfo!.link}>{label}</a>
          ) : (
            <span>{label}</span>
          )}
        </Box>
      );
    });

    setLabels(newLabels);
  }, [nodesData, nodeInfoMap]);

  const refreshGraph = useCallback(() => {
    const cy = cyRef.current;
    if (!cy) return;
    cy.resize();
    cy.fit();
    drawNodeLabels();
  }, [drawNodeLabels]);

  const handleResize = useCallback(() => {
    const isMobile = window.innerWidth <= 600;
    setHeight(isMobile ? GRID_X4.MOBILE_HEIGHT : GRID_X4.DESKTOP_HEIGHT);
    setResponsiveNodeSize(
      isMobile ? GRID_X4.MOBILE_NODE_SIZE : GRID_X4.DESKTOP_NODE_SIZE
    );

    refreshGraph();
  }, [refreshGraph]);

  useEffect(() => {
    const parent = containerRef.current?.parentElement;

    const updateSize = () => {
      if (!parent) return;
      handleResize();
    };

    if (parent) {
      resizeObserverRef.current = new ResizeObserver(updateSize);
      resizeObserverRef.current.observe(parent);
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      resizeObserverRef.current?.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setTimeout(() => {
          const cy = cyRef.current;
          if (cy) {
            cy.resize();
            cy.fit();
            cy.layout(layoutConfig).run();
            drawNodeLabels();
          }
        }, 200);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [layoutConfig, drawNodeLabels]);

  useEffect(() => {
    if (!containerRef.current) return;

    cleanupCytoscape(cyRef.current);

    const cy = cytoscape({
      container: containerRef.current,
      elements,
      style,
      layout: layoutConfig,
      userZoomingEnabled: false,
      userPanningEnabled: false,
      boxSelectionEnabled: false,
      autoungrabify: true,
      autounselectify: true,
    });

    cyRef.current = cy;

    cy.ready(() => {
      applyNodeColors(cy, nodesData);
      cy.nodes().lock();
      cy.fit();
      drawNodeLabels();
    });

    cy.on("render", drawNodeLabels);

    return () => {
      cy.removeListener("render");
      cleanupCytoscape(cyRef.current);
      cyRef.current = null;
    };
  }, [elements, style, layoutConfig, drawNodeLabels, nodesData]);

  return (
    <Box
      className="matrix-container"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: `${height}px`,
        minHeight: `${height}px`,
      }}
    >
      <Box
        className="matrix-graph-container"
        sx={{
          flex: 1,
          position: "relative",
          minHeight: 0,
        }}
      >
        <Box ref={containerRef} className="cytoscape-container" />
        <Box
          className="labels-container"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
          }}
        >
          {labels}
        </Box>
      </Box>
    </Box>
  );
};

export default GridX4;
