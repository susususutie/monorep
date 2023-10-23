import React, { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import MatrixTable from "../MatrixTable";
import NodeGroup from "./Group";
import { NodeItem } from "./NodeItem";
import { css } from "@emotion/css";

export type NodeTableProps = {
  nodes: any[];
  columns: { key?: React.Key; title: string; dataIndex: string }[];
  dataSource: DataSourceItem[];
};

// 弧高 = (index + 1) * 8; index: 同一行中的第几条水平连线

export default function NodeTable(props: NodeTableProps) {
  const { nodes = [], columns, dataSource } = props;

  const wrapper = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<string>();
  const [modalState, setModalState] = useState({ open: false, x: 0, y: 0 });
  const clickItem = useCallback((uid?: string) => {
    if (!uid) {
      return;
    }
    const dom = document.querySelector(`[data-node-nid="${uid}"]`);
    if (!dom || !wrapper.current) {
      return;
    }
    const reactiveDom = wrapper.current.getBoundingClientRect();
    const target = dom.getBoundingClientRect();
    setActiveNode(uid);
    setModalState({
      open: true,
      x: target.left - reactiveDom.left + target.width + 20,
      y: target.top - reactiveDom.top,
    });
  }, []);

  const renderColumns = [
    { title: "类型", width: 190, dataIndex: "type" },
    ...columns.map((column, index) => ({
      ...column,
      render: (items: string[][], row: DataSourceItem) =>
        items?.length > 0 ? (
          <NodeGroup
            align={"left"}
            rowSize={row.rowSize}
            colSize={row.colSize}
            items={items}
            padding={row.padding}
            renderItem={(config) => (
              <NodeItem
                {...config}
                data={nodes.find((node) => node.unique_key === config.uid)!}
                onClick={clickItem}
                isActive={config.uid === activeNode}
              />
            )}
          />
        ) : null,
    })),
  ];

  return (
    <div
      ref={wrapper}
      style={{ position: "relative" }}
      onClick={(ev) => {
        const nodes = [...(wrapper.current?.querySelectorAll(`[data-node-nid]`) ?? [])];
        const clickOnNode = nodes.some((node) => node.contains(ev.target as HTMLElement));
        if (!clickOnNode) {
          setActiveNode(undefined);
          setModalState((oldState) => ({ ...oldState, open: false }));
          console.log("click away");
        }
      }}
    >
      {/* <Input
        value={`[${paddingTops.join(",")}]`}
        onChange={(ev) =>
          setPadding(
            ev.target.value
              .replace(/[\[\]]/g, "")
              .split(",")
              .map(Number)
          )
        }
      /> */}

      <MatrixTable gap={[18, 0]} borderRadius={2} dataSource={dataSource} columns={renderColumns} />

      {modalState.open && (
        <div
          className={css`
            position: absolute;
            background-color: #ffffff;
            background-clip: padding-box;
            border-radius: 8px;
            box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12),
              0 9px 28px 8px rgba(0, 0, 0, 0.05);
            padding: 12px;
          `}
          style={{ top: modalState.y, left: modalState.x }}
        >
          open node: {activeNode || "-"}
        </div>
      )}
    </div>
  );
}

type DataSourceItem = {
  key: number;
  type: string;
  padding?: number[];
  rowSize: number;
  colSize: number;
  [dataCenter: `dataCenter${number}`]: string[][];
};
