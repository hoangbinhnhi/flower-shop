import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Row, Col, Form, Input, Button, Radio, Select, 
    message, Card, Typography, Space, Divider, 
    DatePicker, InputNumber, Tabs 
} from 'antd';
import { 
    ArrowLeftOutlined, CheckCircleOutlined, 
    BgColorsOutlined, ShoppingOutlined 
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

export const CheckoutPage = () => {
    const navigate = useNavigate();
    const [formNormal] = Form.useForm();
    const [formCustom] = Form.useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // --- 1. XỬ LÝ FORM THANH TOÁN BÌNH THƯỜNG ---
    const onFinishNormal = (values) => {
        setIsSubmitting(true);
        setTimeout(() => {
            console.log('📦 Đơn hàng bình thường:', values);
            message.success('🎉 Đặt hoa thành công! Shop sẽ gọi xác nhận ngay.');
            setIsSubmitting(false);
            formNormal.resetFields();
            navigate('/');
        }, 1000);
    };

    // --- 2. XỬ LÝ FORM ĐẶT HOA THIẾT KẾ ---
    const onFinishCustom = (values) => {
        const existingOrders = JSON.parse(localStorage.getItem('admin_orders') || '[]');
        const newOrder = { 
            ...values, 
            _id: Date.now(), 
            deliveryDate: values.deliveryDate ? values.deliveryDate.format('DD/MM/YYYY') : 'Chưa chọn',
            type: 'Thiết kế riêng',
            status: 'Đang xử lý' 
        };
        localStorage.setItem('admin_orders', JSON.stringify([newOrder, ...existingOrders]));
        message.success('🌸 Đã gửi yêu cầu thiết kế riêng! Shop sẽ liên hệ tư vấn bà nha!');
        formCustom.resetFields();
    };

    return (
        <div style={{ padding: '3vw 5vw', background: '#fffafb', minHeight: '100vh' }}>
            <Button 
                icon={<ArrowLeftOutlined />} 
                onClick={() => navigate('/')} 
                style={{ marginBottom: '20px', borderRadius: '8px', borderColor: '#fb6f92', color: '#fb6f92' }}
            >
                Quay lại Trang Chủ
            </Button>

            <Row justify="center">
                <Col xs={24} md={18} lg={14}>
                    <Card style={{ borderRadius: '20px', boxShadow: '0 8px 24px rgba(251, 111, 146, 0.1)' }}>
                        <Tabs defaultActiveKey="1" centered size="large"
                            items={[
                                // TAB 1: THANH TOÁN GIỎ HÀNG
                                {
                                    key: '1',
                                    label: (<span><ShoppingOutlined /> Thanh toán đơn hàng</span>),
                                    children: (
                                        <Form form={formNormal} layout="vertical" onFinish={onFinishNormal} initialValues={{ paymentMethod: 'cod' }}>
                                            <Divider orientation="left" style={{ color: '#fb6f92' }}>Thông tin người nhận</Divider>
                                            <Row gutter={16}>
                                                <Col span={12}>
                                                    <Form.Item label="Họ tên" name="fullName" rules={[{ required: true, message: 'Nhập tên bà ơi!' }]}>
                                                        <Input placeholder="Tên người nhận..." />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item label="SĐT" name="phone" rules={[{ required: true, message: 'Nhập SĐT nha!' }]}>
                                                        <Input placeholder="098..." />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Form.Item label="Địa chỉ giao hàng" name="address" rules={[{ required: true }]}>
                                                <Input placeholder="Số nhà, tên đường..." />
                                            </Form.Item>
                                            <Form.Item label="Lời nhắn trên thiệp" name="cardMessage">
                                                <TextArea rows={3} placeholder="Chúc mừng sinh nhật..." />
                                            </Form.Item>
                                            <Form.Item label="Phương thức thanh toán" name="paymentMethod">
                                                <Radio.Group>
                                                    <Radio value="cod">Tiền mặt (COD)</Radio>
                                                    <Radio value="transfer">Chuyển khoản</Radio>
                                                </Radio.Group>
                                            </Form.Item>
                                            <Button type="primary" htmlType="submit" block loading={isSubmitting}
                                                style={{ background: '#fb6f92', borderColor: '#fb6f92', height: '45px', fontWeight: 'bold' }}>
                                                XÁC NHẬN ĐẶT HÀNG
                                            </Button>
                                        </Form>
                                    ),
                                },
                                // TAB 2: ĐẶT HOA THIẾT KẾ
                                {
                                    key: '2',
                                    label: (<span><BgColorsOutlined /> Đặt hoa thiết kế riêng</span>),
                                    children: (
                                        <Form form={formCustom} layout="vertical" onFinish={onFinishCustom}>
                                            <Divider orientation="left" style={{ color: '#fb6f92' }}>Yêu cầu thiết kế</Divider>
                                            <Form.Item label="Họ tên người đặt" name="customerName" rules={[{ required: true }]}>
                                                <Input placeholder="Tên của bà..." />
                                            </Form.Item>
                                            <Row gutter={16}>
                                                <Col span={12}>
                                                    <Form.Item label="Ngân sách (VNĐ)" name="budget" rules={[{ required: true }]}>
                                                        <InputNumber style={{ width: '100%' }} formatter={v => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item label="Ngày nhận" name="deliveryDate" rules={[{ required: true }]}>
                                                        <DatePicker style={{ width: '100%' }} />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Form.Item label="Mô tả mẫu hoa bà muốn" name="description">
                                                <TextArea rows={4} placeholder="Ví dụ: Tone hồng, phong cách vintage..." />
                                            </Form.Item>
                                            <Button type="primary" htmlType="submit" block
                                                style={{ background: '#fb6f92', borderColor: '#fb6f92', height: '45px', fontWeight: 'bold' }}>
                                                GỬI YÊU CẦU THIẾT KẾ
                                            </Button>
                                        </Form>
                                    ),
                                },
                            ]}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};