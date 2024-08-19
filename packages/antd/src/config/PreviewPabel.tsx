import React from "react";
import CodeBox, { type CodeBoxProps } from "./CodeBox";

type PreviewPabelProps = {
  items: (CodeBoxProps & { key: React.Key })[];
};

export default function PreviewPabel(props: PreviewPabelProps) {
  const { items } = props;

  return (
    <div style={{ display: "flex", gap: 16 }}>
      <section style={{ flex: "1 1 0" }}>
        {items.map((item, index) => (index % 2 === 0 ? <CodeBox {...item} /> : null))}
      </section>
      <section style={{ flex: "1 1 0" }}>
        {items.map((item, index) => (index % 2 === 1 ? <CodeBox {...item} /> : null))}
      </section>
    </div>
  );
}
