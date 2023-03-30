import { Card, Col } from 'antd';
import { ReactNode } from 'react';

export type ComponentPanelProps = {
  title: string;
  extra: string;
  children: ReactNode;
};

export default function ComponentPanel({ title, extra, children }: ComponentPanelProps) {
  return (
    <Col span={24}>
      <Card title={title} bordered hoverable extra={extra}>
        {children}
      </Card>
    </Col>
  );
}
