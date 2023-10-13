import { Card, Form, Radio, Slider, Space } from "antd";
import { useState } from "react";
import MatrixTable from ".";

export default function Demo() {
  const [groupGap, setGroupGap] = useState<[number, number]>([18, 18]);
  const [tableBorderRadius, setTableBorderRadius] = useState(6);

  return (
    <Card title="有间隔的table">
      <Form.Item label="table圆角">
        <Slider min={0} max={12} value={tableBorderRadius} onChange={(r) => setTableBorderRadius(r)} />
      </Form.Item>
      <Form.Item label="组间间隔">
        <Slider min={0} max={24} value={groupGap[0]} onChange={(g0) => setGroupGap(([_, g1]) => [g0, g1])} />
        <Slider min={0} max={24} value={groupGap[1]} onChange={(g1) => setGroupGap(([g0, _]) => [g0, g1])} />
      </Form.Item>

      <MatrixTable
        gap={groupGap}
        borderRadius={tableBorderRadius}
        dataSource={[
          { type: "应用", dev: 2, prod: 2, backup: 2 },
          { type: "数据库", dev: 2, prod: 2, backup: 2 },
          { type: "网络", dev: 2, prod: 2, backup: 2 },
          { type: "其他", dev: 2, prod: 2, backup: 2 },
        ]}
        columns={[
          { title: "类型", dataIndex: "type" },
          { title: "数据生产中心", dataIndex: "dev" },
          { title: "数据灾备中心", dataIndex: "prod" },
          { title: "数据灾备中心", dataIndex: "backup" },
        ]}
      />
    </Card>
  );
}
