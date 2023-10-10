import { CSSProperties, memo, useContext } from "react";
import SvgLabel from "./SvgLabel";
import SvgMarker from "./SvgMarker";
import { FlyLineContext, LabelConfig } from "./context";

export type SvgLineProps = {
  /** 飞线唯一id */
  uid: string;
  /** 飞线起点x */
  x1: number;
  /** 飞线起点y */
  y1: number;
  /** 飞线终点x */
  x2: number;
  /** 飞线终点y */
  y2: number;

  // 其他配置, 分为默认状态下的配置及active状态下的
  label?: LabelConfig;
  color?: CSSProperties["color"];
  arcHeight?: number;
  /** 是否为活跃态, 为true时使用active下的配置 */
  isActive?: boolean;
  active?: {
    color?: CSSProperties["color"];
    label?: LabelConfig;
  };
};

function InternalSvgLine(props: SvgLineProps) {
  const { uid, x1, y1, x2, y2, color, arcHeight, label, isActive, active } = props;

  const {
    showAuxiliaryLine,
    color: globalDefaultColor,
    active: globalActiveConfig,
    arcHeight: globalArcHeight,
    label: globalLabel,
  } = useContext(FlyLineContext);

  const defaultColor = color ?? globalDefaultColor ?? "#8BDCA7";
  const activeColor = active?.color ?? globalActiveConfig?.color ?? "#17BA4F";
  const arcH = arcHeight ?? globalArcHeight ?? 24;

  const lineMiddle = [(x1 + x2) / 2, (y1 + y2) / 2];
  const alpha = Math.atan(-(y2 - y1) / (x2 - x1)); // y轴翻转, 故而取反
  const arcMiddle = [lineMiddle[0] - arcH * Math.sin(alpha), lineMiddle[1] - arcH * Math.cos(alpha)];
  const control = [lineMiddle[0] - arcH * 2 * Math.sin(alpha), lineMiddle[1] - arcH * 2 * Math.cos(alpha)];
  const path = `M ${x1} ${y1} Q ${control[0]} ${control[1]} ${x2} ${y2}`;
  const pathId = `path:${path}`.replace(/\s+/g, "-");

  const currentColor = isActive ? activeColor : defaultColor;

  const showDefaultLabel = globalLabel?.show ?? label?.show;
  const showActiveLabel = globalActiveConfig?.label?.show ?? showDefaultLabel;
  const defaultLabelTxt = label?.text ?? "";
  const activeLabelTxt = active?.label?.text ?? defaultLabelTxt;

  return (
    <g>
      <defs>
        <path id={pathId} d={path} fill="transparent" />
      </defs>

      {/* line */}
      <g>
        <use
          href={`#${pathId}`}
          fill="none"
          pointerEvents="none"
          strokeLinejoin="round"
          stroke={currentColor}
          strokeWidth="1"
          markerEnd={`url(#${SvgMarker.getIdByColor(currentColor)})`}
          style={{ transition: "stroke .3s" }}
          // strokeDasharray={dasharray}
        />
        <use
          data-link-role="path"
          data-link-uid={uid}
          href={`#${pathId}`}
          fill="none"
          cursor="pointer"
          stroke="transparent"
          strokeLinecap="butt"
          strokeLinejoin="round"
          strokeWidth="12"
          style={{ pointerEvents: "stroke", zIndex: 10 }} // 仅仅响应stroke上的事件
        />
      </g>

      {/* 开发时的辅助线 */}
      {showAuxiliaryLine && (
        <g>
          <line aria-description="起始点连接线" x1={x1} y1={y1} x2={x2} y2={y2} strokeDasharray={3} stroke="#d6cccc" />
          <circle aria-description="起始点连接线中点" cx={lineMiddle[0]} cy={lineMiddle[1]} r="2" fill="grey" />
          {arcMiddle && (
            <line
              aria-description="起始点连接线的中垂线"
              x1={arcMiddle[0]}
              y1={arcMiddle[1]}
              x2={lineMiddle[0]}
              y2={lineMiddle[1]}
              strokeDasharray={3}
              stroke="#d6cccc"
            />
          )}
          {arcMiddle && (
            <circle aria-description="圆弧线中点" name="center" cx={arcMiddle[0]} cy={arcMiddle[1]} r="2" fill="lime" />
          )}
        </g>
      )}

      {/*
          feature(将来优化): color可能有透明度, 传递给label前需要移除透明度, 暂不考虑rgb等其他颜色标识
          red => red
          #0003 => #000
          #5CA3FF11 => #5CA3FF
       */}
      {((!isActive && showDefaultLabel) || (isActive && showActiveLabel)) && (
        <SvgLabel
          linkUid={uid}
          alpha={alpha}
          x={arcMiddle[0]}
          y={arcMiddle[1]}
          {...{ ...label, text: defaultLabelTxt }}
          isActive={isActive}
          active={{ ...active?.label, text: activeLabelTxt }}
        />
      )}
    </g>
  );
}

const SvgLine = memo(InternalSvgLine);
export default SvgLine;
