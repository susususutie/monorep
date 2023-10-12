import { memo, useEffect, useMemo, useRef } from "react";
import SvgLine, { SvgLineProps } from "./SvgLine";
import SvgMarker from "./SvgMarker";
import { FlyLineContextValue, FlyLineContext, defaultContextValue } from "./context";

/** 资产连线两种状态 */
const LINK_STATUS = {
  NORMAL: { value: 0, colorLight: "#8BDCA7", colorDark: "#17BA4F" },
  UN_NORMAL: { value: 1, colorLight: "#CFD2DC", colorDark: "#AFB5C7" },
  // 将来可能会增加红色: { value: , colorLight: "#FF9EAA", colorDark: "#FF3D55" },
};

type NodeConfig<Data = any> = {
  /** 节点唯一id */
  nid: string;
  /** 节点名 */
  name: string;
  /** 节点业务数据 */
  data?: Data;
};

const defaultMarkerColors = [
  LINK_STATUS.NORMAL.colorDark,
  LINK_STATUS.NORMAL.colorLight,
  LINK_STATUS.UN_NORMAL.colorDark,
  LINK_STATUS.UN_NORMAL.colorLight,
].map((color) => color.toLowerCase());

export type FlyLineProps<LineData = any> = {
  config?: FlyLineContextValue;
  /** 高亮飞线uid */
  highlightLines?: string[];
  lines: (SvgLineProps & { data?: LineData })[];
  /** 只能同时hover一个元素, 当未hover到link时, 参数为空 */
  onHover?: (type: "link" | "label" | "other", lineId?: string) => void;
};

function InternalFlyLine<LineData = any>(props: FlyLineProps<LineData>) {
  const { config = defaultContextValue, lines, highlightLines, onHover } = props;

  /**
   * 传入的所有线条颜色, 去除默认的几种颜色, 去重后为所有额外需要的颜色, 根据颜色渲染marker
   */
  const markerColors = useMemo(
    () =>
      lines
        // 筛选出新增的自定义颜色
        .flatMap((line) => [line.color, line.active?.color])
        .filter((color) => color && !defaultMarkerColors.includes(color.toLowerCase()))
        // 去重
        .filter((color, index, list) => color && list.findIndex((c) => c === color) === index) as string[],
    [lines]
  );

  // 重新排序, 在highlightLines列表中越靠前的, 说明离选中节点关系越近, 排序需要靠后才能显示在上层
  const sortLines = highlightLines
    ? lines.sort((a, b) => {
        let bIndex = highlightLines.findIndex((i) => i === `${b.uid}`);
        let aIndex = highlightLines.findIndex((i) => i === `${a.uid}`);
        bIndex = bIndex === -1 ? 999 : bIndex;
        aIndex = aIndex === -1 ? 999 : aIndex;
        return bIndex - aIndex;
      })
    : lines;

  const memoOnHover = useRef(onHover);
  memoOnHover.current = onHover;
  useEffect(() => {
    let hoverUid: string | null | undefined;
    let delayLeaveTimer: number;
    function onHoverStart(e: MouseEvent) {
      if (
        !e.target ||
        !("tagName" in e.target) ||
        !(e as any)?.target?.dataset?.["linkRole"] ||
        !(e as any)?.target?.dataset?.["linkUid"]
      ) {
        return;
      }
      const element = e.target as HTMLElement;
      if (
        (element.dataset["linkRole"] === "path" && element.tagName === "use") ||
        (element.dataset["linkRole"] === "label" && element.tagName === "rect")
      ) {
        const uid = element.dataset["linkUid"];
        clearTimeout(delayLeaveTimer);
        if (uid !== hoverUid) {
          hoverUid = uid;
          // console.log(`enter ${uid}`, e.x, e.clientX, e.y, e.clientY);
          memoOnHover.current && memoOnHover.current("link", hoverUid);
        }
      }
    }
    function onHoverEnd(e: MouseEvent) {
      if (
        !e.target ||
        !("tagName" in e.target) ||
        !(e as any)?.target?.dataset?.["linkRole"] ||
        !(e as any)?.target?.dataset?.["linkUid"]
      ) {
        return;
      }
      const element = e.target as HTMLElement;
      if (
        (element.dataset["linkRole"] === "path" && element.tagName === "use") ||
        (element.dataset["linkRole"] === "label" && element.tagName === "rect")
      ) {
        const uid = element.dataset["linkUid"];
        if (uid === hoverUid) {
          hoverUid = null;
          delayLeaveTimer = setTimeout(() => {
            // console.log(`leave ${uid}`, e.x, e.clientX, e.y, e.clientY);
            memoOnHover.current && memoOnHover.current("other");
          }, 100);
        }
      }
    }
    document.addEventListener("mouseover", onHoverStart);
    document.addEventListener("mouseout", onHoverEnd);
    return () => {
      document.removeEventListener("mouseover", onHoverStart);
      document.removeEventListener("mouseout", onHoverEnd);
    };
  }, []);

  return (
    <svg
      style={{
        width: config.width ?? "100%",
        height: config.width ?? "100%",
        position: "absolute",
        top: 0,
        pointerEvents: "none",
      }}
    >
      <FlyLineContext.Provider value={{ ...defaultContextValue, ...config }}>
        <defs>
          {defaultMarkerColors.map((color) => (
            <SvgMarker key={color} color={color} />
          ))}
          {markerColors.length > 0 && markerColors.map((color) => <SvgMarker key={color} color={color} />)}
        </defs>
        {sortLines.map((line) => (
          <SvgLine key={line.uid} {...line} isActive={highlightLines && highlightLines.includes(`${line.uid}`)} />
        ))}
      </FlyLineContext.Provider>
    </svg>
  );
}

export default memo(InternalFlyLine);
