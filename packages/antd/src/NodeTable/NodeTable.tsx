import { useMemo, useRef } from "react";
import MatrixTable from "../MatrixTable";
import Group from "./Group";
import NodeTableContext, { NodeTableContextType } from "./context";

export type NodeTableProps = {};
export default function NodeTable() {
  const getNodeData = useRef<NodeTableContextType["getNodeData"]>((uid) => ({ name: "数据库".repeat(uid % 5) }));
  const providerValue = useMemo<NodeTableContextType>(
    () => ({
      getNodeData: getNodeData.current,
    }),
    []
  );

  return (
    <NodeTableContext.Provider value={providerValue}>
      <MatrixTable
        gap={[18, 0]}
        borderRadius={2}
        dataSource={[
          { type: "应用", dev: [1, 2, 3], prod: [4, 5, 6], backup: [7, 8, 9] },
          { type: "数据库", dev: [11, 12], prod: [13, 14], backup: [15, 16] },
          { type: "网络", dev: [21], prod: [22], backup: [] },
          { type: "其他", dev: [], prod: [], backup: [] },
        ]}
        columns={[
          { title: "类型", width: 190, dataIndex: "type" },
          {
            title: "数据生产中心",
            dataIndex: "dev",
            render: (items, row, index) => <Group items={items} row={index} col={1} />,
          },
          {
            title: "数据灾备中心",
            dataIndex: "prod",
            render: (items, row, index) => <Group items={items} row={index} col={2} />,
          },
          {
            title: "数据灾备中心",
            dataIndex: "backup",
            render: (items, row, index) => <Group items={items} row={index} col={3} />,
          },
        ]}
      />
    </NodeTableContext.Provider>
  );
}
