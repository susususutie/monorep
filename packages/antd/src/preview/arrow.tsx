import { Card, Form, Space, Typography } from "antd";
import { Arrow } from "../../lib";

export default function Demo() {
  return (
    <>
      <Typography.Title level={3}>箭头组件</Typography.Title>
      <Typography.Paragraph>可自定义颜色及是否开启动画</Typography.Paragraph>

      <Card
        title={
          <>
            <Typography.Text code>direction</Typography.Text>
            <Typography.Text>控制方向</Typography.Text>
          </>
        }
      >
        <Space direction="vertical">
          <Arrow direction="left" />
          <Arrow direction="right" />
        </Space>
      </Card>

      <Card title="color">
        <Form.Item labelCol={{flex: '100px'}} label="default"><Arrow color="default" /></Form.Item>
        <Form.Item labelCol={{flex: '100px'}} label="disabled"><Arrow color="disabled" /></Form.Item>
        <Form.Item labelCol={{flex: '100px'}} label="error"><Arrow color="error" /></Form.Item>
        <Form.Item labelCol={{flex: '100px'}} label="primary"><Arrow color="primary" /></Form.Item>
        <Form.Item labelCol={{flex: '100px'}} label="success"><Arrow color="success" /></Form.Item>
        <Form.Item labelCol={{flex: '100px'}} label="warning"><Arrow color="warning" /></Form.Item>
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
