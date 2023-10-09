import { createContext } from "react";

export type FlyLineContextValue = {
  /** 显示辅助线, 用于开发时 */
  showAuxiliaryLine?: boolean;
  /** 强制飞线方向; 0: 逆时针 1:顺时针 */
  forceSweep?: 0 | 1;
};
export const defaultContextValue = {
};
export const FlyLineContext = createContext<FlyLineContextValue>(defaultContextValue);
