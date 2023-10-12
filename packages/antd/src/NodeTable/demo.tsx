import { css } from "@emotion/css";
import { Button, Form, Input, Radio, Slider, Space, TableProps } from "antd";
import { useEffect, useState } from "react";
import MatrixTable from "./NodeTable";

/**
 * https://blog.darkthread.net/blog/fill-full-height-without-specify-parent-height/
 * td 未设置高度时, td内的子元素设置height:100%;无法填满单元格
 * 其中一个解决方法是: 指定table高度, table最终实际渲染的高度可能与指定高度不同
 */

export default function Demo() {
  const [colWidth, setColWidth] = useState(190);
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(2);
  const [groupGap, setGroupGap] = useState<[number, number]>([18, 0]);
  const [tableBorderRadius, setTableBorderRadius] = useState(2);

  return (
    <div>
      <Form.Item label="table圆角">
        <Slider min={0} max={12} value={tableBorderRadius} onChange={(r) => setTableBorderRadius(r)} />
      </Form.Item>
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

      <MatrixTable
        gap={groupGap}
        borderRadius={tableBorderRadius}
        dataSource={[
          { type: "应用", dev: [], prod: [], backup: [] },
          { type: "数据库", dev: [], prod: [], backup: [] },
          { type: "网络", dev: [], prod: [], backup: [] },
          { type: "其他", dev: [], prod: [], backup: [] },
        ]}
        columns={[
          { title: "类型", width: colWidth, dataIndex: "type" },
          { title: "数据生产中心", render: (_, row, index) => <Item row={index} col={1} /> },
          { title: "数据灾备中心", render: (_, row, index) => <Item row={index} col={2} /> },
          { title: "数据灾备中心", render: (_, row, index) => <Item row={index} col={3} /> },
        ]}
      />
    </div>
  );
}

function Item({ row, col }: { row: number; col: number }) {
  const [count, setCount] = useState(row + col);

  return (
    <div>
      <Button.Group>
        <Button onClick={() => setCount(Math.max(count - 1, 0))}>-</Button>
        <Button>
          类型{row + 1},中心{col + 1};节点:{count}
        </Button>
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