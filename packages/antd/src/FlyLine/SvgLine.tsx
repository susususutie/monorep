import { memo } from "react";
import SvgLabel from "./SvgLabel";
import SvgMarker from "./SvgMarker";
import { getPointDistance } from "./tool";

type SvgLineProps = {
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
  /** 浅色 */
  lightColor: string;
  /** 深色 */
  darkColor: string;
  /** label内容 */
  label?: string;
  /** 是否高亮该飞线, 高亮后切换线条深浅色, 显示label */
  isHighlight?: boolean;
};

function InternalSvgLine(props: SvgLineProps) {
  const { uid, x1, y1, x2, y2, label: labelText, lightColor, darkColor, isHighlight } = props;

  const {
    alpha,
    circle,
    label: labelHoverPosition,
    label2: labelPosition,
    center,
    middle,
  } = getPath([x1, y1], [x2, y2]);
  const sweep = x2 - x1 >= 0 ? 1 : 0; // ? 是否逆时针
  const path = `M ${x1} ${y1} A ${circle.r} ${circle.r} ${circle.crs} 0 ${sweep} ${x2} ${y2}`;
  const pathId = `path:${path}`.replace(/\s+/g, "-");
  // const dasharray = isDash ? 3 : undefined;

  const color = isHighlight ? darkColor : lightColor;

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
          stroke={color}
          strokeWidth="1"
          markerEnd={`url(#${SvgMarker.getIdByColor(color)})`}
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
      {/* <g>
        <line aria-description="起始点连接线" x1={x1} y1={y1} x2={x2} y2={y2} strokeDasharray={3} stroke="#d6cccc" />
        <line
          aria-description="起始点连接线的中垂线"
          x1={center[0]}
          y1={center[1]}
          x2={middle[0]}
          y2={middle[1]}
          strokeDasharray={3}
          stroke="#d6cccc"
        />
        <circle aria-description="起始点连接线中点" cx={middle[0]} cy={middle[1]} r="2" fill="grey" />
        <circle aria-description="圆弧线中点" name="center" cx={center[0]} cy={center[1]} r="2" fill="lime" />
        <circle
          aria-description="圆弧所在的圆"
          cx={circle.x}
          cy={circle.y}
          r={circle.r}
          stroke="#d6cccc"
          fill="transparent"
          strokeDasharray={3}
        />
        <circle aria-description="圆心" cx={circle.x} cy={circle.y} r={2} fill="red" />
      </g> */}

      {/*
          feature(将来优化): color可能有透明度, 传递给label前需要移除透明度, 暂不考虑rgb等其他颜色标识
          red => red
          #0003 => #000
          #5CA3FF11 => #5CA3FF
       */}
      {!!labelText && (
        <SvgLabel
          linkUid={uid}
          text={labelText}
          alpha={alpha}
          x={isHighlight ? labelHoverPosition[0] : labelPosition[0]}
          y={isHighlight ? labelHoverPosition[1] : labelPosition[1]}
          lightColor={lightColor}
          darkColor={darkColor}
          isHighlight={isHighlight}
        />
      )}
    </g>
  );
}

function getPath(start: [number, number], end: [number, number]) {
  // 经过中心点与斜线垂直间距
  const D = 24;
  const [startX, startY] = start;
  const [endX, endY] = end;
  const distance = getPointDistance(start, end);

  // 起始点连线(直线)的中点坐标
  const middleX = (startX + endX) / 2;
  const middleY = (startY + endY) / 2;

  // 起始点连线(弧线)的中点坐标
  const alpha = Math.atan((startY - endY) / (endX - startX));
  const centerX = middleX - D * Math.sin(alpha);
  const centerY = middleY - D * Math.cos(alpha);

  // hover时, label 的中心点与圆弧中心点重合, 默认与圆弧中心点有少量间距d2
  const d2 = 6;
  const labelX = middleX - (D + d2) * Math.sin(alpha);
  const labelY = middleY - (D + d2) * Math.cos(alpha);

  // ⚪
  const r = (D ** 2 + (distance / 2) ** 2) / (2 * D);
  const x = middleX + (r - D) * Math.sin(alpha);
  const y = middleY + (r - D) * Math.cos(alpha);
  const crs = ((Math.acos((r - D) / r) * 2) / Math.PI) * 180;
  return {
    alpha,
    middle: [middleX, middleY],
    center: [centerX, centerY],
    label: [centerX, centerY],
    label2: [labelX, labelY],
    circle: { x, y, r, crs },
  };
}

const SvgLine = memo(InternalSvgLine);
export default SvgLine;
