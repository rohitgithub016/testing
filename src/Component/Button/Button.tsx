import { Typography } from "antd";
import "./index.css";

interface ButtonProps {
  clickHandler: () => void;
  text: string;
  disabled?: boolean;
  type?: string;
}

const Button = ({
  clickHandler,
  text,
  disabled = false,
  type = "contained",
}: ButtonProps) => {
  return (
    <button
      className={`btn ${
        type === "contained" ? "btn-contained " : "btn-outlined"
      }${disabled ? "disabled" : ""}`}
      onClick={clickHandler}
    >
      <Typography.Title
        level={4}
        style={{
          color: type === "contained" ? "#fff" : "#692DF6",
          fontFamily:
            type === "contained" ? "Scandia-Medium" : "Scandia-Regular",
        }}
      >
        {text}
      </Typography.Title>
    </button>
  );
};

export default Button;
