import { css } from "@emotion/css";
import { Button, Form, Input, Radio, Slider, Space } from "antd";
import { useEffect, useState } from "react";

/**
 * https://blog.darkthread.net/blog/fill-full-height-without-specify-parent-height/
 * td 未设置高度时, td内的子元素设置height:100%;无法填满单元格
 * 其中一个解决方法是: 指定table高度, table最终实际渲染的高度可能与指定高度不同
 */

export default function Demo() {
  const [colWidth, setColWidth] = useState(190);
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(2);
  const [groupGap, setGroupGap] = useState([18, 0]);

  const [data, setData] = useState([
    [0, 1],
    [1, 2],
  ]);

  //   th     th     th
  //   th     td     td
  const gapStyle = css`
    padding: ${groupGap[1] / 2}px ${groupGap[0] / 2}px;
  `;
  const head = css`
    border: 1px solid #e6e9f0;
    height: 38px;
    background: #f7f8fa;
  `;
  const td = css`
    height: 100%;
    border: 1px solid #e6e9f0;
    border-top-style: ${groupGap[1] === 0 ? "none" : "solid"};
  `;
  return (
    <div>
      <Form.Item label="左侧宽度">
        <Input value={colWidth} onChange={(ev) => setColWidth(+ev.target.value ?? 190)} />
      </Form.Item>
      <Form.Item label="几行">
        <Radio.Group
          value={rows}
          onChange={(ev) => {
            const group = +ev.target.value;
            setRows(group);
          }}
        >
          <Space direction="vertical">
            <Radio.Button value={1}>1</Radio.Button>
            <Radio.Button value={2}>2</Radio.Button>
            <Radio.Button value={3}>3</Radio.Button>
          </Space>
        </Radio.Group>
        <Radio.Group
          style={{ marginTop: 32 }}
          options={[1, 2, 3]}
          optionType="button"
          buttonStyle="solid"
          value={cols}
          onChange={(ev) => {
            const group = +ev.target.value;
            setCols(group);
            // setData()
          }}
        />
      </Form.Item>
      <Form.Item label="组间间隔">
        <Slider min={0} max={24} value={groupGap[0]} onChange={(g0) => setGroupGap(([_, g1]) => [g0, g1])} />
        <Slider min={0} max={24} value={groupGap[1]} onChange={(g1) => setGroupGap(([g0, _]) => [g0, g1])} />
      </Form.Item>

      <div style={{ border: "1px dashed lime" }}>
        <table
          className={css`
            height: 40px;
            table-layout: fixed;
            width: calc(100% + ${groupGap[0]}px);
            margin: -${groupGap[1] / 2}px -${groupGap[0] / 2}px;
          `}
        >
          <colgroup>
            <col style={{ width: colWidth }} />
            {Array(cols)
              .fill(null)
              .map((_, index) => (
                //  style={{ width: `calc(${100 / cols}% - ${colWidth / cols}px)` }}
                <col key={index} />
              ))}
          </colgroup>
          <thead>
            <tr>
              <th className={gapStyle}>
                <div className={head}>类型</div>
              </th>
              {Array(cols)
                .fill(null)
                .map((_, index) => (
                  <th key={index} className={gapStyle}>
                    <div className={head}>中心{index + 1}</div>
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {Array(rows)
              .fill(null)
              .map((_, rowIndex) => (
                <tr key={rowIndex}>
                  <th className={gapStyle}>
                    <div className={td}>类型{rowIndex + 1}</div>
                  </th>
                  {Array(cols)
                    .fill(null)
                    .map((_, colIndex) => (
                      <td key={colIndex} className={gapStyle}>
                        <div className={td}>
                          <Item row={rowIndex} col={colIndex} />
                        </div>
                      </td>
                    ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Item({ row, col }: { row: number; col: number }) {
  const [count, setCount] = useState(row + col);

  return (
    <div>
      <div>
        类型{row} x 中心{col}
      </div>
      <Button.Group>
        <Button onClick={() => setCount(Math.max(count - 1, 0))}>-</Button>
        <Button>{count}</Button>
        <Button onClick={() => setCount(Math.min(count + 1, 99))}>+</Button>
      </Button.Group>
      <div
        className={css`
          width: 100%;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 24px;
        `}
      >
        {Array(count)
          .fill(null)
          .map((_, index) => (
            <span
              key={index}
              className={css`
                display: block;
                width: 30px;
                height: 30px;
                background: #ffffff;
                border: 1px solid #e6e9f0;
                border-radius: 2px;
                box-shadow: 0px 2px 8px 0px rgba(56, 65, 92, 0.08);
              `}
            ></span>
          ))}
      </div>
    </div>
  );
}
