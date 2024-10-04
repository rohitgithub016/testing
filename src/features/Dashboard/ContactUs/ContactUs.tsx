import { Card, Flex, Typography } from "antd";
import "./index.css";
import ArrorRightSVG from "src/assets/svg/Arrows/ArrorRightSVG";

interface ContactUsProps {
  openContactUsDrawer: () => void;
}

const ContactUs = ({ openContactUsDrawer }: ContactUsProps) => {
  return (
    <Card onClick={openContactUsDrawer}>
      <Flex justify="space-between" className="contact-us-btn" align="center">
        <Typography.Paragraph className="large-para-regular">
          Contact Us
        </Typography.Paragraph>
        <ArrorRightSVG />
      </Flex>
    </Card>
  );
};

export default ContactUs;
