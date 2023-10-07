import { Typography } from "antd";
import { ReactNode } from "react";

export type MyTitleProps = { children?: ReactNode };

export default function MyTitle(props: MyTitleProps) {
  const { children } = props;

  return <Typography.Title level={3}>{children ?? "MyTitle"}</Typography.Title>;
}
