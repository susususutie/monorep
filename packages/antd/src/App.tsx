import { Button, Card, ConfigProvider, Form, FormProps, Input, ColorPicker, Layout, Slider, theme } from "antd";
import { Color } from "antd/es/color-picker";
import { useState } from "react";

function App() {
  // const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  // const renderPrefixCls = getPrefixCls();

  const [prefixCls, setPrefixCls] = useState<string>("antd");
  const onFinish: NonNullable<FormProps<{ prefixCls: string }>["onFinish"]> = (values) => {
    setPrefixCls(values.prefixCls);
  };

  const { token } = theme.useToken();
  const [seedToken, setSeedToken] = useState({ colorPrimary: "#00b96b", borderRadius: 6 });

  return (
    <ConfigProvider
      prefixCls={prefixCls}
      theme={{
        token: {
          ...seedToken,
        },
      }}
    >
      <Layout style={{ overflow: "hidden", height: "100%" }}>
        <Layout.Sider width={400} theme="light" style={{ padding: 12 }}>
          <Card title="antd全局配置">
            <Form layout="vertical" initialValues={{ prefixCls: "antd" }} onFinish={onFinish}>
              <Form.Item name="prefixCls" required label="prefixCls" rules={[{ required: true }, { pattern: /^\w+$/ }]}>
                <Input style={{ width: "100%" }} placeholder="更改配置,观察自定义组件是否同步变更" />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" type="primary">
                  submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
          <Card title="SeedToken">
            <Form
              layout="vertical"
              initialValues={seedToken}
              onFinish={(values) => {
                Object.keys(values).map((key) => {
                  if (values[key] && typeof values[key] === "object") {
                    values[key] = (values[key] as Color).toHexString();
                  }
                });

                setSeedToken(values);
              }}
            >
              <Form.Item name="colorPrimary" required label="colorPrimary">
                <ColorPicker showText />
              </Form.Item>
              <Form.Item name="borderRadius" required label="borderRadius">
                <Slider min={0} max={24} />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" type="primary">
                  submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Layout.Sider>
        <Layout.Content style={{ overflow: "auto" }}>
          <div style={{ height: "200vh" }}>
            Layout.Content
            {JSON.stringify(seedToken, null, 2)}
          </div>
        </Layout.Content>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
