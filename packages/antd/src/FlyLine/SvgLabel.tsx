import { fittingString } from "./tool";
import { LabelConfig } from "./context";

/**   |<-   label宽度  ->|
 *
 *    --------------------
 * ---|   文字最大宽度   |-->
 *    --------------------
 */

type SvgLabelProps = {
  /** 飞线唯一id */
  linkUid: string;
  /** label的偏转角度 */
  alpha: number;
  /** label 中心点定位 */
  x: number;
  /** label 中心点定位 */
  y: number;
  /** 连线是否高亮 */
  isActive?: boolean;
  active: LabelConfig & { text: string };
} & LabelConfig & { text: string };

export default function SvgLabel(props: SvgLabelProps) {
  const { linkUid, alpha, x: oX, y: oY, isActive, active, ...config } = props;
  const cfg = {
    maxWidth: 140,
    padding: 12,
    fontSize: 14,
    height: 20,
    ...(isActive ? { offset: 0, ...config, ...active } : { offset: 6, ...config }),
  };

  const maxTextWidth = cfg.bgColor ? cfg.maxWidth - 2 * cfg.padding : cfg.maxWidth;
  const labelTextConfig = fittingString(cfg.text, maxTextWidth, cfg.fontSize);
  // 有省略号按最大宽度, 没有则按实际宽度显示
  const labelTextWidth = labelTextConfig.ellipsis ? maxTextWidth : labelTextConfig.width;
  const labelWidth = cfg.bgColor ? labelTextWidth + 2 * cfg.padding : labelTextWidth;
  const labelHeight = cfg.height;

  const [x, y] = cfg.offset ? [oX - cfg.offset * Math.sin(alpha), oY - cfg.offset * Math.cos(alpha)] : [oX, oY];

  return (
    <g
      transform={`rotate(${-(alpha / Math.PI) * 180} ${x} ${y} )`}
      style={{ pointerEvents: "fill", cursor: "pointer" }}
    >
      {/* transformOrigin="center" style={{transformOrigin: 'center'}} */}
      <g transform={`translate(${x - labelWidth / 2},${y - labelHeight / 2})`}>
        {cfg.bgColor && (
          <rect
            fill={cfg.bgColor}
            rx={labelHeight / 2}
            ry={labelHeight / 2}
            stroke={cfg.bgColor}
            strokeWidth="1"
            width={labelWidth}
            height={labelHeight}
          ></rect>
        )}
        <text
          xmlSpace="preserve"
          dx={labelWidth / 2}
          dy={labelHeight / 2}
          fill={cfg.color}
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize={cfg.fontSize}
          style={{ userSelect: "none", lineHeight: cfg.height + "px" }}
        >
          {labelTextConfig.text}
        </text>
        <rect
          data-link-role="label"
          data-link-uid={linkUid}
          fill={"transparent"}
          rx={labelHeight / 2}
          ry={labelHeight / 2}
          stroke={"transparent"}
          strokeWidth="1"
          width={labelWidth}
          height={labelHeight}
        ></rect>
      </g>
    </g>
  );
}
