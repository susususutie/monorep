import { css } from "@emotion/css";
import { ConfigProvider, Divider, Form, FormProps, Input, theme } from "antd";
import { Suspense, lazy, useState } from "react";

const paths = ["Arrow", "AsyncSelect", 'BarTitle', 'FlyLine'];
const demoList = paths.map((path) => ({
  path,
  name: path,
  Component: lazy(() => import(`../${path}/demo`)),
}));

function App() {
  // const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  // const renderPrefixCls = getPrefixCls();

  const [prefixCls, setPrefixCls] = useState<string>("antd");
  const onFinish: NonNullable<FormProps<{ prefixCls: string }>["onFinish"]> = (values) => {
    setPrefixCls(values.prefixCls);
  };

  const [activeDemo, setActiveDemo] = useState(() => demoList[0].name);
  const ActiveComponent = demoList.find((item) => item.name === activeDemo);

  const { token } = theme.useToken();

  return (
    <ConfigProvider prefixCls={prefixCls}>
      <div
        className={css`
          width: 100%;
          min-height: 100%;
          overflow-y: auto;
          overflow-x: hidden;
        `}
      >
        <aside
          className={css`
            position: fixed;
            width: 240px;
            height: 100%;
            display: flex;
            flex-direction: column;
            border: 1px solid ${token.colorBorder};
          `}
        >
          <Form style={{ padding: 12 }} initialValues={{ prefixCls: "antd" }} onFinish={onFinish}>
            <Form.Item style={{ margin: 0 }} name="prefixCls" rules={[{ required: true }, { pattern: /^\w+$/ }]}>
              <Input style={{ width: "100%" }} placeholder="更改配置,观察自定义组件是否同步变更" />
            </Form.Item>
          </Form>
          <Divider style={{ margin: 0 }} />

          <ul
            className={css`
              height: 100%;
              padding: 12px;
              margin: 0;
              list-style: none;
              overflow: hidden auto;
            `}
          >
            {demoList.map((item) => (
              <li
                key={item.name}
                className={css`
                  margin-bottom: 4px;
                  cursor: pointer;
                  line-height: 24px;
                  padding: 4px 8px;
                  border-radius: ${token.borderRadiusOuter}px;
                  background-color: ${item.name === activeDemo ? token.controlItemBgActive : "transparent"};
                  :hover {
                    background-color: ${token.controlItemBgActive};
                  }
                `}
                onClick={() => {
                  setActiveDemo(item.name);
                }}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </aside>
        <div
          className={css`
            margin-left: 240px;
            padding: 24px;
            width: calc(100% - 240px);
          `}
        >
          {ActiveComponent ? (
            <Suspense>
              <ActiveComponent.Component />
            </Suspense>
          ) : null}
        </div>
      </div>
    </ConfigProvider>
  );
}

export default App;
