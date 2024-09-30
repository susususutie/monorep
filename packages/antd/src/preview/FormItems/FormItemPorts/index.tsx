import { Button, Form, Space } from "antd";
import React from "react";
import { FormItemPorts } from "../../../../lib";

const App: React.FC = () => (
  <Form
    name="FormItemPorts"
    labelCol={{ span: 6 }}
    wrapperCol={{ span: 16 }}
    onFinish={console.log}
    onReset={console.log}
    initialValues={{
      ports: [11],
      data: { ports: [22] },
      info: [{ data: { ports: [33] } }],
      myPorts: [44],
    }}
  >
    <FormItemPorts label="端口" />
    <FormItemPorts name="data" label="data.ports" />
    <FormItemPorts name={["info", 0, "data"]} label="info[0].data" />
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

export default App;
