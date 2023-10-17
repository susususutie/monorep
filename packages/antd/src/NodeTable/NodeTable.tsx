import { Input } from "antd";
import React, { ReactNode, useState } from "react";
import MatrixTable from "../MatrixTable";
import NodeGroup from "./Group";

export type NodeTableProps<
  UidType extends string | number = number,
  Item = {
    key: number;
    type: string;
    padding?: number[];
    rowSize: number;
    colSize: number;
    [dataCenter: `dataCenter${number}`]: UidType[][];
  }
> = {
  align?: "left" | "center";
  columns: { key?: React.Key; title: string; dataIndex: string }[];
  dataSource: Item[];
  renderItem: (config: { uid: UidType; row: number; col: number; rowSize: number; colSize: number }) => ReactNode;
};

// 弧高 = (index + 1) * 8; index: 同一行中的第几条水平连线

export default function NodeTable<UidType extends string | number = number>(props: NodeTableProps<UidType>) {
  const { align, columns, dataSource, renderItem } = props;
  const groupAlign = align && ["left", "center"].includes(align) ? align : "left";

  // const [paddingTops, setPadding] = useState<number[]>([]);
  const renderColumns = columns.map((column, index) =>
    index === 0
      ? column
      : {
          ...column,
          render: (
            items: UidType[][],
            row: {
              key: number;
              type: string;
              padding?: number[];
              rowSize: number;
              colSize: number;
              [dataCenter: `dataCenter${number}`]: UidType[][];
            }
          ) =>
            items?.length > 0 ? (
              <NodeGroup
                renderItem={renderItem}
                align={groupAlign}
                rowSize={row.rowSize}
                colSize={row.colSize}
                items={items}
                padding={row.padding}
              />
            ) : null,
        }
  );

  return (
    <div>
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

      <MatrixTable<{ type: string; dev: number[][]; prod: number[][]; backup: number[][]; padding: number[] }>
        gap={[18, 0]}
        borderRadius={2}
        dataSource={dataSource}
        columns={renderColumns}
      />
    </div>
  );
}
