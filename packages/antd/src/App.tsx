import { Collapse, ConfigProvider, Layout } from "antd";
import { useState } from "react";
import FormRootConfig, { type FormRootConfigValues } from "./config/FormRootConfig";
import FormSeedToken, { type FormSeedTokenValues } from "./config/FormSeedToken";
import PreviewContent from "./preview";

const defaultRootConfig: FormRootConfigValues = { prefixCls: "antd" };
const defaultSeedToken: FormSeedTokenValues = {
  colorPrimary: "#1677ff",
  colorSuccess: "#52c41a",
  colorWarning: "#faad14",
  colorError: "#ff4d4f",
  colorInfo: "#1677ff",
  borderRadius: 6,
};

function App() {
  const [rootConfig, setRootConfig] = useState<FormRootConfigValues>(defaultRootConfig);
  const [seedToken, setSeedToken] = useState<FormSeedTokenValues>(defaultSeedToken);

  return (
    <ConfigProvider prefixCls={rootConfig.prefixCls} theme={{ token: { ...seedToken }, cssVar: true }}>
      <Layout style={{ overflow: "hidden", height: "100%" }}>
        <Layout.Sider width={400} theme="light" style={{ padding: 12 }}>
          <Collapse
            defaultActiveKey={[1, 2]}
            items={[
              {
                key: 1,
                label: "prefixCls",
                children: (
                  <FormRootConfig
                    initialValues={defaultRootConfig}
                    onReset={() => setRootConfig(defaultRootConfig)}
                    onFinish={(values) => setRootConfig(values)}
                  />
                ),
              },
              {
                key: 2,
                label: "SeedToken",
                children: (
                  <FormSeedToken
                    initialValues={defaultSeedToken}
                    onReset={() => setSeedToken(defaultSeedToken)}
                    onFinish={(values) => setSeedToken(values)}
                  />
                ),
              },
            ]}
          />
        </Layout.Sider>
        <Layout.Content style={{ overflow: "auto", padding: 12, backgroundColor: "#fff" }}>
          <PreviewContent />
        </Layout.Content>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
