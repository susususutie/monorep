import { css } from "@emotion/css";

export type MatrixTableProps<RecordType extends Record<string, any> = any> = {
  borderRadius?: number;
  gap?: [number, number];
  dataSource?: RecordType[];
  columns?: {
    width?: number;
    title: React.ReactNode | (() => React.ReactNode);
    dataIndex?: string;
    render?: (text: any, row: RecordType, rowIndex: number) => React.ReactNode;
  }[];
};

export default function MatrixTable(props: MatrixTableProps) {
  const { borderRadius = 2, gap = [18, 0], dataSource = [], columns = [] } = props;

  //   th     th     th
  //   th     td     td
  const gapStyle = css`
    padding: ${gap[1] / 2}px ${gap[0] / 2}px;
  `;

  const td = css`
    height: 100%;
    border: 1px solid #e6e9f0;
    border-top-style: ${gap[1] === 0 ? "none" : "solid"};
  `;

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
                    <PresetTitle>{column.title}</PresetTitle>
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
                const isNill = column.dataIndex === null || typeof column.dataIndex === "undefined";
                const record = isNill ? row : row[column.dataIndex as keyof typeof row];

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
                      {typeof column?.render === "function" ? (
                        column.render(record, row, rowIndex)
                      ) : (
                        <CenterTh>{typeof record === "string" ? record : String(record)}</CenterTh>
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
export function PresetTitle({ children }: { children: string }) {
  return <div className={head}>{children}</div>;
}

const centerTh = css`
  height: 100%;
  font-size: 14px;
  color: #38415c;
  display: flex;
  align-items: center;
  justify-content: center;
`;
function CenterTh({ children }: { children: string }) {
  return <div className={centerTh}>{children}</div>;
}
