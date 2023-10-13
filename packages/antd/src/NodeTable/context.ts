import { createContext } from "react";

const defaultValue = {
  getNodeData: () => null,
};
export type NodeTableContextType = {
  getNodeData: (nodeUid: number) => any;
};

const NodeTableContext = createContext<NodeTableContextType>(defaultValue);
export default NodeTableContext;
