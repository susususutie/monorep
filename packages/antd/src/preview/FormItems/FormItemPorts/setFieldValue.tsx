import React from "react";
import { Button, Form, Space } from "antd";
import { FormItemPorts } from "../../../../lib";

const App: React.FC = () => {
  // TODO const [form] = Form.useForm();

  return (
    <Form
      // form={form}
      name="FormItemPorts-setFieldValue"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      onFinish={console.log}
      onReset={console.log}
      initialValues={{
        ports: [22],
        myPorts: [80],
      }}
    >
      <FormItemPorts label="Ports" />
      <FormItemPorts names={{ ports: "myPorts" }} label="myPorts" />
      <Form.Item label=" " colon={false}>
        <Space>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
          <Button htmlType="reset">Reset</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default App;
