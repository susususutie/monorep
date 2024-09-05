import { Alert, App, AutoComplete, Badge, Button, Col, Row, Space, Tag, Typography } from "antd";
import DemoArrow from "./Arrow";

export default function PreviewContent() {
  const { message, modal, notification } = App.useApp();

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Alert message="Success" type="success" />
          <br />
          <Alert message="Info" type="info" />
          <br />
          <Alert message="Warning" type="warning" />
          <br />
          <Alert message="Error" type="error" />
        </Col>
        <Col span={8}>
          Button
          <br />
          <Space wrap>
            <Button type="primary">Primary Button</Button>
            <Button>Default Button</Button>
            <Button type="dashed">Dashed Button</Button>
            <Button type="text">Text Button</Button>
            <Button type="link">Link Button</Button>
            <Button danger type="primary">
              Primary Button
            </Button>
            <Button danger>Default Button</Button>
            <Button danger type="dashed">
              Dashed Button
            </Button>
            <Button danger type="text">
              Text Button
            </Button>
            <Button danger type="link">
              Link Button
            </Button>
          </Space>
          <br />
          Text
          <br />
          <Space wrap>
            <Typography.Text>Ant Design (default)</Typography.Text>
            <Typography.Text type="secondary">Ant Design (secondary)</Typography.Text>
            <Typography.Text type="success">Ant Design (success)</Typography.Text>
            <Typography.Text type="warning">Ant Design (warning)</Typography.Text>
            <Typography.Text type="danger">Ant Design (danger)</Typography.Text>
          </Space>
          <br />
          AutoComplete
          <br />
          <Space wrap direction="vertical">
            <AutoComplete status="warning" placeholder="Warning" />
            <AutoComplete status="error" placeholder="Error" />
          </Space>
        </Col>
        <Col span={8}>
          Badge
          <br />
          <Space wrap>
            <Badge status="success" text="Success" />
            <Badge status="error" text="Error" />
            <Badge status="default" text="Default" />
            <Badge status="processing" text="Processing" />
            <Badge status="warning" text="Warning" />
          </Space>
          message
          <br />
          <Space wrap>
            <Tag color="success" onClick={() => message.success("Success")}>
              Success
            </Tag>
            <Tag color="processing" onClick={() => message.info("Info")}>
              Processing
            </Tag>
            <Tag color="error" onClick={() => message.error("Error")}>
              Error
            </Tag>
            <Tag color="warning" onClick={() => message.warning("Warning")}>
              Warning
            </Tag>
            <Tag color="default" onClick={() => message.loading("Loading")}>
              Loading
            </Tag>
          </Space>
          <br />
          notification
          <br />
          <Space wrap>
            <Tag
              color="success"
              onClick={() => notification.success({ message: "Success", description: "description" })}
            >
              Success
            </Tag>
            <Tag color="processing" onClick={() => notification.info({ message: "Info", description: "description" })}>
              Processing
            </Tag>
            <Tag color="error" onClick={() => notification.error({ message: "Error", description: "description" })}>
              Error
            </Tag>
            <Tag
              color="warning"
              onClick={() => notification.warning({ message: "Warning", description: "description" })}
            >
              Warning
            </Tag>
          </Space>
          <br />
          modal
          <br />
          <Space wrap>
            <Tag color="success" onClick={() => modal.success({ title: "Success", content: "description" })}>
              Success
            </Tag>
            <Tag color="processing" onClick={() => modal.info({ title: "Info", content: "description" })}>
              Processing
            </Tag>
            <Tag color="error" onClick={() => modal.error({ title: "Error", content: "description" })}>
              Error
            </Tag>
            <Tag color="warning" onClick={() => modal.warning({ title: "Warning", content: "description" })}>
              Warning
            </Tag>
          </Space>
        </Col>
      </Row>

      <DemoArrow />
    </>
  );
}
