import { Typography } from "antd";
import { ReactNode } from "react";

type MyTitleProps = { children?: ReactNode };

export default function MyTitle(props: MyTitleProps) {
  const { children = "MyTitle" } = props;

  return <Typography.Title level={3}>{children}</Typography.Title>;
}
