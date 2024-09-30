import { Alert, App, AutoComplete, Badge, Button, Card, Col, Divider, Flex, Row, Space, Tag, Typography } from "antd";
import DemoArrow from "./Arrow";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";

export default function PreviewContent() {
  const { message, modal, notification } = App.useApp();

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card title="Alert">
            <Space direction="vertical" style={{ width: "100%" }}>
              <Alert showIcon message="Success" type="success" closable />
              <Alert showIcon message="Info" type="info" closable />
              <Alert showIcon message="Warning" type="warning" closable />
              <Alert showIcon message="Error" type="error" closable />
            </Space>
          </Card>
          <br />
          <Card title="message">
            <Space wrap>
              <Button onClick={() => message.success("Success")}>Success</Button>
              <Button onClick={() => message.info("Info")}>Info</Button>
              <Button onClick={() => message.error("Error")}>Error</Button>
              <Button onClick={() => message.warning("Warning")}>Warning</Button>
              <Button onClick={() => message.loading("Loading")}>Loading</Button>
            </Space>
          </Card>
          <br />
          <Card title="notification">
            <Space wrap>
              <Button onClick={() => notification.success({ message: "Success", description: "description" })}>
                Success
              </Button>
              <Button onClick={() => notification.info({ message: "Info", description: "description" })}>Info</Button>
              <Button onClick={() => notification.error({ message: "Error", description: "description" })}>
                Error
              </Button>
              <Button onClick={() => notification.warning({ message: "Warning", description: "description" })}>
                Warning
              </Button>
            </Space>
          </Card>
          <br />
          <Card title="modal">
            <Space wrap>
              <Button onClick={() => modal.success({ title: "Success", content: "description" })}>Success</Button>
              <Button onClick={() => modal.info({ title: "Info", content: "description" })}>Info</Button>
              <Button onClick={() => modal.error({ title: "Error", content: "description" })}>Error</Button>
              <Button onClick={() => modal.warning({ title: "Warning", content: "description" })}>Warning</Button>
            </Space>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Button">
            <Space wrap>
              <Button type="primary">Primary </Button>
              <Button>Default</Button>
              <Button type="dashed">Dashed</Button>
              <Button type="text">Text</Button>
              <Button type="link">Link</Button>
              <Button danger type="primary">
                Primary
              </Button>
              <Button danger>Default Button</Button>
              <Button danger type="dashed">
                Dashed
              </Button>
              <Button danger type="text">
                Text
              </Button>
              <Button danger type="link">
                Link
              </Button>
            </Space>
          </Card>
          <br />
          <Card title="Typography.Text">
            <Space wrap>
              <Typography.Text>default</Typography.Text>
              <Typography.Text type="secondary">secondary</Typography.Text>
              <Typography.Text type="success">success</Typography.Text>
              <Typography.Text type="warning">warning</Typography.Text>
              <Typography.Text type="danger">danger</Typography.Text>
            </Space>
          </Card>
          <br />
          <Card title="AutoComplete">
            <Space wrap direction="vertical" style={{ width: "100%" }}>
              <AutoComplete style={{ width: "100%" }} status="warning" placeholder="Warning" />
              <AutoComplete style={{ width: "100%" }} status="error" placeholder="Error" />
            </Space>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Badge">
            <Space wrap>
              <Badge status="success" text="Success" />
              <Badge status="error" text="Error" />
              <Badge status="default" text="Default" />
              <Badge status="processing" text="Processing" />
              <Badge status="warning" text="Warning" />
            </Space>
          </Card>
          <br />
          <Card title="Tag">
            <Divider orientation="left">Without icon</Divider>
            <Flex wrap>
              <Tag color="success">success</Tag>
              <Tag color="processing">processing</Tag>
              <Tag color="error">error</Tag>
              <Tag color="warning">warning</Tag>
              <Tag color="default">default</Tag>
            </Flex>
            <Divider orientation="left">With icon</Divider>
            <Flex wrap>
              <Tag icon={<CheckCircleOutlined />} color="success">
                success
              </Tag>
              <Tag icon={<SyncOutlined spin />} color="processing">
                processing
              </Tag>
              <Tag icon={<CloseCircleOutlined />} color="error">
                error
              </Tag>
              <Tag icon={<ExclamationCircleOutlined />} color="warning">
                warning
              </Tag>
              <Tag icon={<ClockCircleOutlined />} color="default">
                waiting
              </Tag>
            </Flex>
          </Card>
        </Col>
      </Row>

      <DemoArrow />
    </>
  );
}
