import React, { useState } from "react";
import { Table, Button, ConfigProvider, Modal, Tooltip, Input, Spin, Pagination, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetAllUsersQuery, useGetUserReviewsQuery, useStartAnalysisMutation } from "@/shared/api/rtkApi";

const UserList: React.FC = () => {
  const navigate = useNavigate();
  const { data: response = { workers_data: [] }, error, isLoading } = useGetAllUsersQuery();
  const users: string[] = response.workers_data.map(String);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showTooltip, setShowTooltip] = useState(() => {
    return localStorage.getItem("tooltipShown") !== "true";
  });
  const pageSize = 15;

  const { data: reviews, isLoading: isReviewsLoading } = useGetUserReviewsQuery(selectedIds, {
    skip: !isModalVisible || selectedIds.length === 0,
  });

  const [startAnalysis] = useStartAnalysisMutation();

  const handleTooltipClose = () => {
    setShowTooltip(false);
    localStorage.setItem("tooltipShown", "true");
  };

  const columns = [
    {
      title: <span style={{ color: "#FFFFFF" }}>ID сотрудника</span>,
      dataIndex: "id",
      render: (id: string) => (
        <a
          onClick={() => navigate(`/profile/${id}`)}
          style={{ color: selectedRowKeys.includes(id) ? "#000000" : "#FFFFFF" }}
        >
          {id}
        </a>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    hideSelectAll: true,
    onChange: (keys: React.Key[]) => {
      if (keys.length > 5) {
        message.warning("Можно выбрать не более 5 сотрудников");
      } else {
        setSelectedRowKeys(keys);
      }
    },
  };

  const handleSubmit = () => {
    setSelectedIds(selectedRowKeys.map((key) => key.toString()));
    setSelectedRowKeys([]);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
  };

  const handleStartAnalysis = async () => {
    try {
      const { message: startMessage, request_id } = await startAnalysis(selectedIds).unwrap();
      message.success(`${startMessage}. ID запроса: ${request_id}`);
    } catch {
      message.error("Ошибка при запуске анализа");
    }
  };

  const filteredUsers = users.filter((user) => user.includes(searchTerm));
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <ConfigProvider theme={{ token: { colorBgContainer: "#1F1F1F", colorText: "#FFFFFF" } }}>
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "50px 0" }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <Input
            prefix={<span style={{ color: "white" }}>Поиск ID: </span>}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              borderColor: "#5A9BD5",
              color: "white",
              backgroundColor: "#333",
              padding: "4px 8px",
              borderRadius: "4px",
              flex: 1,
              marginRight: 8,
            }}
          />
          <Tooltip
            title="Если Вам необходимо получить уязвимые места группы людей, выберите их из списка и нажмите 'Анализ'"
            open={showTooltip}
            onOpenChange={handleTooltipClose}
          >
            <Button
              type="primary"
              onClick={handleSubmit}
              style={{
                color: "#FFFFFF",
                backgroundColor: "#333",
                borderColor: "#5A9BD5",
                borderWidth: 1,
                borderStyle: "solid",
                borderRadius: "4px",
              }}
              disabled={selectedRowKeys.length === 0}
            >
              Анализ
            </Button>
          </Tooltip>
        </div>

        {isLoading ? (
          <div style={{ textAlign: "center", color: "#FFFFFF" }}>Загрузка...</div>
        ) : error ? (
          <div style={{ textAlign: "center", color: "#FF4D4F" }}>Ошибка при загрузке пользователей</div>
        ) : (
          <>
            <Table
              rowSelection={rowSelection} 
              columns={columns}
              dataSource={paginatedUsers.map((id) => ({ key: id, id }))}
              pagination={false}
              rowClassName={(record) =>
                selectedRowKeys.includes(record.id) ? "selected-row" : "default-row"
              }
              bordered
            />
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={filteredUsers.length}
              onChange={handlePageChange}
              style={{ marginTop: 16, textAlign: "center" }}
            />
          </>
        )}
      </div>

      <Modal
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalOk}
        style={{ color: "#000000", width: "60%", maxWidth: "800px" }}
        destroyOnClose={true}
        styles={{
          body: {
            color: "#000000",
            padding: "20px",
          },
        }}
      >
        <p style={{ color: "#000000", fontSize: "large" }}>Список отзывов</p>
        {isReviewsLoading ? (
          <Spin style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }} />
        ) : reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.worker_id} style={{ marginBottom: "20px" }}>
              <p style={{ color: "#000000" }}>ID: {review.worker_id}</p>
              <p style={{ color: "#000000" }}>Отзывы этого сотрудника:</p>
              <div
                style={{
                  maxHeight: "200px",
                  overflowY: "auto",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <ul style={{ paddingLeft: "20px" }}>
                  {Array.isArray(review.user_feedback) ? (
                    review.user_feedback.map((feedback, index) => (
                      <div key={index} style={{ color: "#000000", padding: "5px" }}>
                        <div style={{ border: "1px", background: "lightgrey", borderRadius: "10px", padding: "5px" }}>
                          {feedback}
                        </div>
                      </div>
                    ))
                  ) : (
                    <li style={{ color: "#000000" }}>Нет отзывов</li>
                  )}
                </ul>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: "#000000" }}>Нет отзывов для выбранных сотрудников.</p>
        )}

        <Button
          type="primary"
          onClick={handleStartAnalysis}
          style={{
            marginTop: 16,
            color: "#FFFFFF",
            backgroundColor: "#007bff",
            borderColor: "#007bff",
          }}
        >
          Начать анализ
        </Button>
      </Modal>
    </ConfigProvider>
  );
};

export default UserList;
