import { Typography } from "antd";
import { ReactNode } from "react";

export default function MyTitle({ children }: { children?: ReactNode }) {
  return <Typography.Title level={3}>{children}</Typography.Title>;
}
