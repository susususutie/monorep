import { Button, Form, Input } from "antd";
import { WrappedFormInternalProps } from "antd/lib/form/Form";
import { forwardRef, useImperativeHandle, useState } from "react";
import { MyButton } from "../lib";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Button type="primary" onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </Button>
      <MyButton type="primary" onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </MyButton>

      <Input addonBefore="addonBefore" addonAfter="addonAfter" suffix="suffix" prefix="prefix" />

      <Form
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        style={{ width: 600, margin: "20px auto" }}
      >
        <Form.Item label="MyInput"></Form.Item>
        <Form.Item label="Input">
          <Input />
        </Form.Item>
      </Form>

      <FormTest />
    </div>
  );
}

export default App;

const FormTest = Form.create({ name: "form-test" })(
  forwardRef((props, ref) => {
    const form = (props as WrappedFormInternalProps).form;

    useImperativeHandle(ref, () => form, [form]);

    return (
      <Form
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        style={{ width: 600, margin: "20px auto" }}
      >
        <Form.Item label="MyInput">
          {form.getFieldDecorator("myInput", {
            validateFirst: true,
            rules: [{ required: true }],
          })(
            <Input
            // addonAfter={
            //   <Form.Item>
            //     {form.getFieldDecorator("select", { validateFirst: true, rules: [{ required: true }] })(
            //       <Select placeholder="select">
            //         <Select.Option value={1}>1</Select.Option>
            //         <Select.Option value={2}>22222222222222222222</Select.Option>
            //       </Select>
            //     )}
            //   </Form.Item>
            // }
            />
          )}
        </Form.Item>
        <Form.Item label="Input">
          {form.getFieldDecorator("input", {
            validateFirst: true,
            rules: [{ required: true }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label=" " colon={false}>
          <Button onClick={() => form.validateFields()}>submit</Button>
        </Form.Item>
      </Form>
    );
  })
);
