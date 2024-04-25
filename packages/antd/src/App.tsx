import { ConfigProvider, Form, FormProps, Input, Layout, theme } from "antd";
import { useState } from "react";

function App() {
  // const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  // const renderPrefixCls = getPrefixCls();

  const [prefixCls, setPrefixCls] = useState<string>("antd");
  const onFinish: NonNullable<FormProps<{ prefixCls: string }>["onFinish"]> = (values) => {
    setPrefixCls(values.prefixCls);
  };

  const { token } = theme.useToken();

  return (
    <ConfigProvider prefixCls={prefixCls}>
      <Layout style={{ overflow: "hidden", height: "100%" }}>
        <Layout.Sider width="240" theme="light">
          <Form style={{ padding: 12 }} initialValues={{ prefixCls: "antd" }} onFinish={onFinish}>
            <Form.Item style={{ margin: 0 }} name="prefixCls" rules={[{ required: true }, { pattern: /^\w+$/ }]}>
              <Input style={{ width: "100%" }} placeholder="更改配置,观察自定义组件是否同步变更" />
            </Form.Item>
          </Form>
        </Layout.Sider>
        <Layout.Content style={{ overflow: "auto" }}>
          <div style={{ height: "200vh" }}>Layout.Content</div>
        </Layout.Content>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
