import React from "react";
import { Layout, Typography } from "antd";

const { Footer } = Layout;
const { Text } = Typography;

const CustomFooter: React.FC = () => {
  return (
    <Footer
      style={{
        backgroundColor: "#333",
        color: "#FFFFFF",
        textAlign: "center",
        padding: "20px 0",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: "14px",
            marginBottom: "8px",
            display: "block",
            background: "linear-gradient(90deg, #00d9ff, #ff0800)",
            backgroundSize: "200% auto",
            animation: "gradient 5s ease infinite",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Pepper-Coding
        </Text>

        <div
          style={{
            display: "flex",
            flexDirection: "row", 
            justifyContent: "center",
            gap: "20px",
            width: "100%",
          }}
        >
          <Text
            style={{
              fontSize: "12px",
              display: "block",
              color: "#FFFFFF",
            }}
          >
            Локация: Ростов-на-Дону
          </Text>
          <Text
            style={{
              fontSize: "12px",
              display: "block",
              color: "#FFFFFF",
            }}
          >
            Открыты к сотрудничеству
          </Text>
        </div>
      </div>

      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </Footer>
  );
};

export default CustomFooter;
