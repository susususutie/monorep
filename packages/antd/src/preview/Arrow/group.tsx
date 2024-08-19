import React from "react";
import { Flex } from "antd";
import { Arrow } from "../../../lib";

const App: React.FC = () => (
  <Flex gap="small" wrap>
    <Arrow.Group size="small">
      small
      <Arrow />
      <Arrow />
    </Arrow.Group>

    <Arrow.Group size="default">
      default
      <Arrow />
      <Arrow />
    </Arrow.Group>
    
    <Arrow.Group size="large">
      large
      <Arrow />
      <Arrow />
    </Arrow.Group>
    
    <Arrow.Group size={10}>
      10
      <Arrow />
      <Arrow />
    </Arrow.Group>
  </Flex>
);

export default App;
