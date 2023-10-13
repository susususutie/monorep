import { css } from "@emotion/css";
import { Empty } from "antd";
import { useMemo } from "react";

/**
 * https://blog.darkthread.net/blog/fill-full-height-without-specify-parent-height/
 * td 未设置高度时, td内的子元素设置height:100%;无法填满单元格
 * 其中一个解决方法是: 指定table高度, table最终实际渲染的高度可能与指定高度不同
 */

export type MatrixTableProps<RecordType extends Record<string, any> = any> = {
  borderRadius?: number;
  gap?: [number, number];
  empty?: React.ReactNode | (() => React.ReactNode);

  dataSource?: RecordType[];
  columns?: {
    width?: number;
    title: React.ReactNode | (() => React.ReactNode);
    dataIndex?: string;
    render?: (text: any, row: RecordType, rowIndex: number) => React.ReactNode;
  }[];
};

export default function MatrixTable(props: MatrixTableProps) {
  const { borderRadius = 2, gap = [18, 0], dataSource = [], columns = [], empty = <DefaultEmpty /> } = props;

  //   th     th     th
  //   td     td     td
  const gapStyle = useMemo(
    () => css`
      padding: ${gap[1] / 2}px ${gap[0] / 2}px;
    `,
    [gap[0], gap[1]]
  );
  const td = useMemo(
    () => css`
      height: 100%;
      border: 1px solid #e6e9f0;
      border-top-style: ${gap[1] === 0 ? "none" : "solid"};
    `,
    [gap[1]]
  );

  return (
    <div>
      <table
        className={css`
          height: 40px;
          table-layout: fixed;
          width: calc(100% + ${gap[0]}px);
          margin: -${gap[1] / 2}px -${gap[0] / 2}px;
        `}
      >
        <colgroup>
          {columns
            .filter((column) => column.width)
            .map((column, index) => (
              <col key={index} style={{ width: column.width }} />
            ))}
        </colgroup>

        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className={gapStyle}>
                <div
                  style={{
                    border: "1px solid #e6e9f0",
                    borderTopLeftRadius: index === 0 ? borderRadius : 0,
                    borderTopRightRadius: index === columns.length - 1 ? borderRadius : 0,
                  }}
                >
                  {typeof column.title === "function" ? (
                    column.title()
                  ) : typeof column.title === "string" ? (
                    <PresetHeader>{column.title}</PresetHeader>
                  ) : (
                    column.title
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {dataSource.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => {
                const record = row[column.dataIndex as keyof typeof row];
                const item = typeof column?.render === "function" ? column.render(record, row, rowIndex) : record;
                const isEmpty = item === null || typeof item === "undefined";

                return (
                  <td key={colIndex} className={gapStyle}>
                    <div
                      className={td}
                      style={{
                        borderBottomLeftRadius: rowIndex === dataSource.length - 1 ? borderRadius : 0,
                        borderBottomRightRadius:
                          rowIndex === dataSource.length - 1 && colIndex === columns.length - 1 ? borderRadius : 0,
                      }}
                    >
                      {["string", "number"].includes(typeof item) ? (
                        <CenterTitle>{item}</CenterTitle>
                      ) : isEmpty ? (
                        empty
                      ) : (
                        item
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const head = css`
  height: 38px;
  background: #f7f8fa;
  font-size: 14px;
  font-family: PingFang SC, PingFang SC-Medium;
  font-weight: 500;
  text-align: center;
  color: #38415c;
  line-height: 38px;
`;
function PresetHeader({ children }: { children: string }) {
  return <div className={head}>{children}</div>;
}

const centerTitle = css`
  height: 100%;
  font-size: 14px;
  color: #38415c;
  display: flex;
  align-items: center;
  justify-content: center;
`;
function CenterTitle({ children }: { children: string }) {
  return <div className={centerTitle}>{children}</div>;
}
const emptyCls = css`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
function DefaultEmpty() {
  return (
    <div className={emptyCls}>
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无数据" style={{ margin: 0 }} />
    </div>
  );
}
