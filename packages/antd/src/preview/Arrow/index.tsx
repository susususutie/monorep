import { Card, Form, Space, Typography } from "antd";
import { Arrow } from "../../../lib";
import CodeBox from "../../config/CodeBox";

export default function DemoArrow() {
  return (
    <>
      <Typography.Title level={3}>箭头组件</Typography.Title>
      <Typography.Paragraph>可自定义颜色及是否开启动画</Typography.Paragraph>

      <div style={{ display: "flex", gap: 16 }}>
        <section style={{ flex: "1 1 0" }}>
          <CodeBox path="Arrow/direction" title="方向" description="direction参数控制箭头方向"></CodeBox>
          <CodeBox path="Arrow/direction" title="颜色" description="color参数控制箭头颜色"></CodeBox>
        </section>
        <section style={{ flex: "1 1 0" }}></section>
      </div>

      <Card title="color">
        <Form.Item labelCol={{ flex: "100px" }} label="default">
          <Arrow color="default" />
        </Form.Item>
        <Form.Item labelCol={{ flex: "100px" }} label="disabled">
          <Arrow color="disabled" />
        </Form.Item>
        <Form.Item labelCol={{ flex: "100px" }} label="error">
          <Arrow color="error" />
        </Form.Item>
        <Form.Item labelCol={{ flex: "100px" }} label="primary">
          <Arrow color="primary" />
        </Form.Item>
        <Form.Item labelCol={{ flex: "100px" }} label="success">
          <Arrow color="success" />
        </Form.Item>
        <Form.Item labelCol={{ flex: "100px" }} label="warning">
          <Arrow color="warning" />
        </Form.Item>
      </Card>

      <Card title="animation">
        <Space direction="vertical">
          <Arrow animation />
        </Space>
      </Card>

      <Card title="Group">
        <Space direction="horizontal">
          <Arrow.Group size="small">
            small
            <Arrow />
            <Arrow />
          </Arrow.Group>
          <Arrow.Group size="default">
            default
            <Arrow />
            <Arrow />
          </Arrow.Group>
          <Arrow.Group size="large">
            large
            <Arrow />
            <Arrow />
          </Arrow.Group>
          <Arrow.Group size={10}>
            10
            <Arrow />
            <Arrow />
          </Arrow.Group>
        </Space>
      </Card>
    </>
  );
}
