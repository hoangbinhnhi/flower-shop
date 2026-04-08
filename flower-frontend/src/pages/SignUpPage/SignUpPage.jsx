import React from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd'; // Thêm message vào đây
import { useNavigate } from 'react-router-dom';
import * as UserService from '../../services/UserService'; // Nhớ check đường dẫn tới file service này nha bà

const { Title } = Typography;

export const SignUpPage = () => {
    const navigate = useNavigate();

    // 👉 Đưa cái hàm onFinish vào bên TRONG SignUpPage nè má ơi!
    const onFinish = async (values) => {
        try {
            const res = await UserService.signupUser({
                email: values.email,
                password: values.password,
                confirmPassword: values.confirm
            });

            if (res?.status === 'OK') {
                message.success('Đăng ký thành công! Đăng nhập để xem hoa nhé 🌸');
                navigate('/sign-in');
            } else {
                message.error(res?.message || 'Đăng ký thất bại rồi má ơi!');
            }
        } catch (e) {
            message.error('Lỗi kết nối Server: ' + e.message);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#fff0f3' }}>
            <Card style={{ width: 400, borderRadius: '15px' }}>
                <Title level={2} style={{ textAlign: 'center', color: '#fb6f92' }}>Đăng Ký</Title>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Vui lòng nhập email đúng định dạng!' }]}>
                        <Input placeholder="Nhập email của bạn" />
                    </Form.Item>

                    <Form.Item label="Mật khẩu" name="password" rules={[{ required: true, min: 6, message: 'Mật khẩu ít nhất 6 ký tự!' }]}>
                        <Input.Password placeholder="Tối thiểu 6 ký tự" />
                    </Form.Item>

                    <Form.Item 
                        label="Xác nhận mật khẩu" 
                        name="confirm" 
                        dependencies={['password']} 
                        rules={[
                            { required: true, message: 'Vui lòng xác nhận lại mật khẩu!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Mật khẩu không khớp!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Nhập lại mật khẩu" />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" block style={{ background: '#fb6f92', borderColor: '#fb6f92' }}>
                        Đăng ký
                    </Button>
                </Form>
            </Card>
        </div>
    );
};