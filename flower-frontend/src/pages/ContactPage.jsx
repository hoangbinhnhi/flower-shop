import React from 'react';
import { Form, Input, Button, message, Card } from 'antd';
import { SendOutlined } from '@ant-design/icons';

export const ContactPage = () => {
    const [form] = Form.useForm();

    const handleSendContact = (values) => {
        // 1. Lấy dữ liệu cũ từ kho admin_contacts ra
        const existingContacts = JSON.parse(localStorage.getItem('admin_contacts') || '[]');
        
        // 2. Tạo tin nhắn mới 
        // Lưu ý: Đổi 'date' thành 'createdAt' để khớp với bảng Admin tui đưa lúc nãy
        const newEntry = { 
            ...values, 
            _id: Date.now(), 
            createdAt: new Date().toLocaleString(), // Sửa ở đây để Admin hiện đúng cột
            status: 'Chưa đọc' 
        };

        // 3. Cất lại vào kho
        localStorage.setItem('admin_contacts', JSON.stringify([newEntry, ...existingContacts]));

        message.success('Đã gửi tin nhắn thành công! Admin sẽ thấy ngay nha! 💌');
        form.resetFields(); // Gửi xong xóa trắng form
    };

    return (
        <div style={{ padding: '50px', background: '#fff5f7', minHeight: '90vh' }}>
            <Card 
                title={<span style={{ color: '#fb6f92' }}><SendOutlined /> LIÊN HỆ TƯ VẤN HOA</span>} 
                style={{ maxWidth: 500, margin: '0 auto', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
            >
                <Form form={form} layout="vertical" onFinish={handleSendContact}>
                    <Form.Item 
                        label="Tên của bạn" 
                        name="name" // Khớp với dataIndex: 'name' bên Admin
                        rules={[{ required: true, message: 'Nhập tên nha bà!' }]}
                    >
                        <Input placeholder="Bạn tên gì nè?" size="large" />
                    </Form.Item>

                    <Form.Item 
                        label="Email / SĐT" 
                        name="email" // Khớp với dataIndex: 'email' bên Admin
                        rules={[{ required: true, message: 'Cho shop xin thông tin liên lạc!' }]}
                    >
                        <Input placeholder="Ví dụ: 090xxx hoặc hoa@gmail.com" size="large" />
                    </Form.Item>

                    <Form.Item 
                        label="Nội dung lời nhắn" 
                        name="message" // Khớp với dataIndex: 'message' bên Admin
                        rules={[{ required: true, message: 'Nhập nội dung tư vấn nha!' }]}
                    >
                        <Input.TextArea placeholder="Bà cần tụi mình giúp gì..." rows={4} />
                    </Form.Item>

                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        icon={<SendOutlined />} 
                        style={{ 
                            background: '#fb6f92', 
                            borderColor: '#fb6f92', 
                            width: '100%', 
                            height: '45px', 
                            fontWeight: 'bold',
                            borderRadius: '10px'
                        }}
                    >
                        GỬI LỜI NHẮN NGAY
                    </Button>
                </Form>
            </Card>
        </div>
    );
};