import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Page } from "@/widgets/Page";
import UserList from "@/widgets/UserList/ui/UserList";
import { Row, Col, Typography, Tooltip, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import CustomFooter from "@/widgets/CustomFooter/ui/CustomFooter";

const { Title } = Typography;

const MainPage = memo(() => {
  const { t } = useTranslation("main");
  const navigate = useNavigate();

  return (
    <Row justify="center" style={{ padding: "20px", textAlign: "center", position: "relative" }}>
      <Col span={24}>
        <Tooltip title="Админ панель">
          <Button
            type="text"
            icon={<UserOutlined style={{ fontSize: "24px", color: "#FFFFFF" }} />} 
            onClick={() => navigate("/adminpanel")}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              margin: "20px",
            }}
          />
        </Tooltip>

        <Page>
          <Title
            level={1}
            style={{
              background: "linear-gradient(90deg, #008cff, #e0201a)",
              backgroundSize: "200% auto",
              animation: "gradient 5s ease infinite",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: 0,
            }}
          >
            {t("HR Helper")}
          </Title>
          <UserList />
          <CustomFooter/>
        </Page>
      </Col>

      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </Row>
  );
});

export default MainPage;
