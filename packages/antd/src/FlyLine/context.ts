import { CSSProperties, createContext } from "react";

export type LabelConfig = {
  show?: boolean;
  text?: string;
  color?: CSSProperties["color"];
  bgColor?: CSSProperties["color"];
  height?: number;
  fontSize?: number;
  maxWidth?: number;
  padding?: number;
  offset?: number;
};

// type LabelConfig = { [P in keyof LabelCfg as `label${Capitalize<string & P>}`]?: LabelCfg[P] | undefined };

export type FlyLineContextValue = {
  /** 显示辅助线, 用于开发时 */
  showAuxiliaryLine?: boolean;
  /** 强制飞线方向; 0: 逆时针 1:顺时针 */
  forceSweep?: 0 | 1;
  // 画布尺寸, 默认均为100%
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  /** 默认颜色 */
  color?: CSSProperties["color"];
  /** 弧顶高度, 越高弧线越弯曲, 为0时表示直线连接 */
  arcHeight?: number;
  label?: LabelConfig;
  active?: {
    color?: CSSProperties["color"];
    label?: LabelConfig;
  };
};
export const defaultContextValue: FlyLineContextValue = {};
export const FlyLineContext = createContext<FlyLineContextValue>(defaultContextValue);
