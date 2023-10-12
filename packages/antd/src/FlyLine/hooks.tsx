import { useState, useEffect, RefObject, useMemo } from "react";
import { getLineAnchor, debounce, observerDomResize } from "./tool";

export function useResize(targetDomRef: RefObject<HTMLElement>) {
  const [isReSizing, setIsResizing] = useState(true);

  const [rect, setRect] = useState<{ x: number; y: number; width: number; height: number }>();

  useEffect(() => {
    const updateRect = () => {
      if (targetDomRef.current) {
        const rect = targetDomRef.current.getBoundingClientRect();
        setRect({ x: rect.x, y: rect.y, width: rect.width, height: rect.height });
        setIsResizing(false);
      }
    };
    const debounceUpdateRect = debounce(updateRect, {
      onStartDebounce: () => {
        setIsResizing(true);
      },
    });

    updateRect();

    let domObserver: MutationObserver;
    if (targetDomRef.current) {
      domObserver = observerDomResize(targetDomRef.current, debounceUpdateRect);
    }

    window.addEventListener("resize", debounceUpdateRect);

    return () => {
      window.removeEventListener("resize", debounceUpdateRect);

      if (domObserver) {
        domObserver.disconnect();
        domObserver.takeRecords();
      }
    };
  }, [targetDomRef]);

  return { rect, isReSizing };
}

export function useAutoResize(
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
