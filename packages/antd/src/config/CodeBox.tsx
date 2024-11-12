import { JavaScriptOutlined, Loading3QuartersOutlined } from "@ant-design/icons";
import { Tooltip, Typography } from "antd";
import React, { lazy, Suspense, useEffect, useState } from "react";

export type CodeBoxProps = {
  path?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  component: () => Promise<any>;
  originCode: () => Promise<any>;
};
export default function CodeBox(props: CodeBoxProps) {
  const { path, title, description, component, originCode } = props;

  const [expand, setExpand] = useState(false);

  const [App] = useState(() =>
    component ? lazy(component) : lazy(() => import(/* @vite-ignore */ `../preview/${path}`))
  );
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState();
  useEffect(() => {
    const loadCode = async (request: CodeBoxProps["originCode"]) => {
      setLoading(true);
      const res = await request();
      setCode(res?.default ?? res);
      setLoading(false);
    };
    if (typeof originCode === "function") {
      loadCode(originCode);
    }
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
        <Suspense>
          <App />
        </Suspense>
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
          {loading ? <Loading3QuartersOutlined /> : <pre style={{ padding: "12px 16px" }}>{code}</pre>}
        </div>
      )}
    </section>
  );
}
