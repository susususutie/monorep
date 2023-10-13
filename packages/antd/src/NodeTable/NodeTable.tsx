import { useCallback, useMemo, useRef, useState } from "react";
import MatrixTable from "../MatrixTable";
import Group from "./Group";
import { GetNodeDataContext } from "./context";
import { Input } from "antd";

export type NodeTableProps = {
  align?: "left" | "center";
};

// 弧高 = (index + 1) * 8; index: 同一行中的第几条水平连线

export default function NodeTable(props: NodeTableProps) {
  const { align } = props;
  const groupAlign = align && ["left", "center"].includes(align) ? align : "center";

  const [paddingTops, setPadding] = useState<number[]>([]);

  const getNodeData = useCallback((uid: number) => ({ uid, name: "数据库".repeat(uid % 5) }), []);

  return (
    <GetNodeDataContext.Provider value={getNodeData}>
      <Input
        value={`[${paddingTops.join(",")}]`}
        onChange={(ev) =>
          setPadding(
            ev.target.value
              .replace(/[\[\]]/g, "")
              .split(",")
              .map(Number)
          )
        }
      />

      <MatrixTable<{ type: string; dev: number[][]; prod: number[][]; backup: number[][]; padding: number[] }>
        gap={[18, 0]}
        borderRadius={2}
        dataSource={[
          {
            type: "应用",
            dev: [[1, 2, 3]],
            prod: [[4, 5, 6], [7]],
            backup: [
              [8, 9, 10],
              [101, 102],
            ],
            padding: [paddingTops[0], paddingTops[1]],
          },
          { type: "数据库", dev: [[11, 12]], prod: [[13, 14]], backup: [[15, 16]], padding: [paddingTops[2]] },
          { type: "网络", dev: [[21]], prod: [[22]], backup: [], padding: [paddingTops[3]] },
          { type: "其他", dev: [], prod: [], backup: [], padding: [paddingTops[4]] },
        ]}
        columns={[
          { title: "类型", width: 190, dataIndex: "type" },
          {
            title: "数据生产中心",
            dataIndex: "dev",
            render: (items, row) => <Group align={groupAlign} items={items as number[][]} padding={row.padding} />,
          },
          {
            title: "数据灾备中心",
            dataIndex: "prod",
            render: (items, row) => <Group align={groupAlign} items={items as number[][]} padding={row.padding} />,
          },
          {
            title: "数据灾备中心",
            dataIndex: "backup",
            render: (items, row) => <Group align={groupAlign} items={items as number[][]} padding={row.padding} />,
          },
        ]}
      />
    </GetNodeDataContext.Provider>
  );
}
