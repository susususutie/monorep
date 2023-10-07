import { Card, Divider, Space, Typography } from "antd";
import AsyncSelect from "./index";

export default function Demo() {
  return (
    <>
      <Typography.Title level={3}>AsyncSelect</Typography.Title>
      <Typography.Paragraph>异步获取options的Select组件</Typography.Paragraph>

      <Divider />

      <Card title="2秒后获取options">
        <AsyncSelect
          style={{ width: 240 }}
          request={async () => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            return [
              { value: 1, label: "选项一" },
              { value: 2, label: "选项二" },
            ];
          }}
        />
      </Card>

      <Divider />
    </>
  );
}
