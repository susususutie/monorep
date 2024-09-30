import { Collapse, ConfigProvider, Layout, App as AntdApp } from "antd";
import { useState } from "react";
import FormRootConfig, { type FormRootConfigValues } from "./config/FormRootConfig";
import FormSeedToken, { type FormSeedTokenValues } from "./config/FormSeedToken";
import PreviewContent from "./preview";
import { DialogTypeProvider } from "../lib";

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
      <AntdApp style={{ height: "100%" }}>
        <Layout style={{ height: "100%" }}>
          <Layout.Sider width={400} theme="light" style={{ padding: 12, overflowX: "hidden", overflowY: "auto" }}>
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
            <DialogTypeProvider dialogType="drawer">
              <PreviewContent />
            </DialogTypeProvider>
          </Layout.Content>
        </Layout>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
