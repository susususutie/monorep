import { Button, ColorPicker, Form, FormProps, Slider, Space } from "antd";
import { Color } from "antd/es/color-picker";

export type FormSeedTokenValues = Partial<{
  colorPrimary: string;
  // colorSuccess: string;
  // colorWarning: string;
  // colorError: string;
  // colorInfo: string;
  // colorTextBase: Color;
  // colorBgBase: Color;
  // colorLink: Color;
  // fontFamily: string;
  // fontFamilyCode: string;
  // fontSize: number;
  // lineWidth: number;
  // lineType: string;
  borderRadius: number;
  // sizeUnit: number;
  // sizeStep: number;
  // sizePopupArrow: number;
  // controlHeight: number;
  // zIndexBase: number;
  // zIndexPopupBase: number;
  // opacityImage: number;
  // motionUnit: number;
  // motionBase: number;
  // motionEaseOutCirc: string;
  // motionEaseInOutCirc: string;
  // motionEaseInOut: string;
  // motionEaseOutBack: string;
  // motionEaseInBack: string;
  // motionEaseInQuint: string;
  // motionEaseOutQuint: string;
  // motionEaseOut: string;
  // wireframe: boolean;
  // motion: boolean;
}>;

type FormValues = {
  colorPrimary: Color;
  // colorSuccess: Color;
  // colorWarning: Color;
  // colorError: Color;
  // colorInfo: Color;
  borderRadius: number;
};

type FormSeedTokenProps = Omit<FormProps<FormValues>, "onFinish"> & { onFinish: (values: FormSeedTokenValues) => void };

export default function FormSeedToken(props: FormSeedTokenProps) {
  const { onFinish, ...rest } = props;

  return (
    <Form<FormValues>
      autoComplete="off"
      layout="vertical"
      {...rest}
      onFinish={(values) => {
        let newSeedToken = {} as FormSeedTokenValues;
        Object.entries(values).forEach(([key, value]) => {
          if (typeof value === "number") {
            newSeedToken.borderRadius = value;
          }
          if (typeof value === "object") {
            newSeedToken.colorPrimary = value.toHexString();
          }
        });
        onFinish?.(newSeedToken);
      }}
    >
      <Form.Item name="colorPrimary" required label="colorPrimary">
        <ColorPicker showText />
      </Form.Item>
      <Form.Item name="borderRadius" required label="borderRadius">
        <Slider min={0} max={24} />
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
