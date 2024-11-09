import React from "react";
import { Form, Input, Button, Typography, notification, Card } from "antd";
import { useAddReviewMutation } from "@/shared/api/rtkApi";

const { Text } = Typography;

const ReviewForm: React.FC = () => {
  const [addReview, { isLoading }] = useAddReviewMutation();
  const [form] = Form.useForm();

  const onFinish = async (values: { reviewer_id: number; worker_id: number; review_text: string }) => {
    try {
      await addReview(values).unwrap();
      notification.success({
        message: "Успешно",
        description: "Отзыв успешно добавлен!",
      });
      form.resetFields();
    } catch {
      notification.error({
        message: "Ошибка",
        description: "Не удалось добавить отзыв.",
      });
    }
  };

  return (
    <Card bordered={false} style={{ backgroundColor: "#2C2C2C" }}>
        <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item label={<Text style={{ color: "#FFFFFF" }}>ID автора отзыва</Text>} name="reviewer_id" rules={[{ required: true, message: "Введите ID автора" }]}>
                <Input type="number" style={{ backgroundColor: "#333", color: "#FFFFFF", borderColor: "#5A9BD5" }} />
            </Form.Item>
            <Form.Item label={<Text style={{ color: "#FFFFFF" }}>ID человека, которого оценивают</Text>} name="worker_id" rules={[{ required: true, message: "Введите ID человека под отзывом" }]}>
                <Input type="number" style={{ backgroundColor: "#333", color: "#FFFFFF", borderColor: "#5A9BD5" }} />
            </Form.Item>
            <Form.Item label={<Text style={{ color: "#FFFFFF" }}>Текст отзыва</Text>} name="review_text" rules={[{ required: true, message: "Введите текст отзыва" }]}>
                <Input.TextArea rows={4} style={{ backgroundColor: "#333", color: "#FFFFFF", borderColor: "#5A9BD5" }} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading} style={{ backgroundColor: "#5A9BD5", borderColor: "#5A9BD5" }}>
                Добавить отзыв
                </Button>
            </Form.Item>
        </Form>
    </Card>

  );
};

export default ReviewForm;