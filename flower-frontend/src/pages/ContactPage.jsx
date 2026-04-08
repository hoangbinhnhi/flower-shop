import React from 'react';
import { Form, Input, Button, message, Card } from 'antd';
import { SendOutlined } from '@ant-design/icons';

export const ContactPage = () => {
    const [form] = Form.useForm();

    const handleSendContact = (values) => {
        // 1. Lấy dữ liệu cũ từ kho ra
        const existingContacts = JSON.parse(localStorage.getItem('admin_contacts') || '[]');
        
        // 2. Tạo tin nhắn mới
        const newEntry = { 
            ...values, 
            _id: Date.now(), 
            date: new Date().toLocaleString(),
            status: 'Chưa đọc' 
        };

        // 3. Cất lại vào kho
        localStorage.setItem('admin_contacts', JSON.stringify([newEntry, ...existingContacts]));

        message.success('Đã gửi tin nhắn thành công! Admin sẽ thấy ngay nha! 💌');
        form.resetFields();
    };

    return (
        <div style={{ padding: '50px', background: '#fff5f7', minHeight: '90vh' }}>
            <Card title="💌 LIÊN HỆ TƯ VẤN HOA" style={{ maxWidth: 500, margin: '0 auto', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                <Form form={form} layout="vertical" onFinish={handleSendContact}>
                    <Form.Item label="Tên của bạn" name="name" rules={[{ required: true, message: 'Nhập tên nha bà!' }]}>
                        <Input placeholder="Bạn tên gì nè?" size="large" />
                    </Form.Item>

                    <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Email sai rồi!' }]}>
                        <Input placeholder="Ví dụ: hoa@gmail.com" size="large" />
                    </Form.Item>

                    <Form.Item label="Nội dung" name="message" rules={[{ required: true, message: 'Nhập nội dung tư vấn nha!' }]}>
                        <Input.TextArea placeholder="Bạn cần giúp gì..." rows={4} />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" icon={<SendOutlined />} style={{ background: '#ff8fab', borderColor: '#ff8fab', width: '100%', height: '45px', fontWeight: 'bold' }}>
                        GỬI LỜI NHẮN
                    </Button>
                </Form>
            </Card>
        </div>
    );
};