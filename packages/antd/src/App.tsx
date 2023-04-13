import { ConfigProvider, Form, FormProps, Input, Row } from 'antd';
import { useState } from 'react';
import { ComponentPanel, MyButton, MyTitle } from './components';
import MemoPrefix from './util/MemoPrefix';

function App() {
  // const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  // const renderPrefixCls = getPrefixCls();

  const [prefixCls, setPrefixCls] = useState<string>(() => MemoPrefix.getPrefix());
  const onFinish: NonNullable<FormProps<{ prefixCls: string }>['onFinish']> = values => {
    MemoPrefix.setPrefix(values.prefixCls);
    setPrefixCls(values.prefixCls);
  };

  return (
    <ConfigProvider prefixCls={prefixCls}>
      <Row gutter={[24, 24]}>
        <ComponentPanel title="antd配置" extra="更改配置,观察自定义组件是否同步变更">
          <Form
            initialValues={{ prefixCls: MemoPrefix.getPrefix() }}
            onFinish={onFinish}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 12 }}
          >
            <Form.Item required name="prefixCls" label="prefixCls" rules={[{ required: true }, { pattern: /^\w+$/ }]}>
              <Input />
            </Form.Item>
          </Form>
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
