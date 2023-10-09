import useResize from "./useResize";
import { RefObject, useEffect, useMemo, useState } from "react";

export default function useAutoResize(
  ref: RefObject<HTMLElement>,
  lines: { uid: string; label?: string; source: string; target: string; data: any }[],
  // 节点布局
  matrixList: any
) {
  // wrapper 包围框, 尺寸变更后需要重新计算布局, 尺寸变化过程中隐藏飞线
  const { isReSizing: isWrapperLayouting } = useResize(ref);

  // nodes
  const [isNodeLayouting, setNodeLayouting] = useState(true);
  const [nodeRectMap, setNodeRectMap] = useState<Record<string, DOMRect>>({});
  useEffect(() => {
    if (isWrapperLayouting) {
      setNodeLayouting(true);
      return;
    }

    const nodeEleList = [...document.querySelectorAll<HTMLElement>("[data-node-nid]")];
    const nodeRectMap: Record<string, DOMRect> = {};
    nodeEleList.forEach((nodeEle) => {
      const nodeId = nodeEle.dataset["nodeNid"];
      if (nodeId) {
        const rect = nodeEle.getBoundingClientRect();
        nodeRectMap[nodeId] = rect;
      }
    });
    setNodeRectMap(nodeRectMap);
    setNodeLayouting(false);
  }, [isWrapperLayouting, matrixList]);

  /**
   * flyLines
   * 根据wrapper包围框定位, 节点位置和节点连线关系, 计算连线位置.
   * 线条固定为起始节点的右侧中心至结束节点的左侧中心
   * feature: 后续可根据起始点相对位置动态调整连接桩位置
   *
   *  --------------------
   * | wrapper            |
   * |                    |
   * |   ---      ---     |
   * |  | a |--->| b |    |
   * |   ---      ---     |
   *  --------------------
   */
  const flyLines = useMemo(() => {
    const { x, y } = (ref.current && ref.current.getBoundingClientRect()) || { x: 0, y: 0 };
    const rectLines =
      (lines &&
        lines
          .map((line) => {
            /**
             * uid, source, target, data
             */
            const source = nodeRectMap[line.source];
            const target = nodeRectMap[line.target];
            if (!source || !target) return null;
            const { x1, y1, x2, y2 } = getLineAnchor(source, target, { x, y });
            return { uid: line.uid, x1, y1, x2, y2, label: line.label, data: line.data };
          })
          .filter(Boolean)) ||
      [];
    return rectLines;
  }, [ref, lines, nodeRectMap]);

  return { isLayouting: isWrapperLayouting || isNodeLayouting, flyLines };
}

/** 根据起止dom计算飞线的最佳起止坐标 */
function getLineAnchor(
  /** 起始dom */
  source: { x: number; y: number; width: number; height: number },
  /** 终止dom */
  target: { x: number; y: number; width: number; height: number },
  /** 相对位置参考dom */
  reactive: { x: number; y: number }
) {
  const { x, y } = reactive;
  let x1, x2, y1, y2;
  /**
   * 1. 水平方向(误差10px以内)
   *
   * [source] → [target]
   * [target] ← [source]
   */
  if (Math.abs(source.y - target.y) <= 10) {
    y1 = source.y - y + source.height / 2;
    y2 = target.y - y + target.height / 2;
    if (source.x < target.x) {
      x1 = source.x - x + source.width;
      x2 = target.x - x;
    } else {
      x1 = source.x - x;
      x2 = target.x - x + target.width;
    }
  } else if (Math.abs(source.x - target.x) <= 10) {
    /**
     * 2. 垂直方向
     *
     * [source]     |     [target]
     *    ↓        |        ↑
     * [target]     |     [source]
     */
    x1 = source.x - x + source.width / 2;
    x2 = target.x - x + target.width / 2;
    if (source.y < target.y) {
      y1 = source.y - y + source.height;
      y2 = target.y - y;
    } else {
      y1 = source.y - y;
      y2 = target.y - y + target.height;
    }
  } else {
    /**
     * 3.
     *
     *     ↱ [target]     |     [target] ↰
     * [source]            |             [source]
     *                     |
     * [source]            |             [source]
     *     ↳ [target]     |     [target] ↲
     */
    if (target.y > source.y) {
      y1 = source.y - y + source.height;
      y2 = target.y - y + target.height / 2;
    } else {
      y1 = source.y - y;
      y2 = target.y - y + target.height / 2;
    }

    x1 = source.x - x + source.width / 2;
    if (source.x > target.x) {
      x2 = target.x - x + target.width;
    } else {
      x2 = target.x - x;
    }
  }
  return { x1, y1, x2, y2 };
}
