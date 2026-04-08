import React from 'react';
import { Form, Input, Button, message, Card, InputNumber, Select, DatePicker } from 'antd';
import { BgColorsOutlined } from '@ant-design/icons';

export const CheckoutPage = () => {
    const [form] = Form.useForm();

    const handleSendOrder = (values) => {
        // --- 🪄 CHIÊU ẢO THUẬT: LƯU VÀO KHO ĐƠN HÀNG THIẾT KẾ ---
        // 1. Lấy danh sách đơn hàng cũ ra
        const existingOrders = JSON.parse(localStorage.getItem('admin_orders') || '[]');
        
        // 2. Tạo đơn hàng mới (format lại ngày tháng cho đẹp)
        const newOrder = { 
            ...values, 
            _id: Date.now(), 
            deliveryDate: values.deliveryDate ? values.deliveryDate.format('DD/MM/YYYY') : 'Chưa chọn',
            status: 'Đang xử lý' 
        };

        // 3. Cất lại vào kho admin_orders
        localStorage.setItem('admin_orders', JSON.stringify([newOrder, ...existingOrders]));

        message.success('Đã gửi yêu cầu đặt hoa thiết kế riêng! Shop sẽ gọi lại bà ngay nha! 🌸');
        form.resetFields();
    };

    return (
        <div style={{ padding: '50px', background: '#fff5f7', minHeight: '90vh' }}>
            <Card 
                title={<span><BgColorsOutlined /> ĐẶT HOA THIẾT KẾ RIÊNG</span>} 
                style={{ maxWidth: 600, margin: '0 auto', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
            >
                <Form form={form} layout="vertical" onFinish={handleSendOrder}>
                    <Form.Item label="Họ tên người đặt" name="customerName" rules={[{ required: true, message: 'Nhập tên bà để tui biết gọi ai nè!' }]}>
                        <Input placeholder="Ví dụ: Chị Nhi" size="large" />
                    </Form.Item>

                    <div style={{ display: 'flex', gap: '20px' }}>
                        <Form.Item label="Dịp tặng hoa" name="occasion" style={{ flex: 1 }} rules={[{ required: true }]}>
                            <Select placeholder="Chọn dịp" size="large">
                                <Select.Option value="Sinh nhật">Sinh nhật</Select.Option>
                                <Select.Option value="Kỷ niệm">Kỷ niệm</Select.Option>
                                <Select.Option value="Tỏ tình">Tỏ tình / Cầu hôn</Select.Option>
                                <Select.Option value="Khai trương">Khai trương</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label="Ngân sách dự kiến (VNĐ)" name="budget" style={{ flex: 1 }} rules={[{ required: true }]}>
                            <InputNumber 
                                placeholder="Ví dụ: 500000" 
                                style={{ width: '100%' }} 
                                size="large" 
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            />
                        </Form.Item>
                    </div>

                    <Form.Item label="Ngày muốn nhận hoa" name="deliveryDate" rules={[{ required: true }]}>
                        <DatePicker style={{ width: '100%' }} size="large" placeholder="Chọn ngày giao" />
                    </Form.Item>

                    <Form.Item label="Mô tả mẫu hoa bà muốn (màu sắc, loại hoa...)" name="description">
                        <Input.TextArea placeholder="Ví dụ: Tone hồng trắng, nhiều hoa hồng ngoại..." rows={4} />
                    </Form.Item>

                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        style={{ background: '#fb6f92', borderColor: '#fb6f92', width: '100%', height: '45px', fontWeight: 'bold', fontSize: '16px' }}
                    >
                        GỬI YÊU CẦU THIẾT KẾ
                    </Button>
                </Form>
            </Card>
        </div>
    );
};