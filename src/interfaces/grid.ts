export interface INodeData {
  id: string;
  label?: string;
  link?: string;
  nodeColor?: string;
  nodeSize?: number;
  spillInfo?: {
    spill_up: boolean;
    spill_down: boolean;
  };
}