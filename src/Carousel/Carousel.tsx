import React from "react";
import { Carousel as AntdCarousel, Card, Flex } from "antd";
import "./index.css";

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "160px",
  color: "#000",
  lineHeight: "160px",
  textAlign: "center",
};

const Carousel: React.FC = () => {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  return (
    <AntdCarousel afterChange={onChange}>
      <Flex>
        <Card style={contentStyle}>
          <h3>1</h3>
        </Card>
      </Flex>
      <Flex>
        <Card style={contentStyle}>
          <h3>2</h3>
        </Card>
      </Flex>
      <Flex>
        <Card style={contentStyle}>
          <h3>3</h3>
        </Card>
      </Flex>
    </AntdCarousel>
  );
};

export default Carousel;
