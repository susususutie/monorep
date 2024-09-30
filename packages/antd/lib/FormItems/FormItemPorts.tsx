import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, FormItemProps, InputNumber, Typography } from "antd";

const getNamePath = (name: FormItemProps["name"]) => (Array.isArray(name) ? name : [name]);

export type FormItemPortsProps = {
  name?: FormItemProps["name"];
  names?: {
    ports: FormItemProps["name"];
  };
  label?: FormItemProps["label"];
  max?: number;
}

/**
 * 端口输入
 */
export default function FormItemPorts(props: FormItemPortsProps) {
  const { name = [], names, label = "端口", max = 20 } = props;
  const baseNamePath = getNamePath(name);
  const nameList = [...baseNamePath, ...getNamePath(names?.ports || "ports")];

  return (
    <Form.List
      name={nameList}
      rules={[
        {
          validator: async (_, names) => {
            if (!names || names.length < 1) {
              return Promise.reject(new Error("至少添加一个端口"));
            }
          },
        },
      ]}
    >
      {(fields, { add, remove }, { errors }) => (
        <>
          {fields.map(({ key, ...field }, index) => (
            <Form.Item key={key} label={index === 0 ? label : " "} colon={index === 0} required={index === 0}>
              <Form.Item {...field} rules={[{ required: true, message: "请输入" }]} noStyle>
                <InputNumber min={1} max={65535} placeholder="请输入" style={{ width: "100%" }} />
              </Form.Item>
              {fields.length > 1 ? (
                <MinusCircleOutlined
                  style={{ cursor: "pointer", position: "absolute", top: 6, right: -24, fontSize: 16 }}
                  onClick={() => remove(field.name)}
                />
              ) : null}
            </Form.Item>
          ))}
          <Form.Item label=" " colon={false}>
            {fields.length < max && (
              <Typography.Link onClick={() => add()}>
                <PlusOutlined /> 添加一行
              </Typography.Link>
            )}
            <Form.ErrorList errors={errors} />
          </Form.Item>
        </>
      )}
    </Form.List>
  );
}
