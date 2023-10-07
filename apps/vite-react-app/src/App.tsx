import { useState } from "react";
import { ConfigProvider, Form, Input, Row, Space } from "antd";
import { Arrow, AsyncSelect, ComponentPanel, MyButton, MyTitle } from "@sutie/antd";

function App() { 
  const [prefixCls, setPrefixCls] = useState<string>("antd");

  return (
    <ConfigProvider prefixCls={prefixCls}>
      <Row gutter={[24, 24]}>
        <ComponentPanel title="antd配置" extra="更改配置,观察自定义组件是否同步变更">
          <Form
            initialValues={{ prefixCls: "antd" }}
            onFinish={(values) => setPrefixCls(values.prefixCls)}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 12 }}
          >
            <Form.Item required name="prefixCls" label="prefixCls" rules={[{ required: true }, { pattern: /^\w+$/ }]}>
              <Input />
            </Form.Item>
          </Form>
        </ComponentPanel>

        <ComponentPanel title="Arrow" extra="箭头组件,可自定义颜色及是否开启动画">
          <Space direction="horizontal" wrap>
            <Arrow direction="left" />
            <Arrow direction="right" />
            <Arrow color="default" />
            <Arrow color="disabled" />
            <Arrow color="error" />
            <Arrow color="primary" />
            <Arrow color="success" />
            <Arrow color="warning" />
            <Arrow animation />
            <Arrow.Group size="default">
              <Arrow />
              <Arrow />
            </Arrow.Group>
            <Arrow.Group size="large">
              <Arrow />
              <Arrow />
            </Arrow.Group>
            <Arrow.Group size="small">
              <Arrow />
              <Arrow />
            </Arrow.Group>
            <Arrow.Group size={10}>
              <Arrow />
              <Arrow />
            </Arrow.Group>
          </Space>
        </ComponentPanel>

        <ComponentPanel title="AsyncSelect" extra="异步获取options的Select组件">
          <AsyncSelect
            style={{ width: 240 }}
            request={async () => {
              await new Promise((resolve) => setTimeout(resolve, 1200));
              return [
                { value: 1, label: "选项一" },
                { value: 2, label: "选项二" },
              ];
            }}
          />
        </ComponentPanel>

        <ComponentPanel title="Demo" extra="自定义组件示例">
          <MyButton />
        </ComponentPanel>

        <ComponentPanel title="Template" extra="自定义组件示例">
          <MyTitle />
        </ComponentPanel>
      </Row>
    </ConfigProvider>
  );
}

export default App;
