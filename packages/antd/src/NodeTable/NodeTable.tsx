import React, { ReactNode, useCallback, useMemo, useRef, useState } from "react";
import MatrixTable, { MatrixTableProps } from "../MatrixTable";
import Group from "./Group";
import { GetNodeDataContext } from "./context";
import { Input } from "antd";

export type NodeTableProps<UidType extends string | number = number, Item extends Record<string, unknown> = any> = {
  align?: "left" | "center";
  columns: { key?: React.Key; title: string; dataIndex: string }[];
  dataSource: Item[];
  renderItem: (config: { uid: UidType; row: number; col: number; rows: number; cols: number }) => ReactNode;
};

// 弧高 = (index + 1) * 8; index: 同一行中的第几条水平连线

export default function NodeTable<UidType extends string | number = number>(props: NodeTableProps<UidType>) {
  const { align, columns, dataSource, renderItem } = props;
  const groupAlign = align && ["left", "center"].includes(align) ? align : "center";

  const [paddingTops, setPadding] = useState<number[]>([]);
  const renderColumns = columns.map((column, index) =>
    index === 0
      ? column
      : {
          ...column,
          render: (items, row) =>
            items?.length > 0 ? (
              <Group renderItem={renderItem} align={groupAlign} items={items as UidType[][]} padding={row.padding} />
            ) : null,
        }
  );

  return (
    <div>
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
        dataSource={dataSource}
        columns={renderColumns}
      />
    </div>
  );
}
