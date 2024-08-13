import { Button, Card, ConfigProvider, Form, FormProps, Input, ColorPicker, Layout, Slider, theme } from "antd";
import { Color } from "antd/es/color-picker";
import { SeedToken } from "antd/es/theme/internal";
import { useState } from "react";

type FormValues = {
  colorPrimary: Color;
  // colorSuccess: Color;
  // colorWarning: Color;
  // colorError: Color;
  // colorInfo: Color;
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
};

export default function FormSeedToken() {
  const [seedToken, setSeedToken] = useState<Partial<SeedToken>>({ colorPrimary: "#00b96b", borderRadius: 6 });

  return (
    <Form<FormValues>
      layout="vertical"
      initialValues={seedToken}
      onFinish={(values) => {
        let newSeedToken: Partial<SeedToken> = {};
        Object.entries(values).forEach(([key, value]) => {
          if (typeof value === "number") {
            newSeedToken.borderRadius = value;
          }
          if (typeof value === "object") {
            newSeedToken.colorPrimary = value.toHexString();
          }
        });

        setSeedToken(newSeedToken);
      }}
    >
      <Form.Item name="colorPrimary" required label="colorPrimary">
        <ColorPicker showText />
      </Form.Item>
      <Form.Item name="borderRadius" required label="borderRadius">
        <Slider min={0} max={24} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">
          submit
        </Button>
      </Form.Item>
    </Form>
  );
}
