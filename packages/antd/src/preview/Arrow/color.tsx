import React from "react";
import { Flex } from "antd";
import { Arrow } from "../../../lib";

const App: React.FC = () => (
  <Flex gap="small" wrap>
    <Arrow color="default" />
    <Arrow color="disabled" />
    <Arrow color="error" />
    <Arrow color="primary" />
    <Arrow color="success" />
    <Arrow color="warning" />
  </Flex>
);

export default App;
