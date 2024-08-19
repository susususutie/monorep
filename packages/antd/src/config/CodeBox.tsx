import { Tooltip, Typography } from "antd";
import React, { useEffect, useState } from "react";
import {  JavaScriptOutlined } from "@ant-design/icons";

export type CodeBoxProps = {
  path: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
};
export default function CodeBox(props: CodeBoxProps) {
  const { path, title, description } = props;
  const [expand, setExpand] = useState(false);

  const [App, setApp] = useState(false);
  const [code, setCode] = useState(false);
  useEffect(() => {
    import(`../preview/${path}`).then(({ default: App }) => setApp(App));
    import(`../preview/${path}?raw`).then(({ default: code }) => setCode(code));
  }, []);

  return (
    <section
      style={{
        position: "relative",
        display: "inline-block",
        width: "calc(100% - 2px)",
        margin: "0 0 16px",
        backgroundColor: "#ffffff",
        border: "1px solid rgba(5, 5, 5, 0.06)",
        borderRadius: 8,
        transition: "all 0.2s",
      }}
    >
      <section
        className="demo"
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "8px 8px 0 0",
          padding: "42px 24px 50px",
          color: "rgba(0, 0, 0, 0.88)",
          borderBottom: "1px solid rgba(5, 5, 5, 0.06)",
        }}
      >
        {App}
      </section>
      <div
        className="mete"
        style={
          expand ? { borderBottom: "1px dashed rgba(5, 5, 5, 0.06)", borderRadius: 0 } : { borderRadius: "0 0 6px 6px" }
        }
      >
        <div className="description" style={{ padding: "18px 24px 12px" }}>
          <Typography.Title level={5}>{title}</Typography.Title>
          {description && <Typography.Paragraph>{description}</Typography.Paragraph>}
        </div>
        <div
          className="actions"
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "12px 0",
            borderTop: "1px dashed rgba(5, 5, 5, 0.06)",
            opacity: 0.7,
            transition: "opacity 0.3s",
          }}
        >
          <Tooltip title={expand ? "收起代码" : "显示代码"}>
            <JavaScriptOutlined onClick={() => setExpand(!expand)} />
          </Tooltip>
        </div>
      </div>
      {expand && (
        <div className="code" style={{ borderRadius: "0 0 6px 6px" }}>
          <pre style={{ padding: "12px 16px" }}>{code}</pre>
        </div>
      )}
    </section>
  );
}
