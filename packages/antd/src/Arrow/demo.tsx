import { Card, Divider, Space, Typography } from "antd";
import Arrow from "./index";

export default function Demo() {
  return (
    <>
      <Typography.Title level={3}>箭头组件</Typography.Title>
      <Typography.Paragraph>可自定义颜色及是否开启动画</Typography.Paragraph>

      <Divider />

      <Card title="direction控制方向">
        <Space direction="vertical">
          <Arrow direction="left" />
          <Arrow direction="right" />
        </Space>
      </Card>

      <Divider />

      <Card title="color">
        <Space direction="vertical">
          <Arrow color="default" />
          <Arrow color="disabled" />
          <Arrow color="error" />
          <Arrow color="primary" />
          <Arrow color="success" />
          <Arrow color="warning" />
        </Space>
      </Card>

      <Divider />

      <Card title="animation">
        <Space direction="vertical">
          <Arrow animation />
        </Space>
      </Card>

      <Divider />

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
