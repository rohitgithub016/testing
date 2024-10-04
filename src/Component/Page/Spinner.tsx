import { Flex, Spin } from "antd";

const Spinner = () => {
  return (
    <Flex
      justify="center"
      align="center"
      flex={1}
      style={{ width: "100vw", height: "100vh" }}
    >
      <Spin size="large" />
    </Flex>
  );
};

export default Spinner;
