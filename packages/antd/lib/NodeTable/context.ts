import { createContext } from "react";

export const GetNodeDataContext = createContext<(nodeUid: number) => any>(() => null);
