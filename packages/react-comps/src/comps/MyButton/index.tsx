import { Button } from "antd";
import { ReactNode } from "react";

export default function MyButton({ children }: { children: ReactNode }) {
  return <Button type='primary'>{children}</Button>;
}
