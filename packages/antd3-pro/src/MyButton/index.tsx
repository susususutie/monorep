import { Button } from "antd";
import React from "react";

export type MyButtonProps = { children?: React.ReactNode };

export default function MyButton(props: MyButtonProps) {
  const { children = "MyButton" } = props;

  return <Button type="primary">{children}</Button>;
}
