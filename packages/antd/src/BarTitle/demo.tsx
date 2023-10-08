import { Card, Divider, Space, Typography } from "antd";
import BarTitle from "./index";

export default function Demo() {
  return (
    <>
      <Typography.Title level={3}>BarTitle</Typography.Title>
      <Typography.Paragraph>带装饰条的标题组件</Typography.Paragraph>

      <Divider />

      <Card >
        <Space direction="vertical">
          <BarTitle>默认</BarTitle>
          <BarTitle type='danger'>danger</BarTitle>
          <BarTitle type='secondary'>secondary</BarTitle>
          <BarTitle type='success'>success</BarTitle>
          <BarTitle type='warning'>warning</BarTitle>
        </Space>
      </Card>
    </>
  );
}
