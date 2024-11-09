import React, { useState } from "react";
import { Card, Select, Spin, Alert, Typography } from "antd";
import { useGetAllAnalysisRequestsQuery } from "@/shared/api/rtkApi";
import AnalysisRequestCard from "@/widgets/AnalysisRequestCard/ui/AnalysisRequestCard";

const { Title } = Typography;
const { Option } = Select;

const AnalysisRequestsHistory: React.FC = () => {
  const { data: analysisRequests = [], error: analysisError, isLoading: isAnalysisLoading } = useGetAllAnalysisRequestsQuery();
  const [sortOrder, setSortOrder] = useState<"default" | "asc" | "desc">("default");

  const sortedAnalysisRequests = [...analysisRequests].sort((a, b) => {
    if (sortOrder === "asc") return a.id - b.id;
    if (sortOrder === "desc") return b.id - a.id;
    return 0;
  });

  const handleSortChange = (value: "default" | "asc" | "desc") => setSortOrder(value);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px" }}>
        <Title level={5} style={{ color: "#FFFFFF", marginBottom: 0 }}>История запросов анализа</Title>
        <Select defaultValue="default" onChange={handleSortChange} style={{ width: 200, color: "#000000" }}>
          <Option value="default">Без сортировки</Option>
          <Option value="asc">От самых старых</Option>
          <Option value="desc">От самых новых</Option>
        </Select>
      </div>
      <Card bordered={false} style={{ backgroundColor: "#2C2C2C", marginTop: "10px" }}>
        {isAnalysisLoading ? (
          <div style={{ textAlign: "center", padding: "20px" }}><Spin /></div>
        ) : analysisError ? (
          <Alert message="Ошибка" description="Не удалось загрузить историю запросов." type="error" showIcon />
        ) : (
          <AnalysisRequestCard requests={sortedAnalysisRequests} />
        )}
      </Card>
    </>
  );
};

export default AnalysisRequestsHistory;
