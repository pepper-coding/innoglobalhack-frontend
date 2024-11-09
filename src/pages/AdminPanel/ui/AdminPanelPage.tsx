import React from "react";
import { Card, ConfigProvider } from "antd";
import Header from "@/widgets/Header/ui/Header";
import ReviewForm from "@/widgets/ReviewForm/ui/ReviewForm";
import AnalysisRequestsHistory from "@/widgets/AnalysisRequestsHistory/ui/AnalysisRequestsHistory";


const AdminPanelPage: React.FC = () => {


  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: "#1F1F1F",
          colorText: "#FFFFFF",
          colorTextHeading: "#FFFFFF",
          colorBorder: "#333333",
        },
      }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "20px" }}>
        <Header />
        <Card bordered={false} style={{ marginBottom: "20px", backgroundColor: "#2C2C2C" }}>
          <ReviewForm />
        </Card>
        <AnalysisRequestsHistory />
      </div>
    </ConfigProvider>
  );
};

export default AdminPanelPage;
