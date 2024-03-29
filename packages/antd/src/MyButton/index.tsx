import { Button } from "antd";
import { ReactNode } from "react";

export type MyButtonProps = { children?: ReactNode };

export default function MyButton(props: MyButtonProps) {
  const { children = "MyButton" } = props;

  return <Button type="primary">{children}</Button>;
}
