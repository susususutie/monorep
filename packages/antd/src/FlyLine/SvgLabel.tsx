import { fittingString } from "./tool";

/**   |<-   label宽度  ->|
 *
 *    --------------------
 * ---|   文字最大宽度   |-->
 *    --------------------
 */
const DEG_PER_PI = 180; // Π: 180°
const PADDING_HOVERABLE = 12;
const MAX_WIDTH = 140;
const MAX_TEXT_WIDTH = MAX_WIDTH - 2 * PADDING_HOVERABLE;
const LABEL_HEIGHT = 20;
const FONT_SIZE = 14;

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
  isHighlight?: boolean;
  /** 浅色 */
  lightColor: string;
  /** 深色 */
  darkColor: string;
  /** label文字内容 */
  text: string;
};

export default function SvgLabel(props: SvgLabelProps) {
  const { linkUid, alpha, x, y, text, darkColor, lightColor, isHighlight } = props;

  const labelTextConfig = fittingString(text, MAX_TEXT_WIDTH, FONT_SIZE);
  // 有省略号按最大宽度, 没有则按实际宽度显示
  const labelTextWidth = labelTextConfig.ellipsis ? MAX_TEXT_WIDTH : labelTextConfig.width;
  const labelWidth = labelTextConfig.ellipsis ? MAX_WIDTH : labelTextConfig.width + 2 * PADDING_HOVERABLE;
  const width = isHighlight ? labelWidth : labelTextWidth;
  const height = isHighlight ? LABEL_HEIGHT : 16; // 文字高度难以测量, 16为估计的大概值

  return (
    <g
      transform={`rotate(${-(alpha / Math.PI) * DEG_PER_PI} ${x} ${y} )`}
      style={{ pointerEvents: "fill", cursor: "pointer" }}
    >
      {/* transformOrigin="center" style={{transformOrigin: 'center'}} */}
      <g transform={`translate(${x - width / 2},${y - height / 2})`}>
        {isHighlight && (
          <rect
            fill={darkColor}
            rx={height / 2}
            ry={height / 2}
            stroke={darkColor}
            strokeWidth="1"
            width={width}
            height={height}
          ></rect>
        )}
        <text
          xmlSpace="preserve"
          dx={width / 2}
          dy={height / 2 + 1} // +1 微调位置
          fill={isHighlight ? "#fff" : lightColor}
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize={FONT_SIZE}
          style={{ userSelect: "none" }}
        >
          {labelTextConfig.text}
        </text>
        <rect
          data-link-role="label"
          data-link-uid={linkUid}
          fill={"transparent"}
          rx={height / 2}
          ry={height / 2}
          stroke={"transparent"}
          strokeWidth="1"
          width={width}
          height={height}
        ></rect>
      </g>
    </g>
  );
}
