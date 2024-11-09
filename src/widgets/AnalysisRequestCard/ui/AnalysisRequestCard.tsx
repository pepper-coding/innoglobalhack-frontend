import React, { useState } from "react";
import { Card, Typography, Pagination } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface AnalysisRequest {
  id: number;
  analysis_status: string;
  worker_ids: string[];
  average?: string;
  analysis_result: string | string[] | null;
}

interface AnalysisRequestCardProps {
  requests: AnalysisRequest[];
}

const AnalysisRequestCard: React.FC<AnalysisRequestCardProps> = ({ requests }) => {
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const toggleExpanded = (id: number) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderAnalysisResult = (result: string | string[] | null) => {
    if (!result) {
      return <Text style={{ color: "#FFFFFF" }}>Результат анализа отсутствует</Text>;
    }

    if (Array.isArray(result)) {
        return result.map((text, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            {text.split("\n").map((line, lineIndex) => (
              <Text key={lineIndex} style={{ color: "#FFFFFF", display: "block" }}>
                {line.trim() === "" ? <br /> : line}
              </Text>
            ))}
          </div>
        ));
      }

      return result.split("\n").map((line, index) => (
        <Text key={index} style={{ color: "#FFFFFF", display: "block" }}>
          {line.trim() === "" ? <br /> : line}
        </Text>
      ));
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentRequests = requests.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {currentRequests.map((request) => (
        <Card
          key={request.id}
          style={{ backgroundColor: "#333", marginBottom: "10px", padding: "10px", borderRadius: "8px" }}
          bordered={false}
        >
          <Text style={{ color: "#FFFFFF" }}>
            <strong>ID запроса:</strong> {request.id}
          </Text>
          <br />
          <Text style={{ color: "#FFFFFF" }}>
            <strong>Статус:</strong> {request.analysis_status}
          </Text>
          <br />
          <Text style={{ color: "#FFFFFF" }}>
            <strong>Сотрудники:</strong> {request.worker_ids.join(", ")}
          </Text>
          <br />
          <Text style={{ color: "#FFFFFF" }}>
            <strong>Общая оценка:</strong> {request.average ?? "Не указана"}
          </Text>
          <br />
          <Text
            onClick={() => toggleExpanded(request.id)}
            style={{ color: "#FFFFFF", cursor: "pointer", display: "flex", alignItems: "center" }}
          >
            Критерии и сводка {expanded[request.id] ? <UpOutlined style={{ marginLeft: 8 }} /> : <DownOutlined style={{ marginLeft: 8 }} />}
          </Text>
          {expanded[request.id] && (
            <div style={{ paddingLeft: "20px", marginTop: "10px" }}>
              {renderAnalysisResult(request.analysis_result)}
            </div>
          )}
        </Card>
      ))}

      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={requests.length}
        onChange={handlePageChange}
        style={{ textAlign: "center", marginTop: "20px" }}
      />
    </div>
  );
};

export default AnalysisRequestCard;
