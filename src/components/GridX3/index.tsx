import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import cytoscape from "cytoscape";
import "./simpleMatrix.css";
import {
  createGridX3Elements,
  createNodeStyles,
  createGridLayout,
  cleanupCytoscape,
  applyNodeColors,
  GRID_X3,
} from "../../utils/cytoscapeUtils";
import { Box } from "@mui/material";
import { NodeData } from "../../interfaces/grid";

interface GridX3Props {
  nodesData: NodeData[];
}

const GridX3 = ({ nodesData }: GridX3Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cyRef = useRef<cytoscape.Core | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const [labels, setLabels] = useState<React.ReactNode[]>([]);
  const [height, setHeight] = useState(GRID_X3.DESKTOP_HEIGHT);

  const elements = useMemo(() => createGridX3Elements(nodesData), [nodesData]);
  const style = useMemo(
    () => createNodeStyles("#7b3de4", GRID_X3.DEFAULT_NODE_SIZE),
    []
  );
  const layoutConfig = useMemo(
    () => createGridLayout(Math.min(nodesData.length, 3)),
    [nodesData.length]
  );

  const nodeInfoMap = useMemo(() => {
    const map = new Map();
    nodesData.forEach((node) => map.set(node.id, node));
    return map;
  }, [nodesData]);

  const drawNodeLabels = useCallback(() => {
    const cy = cyRef.current;
    if (!cy) return;

    const isMobile = window.innerWidth <= 600;
    const offsetY = isMobile ? 12 : 16;

    const newLabels = cy.nodes().map((node) => {
      const pos = node.renderedPosition();
      const id = node.id();
      const nodeInfo = nodeInfoMap.get(id);
      const label = nodeInfo?.label || id;
      const hasLink = Boolean(nodeInfo?.link);

      return (
        <Box
          key={id}
          className={`matrix-node-label ${hasLink ? "has-link" : "no-link"}`}
          sx={{
            position: "absolute",
            left: `${pos.x}px`,
            top: `${pos.y + GRID_X3.DEFAULT_NODE_SIZE / 2 + offsetY}px`,
            transform: "translateX(-50%)",
            textAlign: "center",
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
  }, [nodeInfoMap]);

  const resizeAndRender = useCallback(() => {
    const cy = cyRef.current;
    if (!cy) return;
    cy.resize();
    cy.fit();
    drawNodeLabels();
  }, [drawNodeLabels]);

  useEffect(() => {
    const updateSize = () => {
      const parent =
        containerRef.current?.parentElement ?? containerRef.current;
      if (!parent) return;

      const isMobile = window.innerWidth <= 600;
      setHeight(isMobile ? GRID_X3.MOBILE_HEIGHT : GRID_X3.DESKTOP_HEIGHT);

      resizeAndRender();
    };

    resizeObserverRef.current = new ResizeObserver(updateSize);
    const parent = containerRef.current?.parentElement ?? containerRef.current;
    if (parent) resizeObserverRef.current.observe(parent);

    updateSize();

    window.addEventListener("resize", updateSize);
    return () => {
      resizeObserverRef.current?.disconnect();
      window.removeEventListener("resize", updateSize);
    };
  }, [resizeAndRender]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        requestAnimationFrame(() => {
          const cy = cyRef.current;
          if (cy) {
            cy.resize();
            cy.fit();
            cy.layout(layoutConfig).run();
            drawNodeLabels();
          }
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [layoutConfig, drawNodeLabels]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    cleanupCytoscape(cyRef.current);

    const cy = cytoscape({
      container,
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

    const handleRender = () => drawNodeLabels();
    cy.on("render", handleRender);

    cy.ready(() => {
      applyNodeColors(cy, nodesData);
      cy.nodes().lock();
      cy.resize();
      cy.fit();
      drawNodeLabels();
    });

    return () => {
      cy.off("render", handleRender);
      cleanupCytoscape(cyRef.current);
      cyRef.current = null;
    };
  }, [elements, style, layoutConfig, drawNodeLabels, nodesData]);

  return (
    <Box className="matrix-card" sx={{ height: `${height}px` }}>
      <Box className="matrix-graph" position="relative" flex={1}>
        <Box ref={containerRef} className="cytoscape-container" />
        <Box
          className="labels-container"
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={1}
        >
          {labels}
        </Box>
      </Box>
    </Box>
  );
};

export default GridX3;
