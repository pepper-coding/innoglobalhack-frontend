import React from "react";
import { Button, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
        style={{ marginBottom: "20px", color: "#FFFFFF", borderColor: "#FFFFFF" }}
      >
        Назад
      </Button>
      <Title level={2} style={{ color: "#FFFFFF" }}>Панель администрирования</Title>
      <Title level={5} style={{ color: "#FFFFFF" }}>добавьте отзывы или посмотрите историю запросов</Title>
    </>
  );
};

export default Header;
