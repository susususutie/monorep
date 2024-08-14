import { Button, Form, FormProps, Input, Space } from "antd";

export type FormRootConfigValues = { prefixCls: string };

export default function FormRootConfig(props: FormProps<FormRootConfigValues>) {
  return (
    <Form<FormRootConfigValues> autoComplete="off" layout="vertical" {...props}>
      <Form.Item name="prefixCls" required label="prefixCls" rules={[{ required: true }, { pattern: /^\w+$/ }]}>
        <Input style={{ width: "100%" }} placeholder="更改配置,观察自定义组件是否同步变更" />
      </Form.Item>
      <Form.Item style={{ marginBottom: 0 }}>
        <Space>
          <Button htmlType="submit" type="primary">
            submit
          </Button>
          <Button htmlType="reset">reset</Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
