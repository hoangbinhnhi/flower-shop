import React, { useState } from 'react'; 
import { Button, Form, Input, message, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; 
import { updateUser } from '../../redux/userSlide'; 
import * as UserService from '../../services/FlowerService';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

export const AdminLoginPage = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch(); 

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const res = await UserService.loginUser(values); 
            
            if (res?.status === 'OK') {
                // Chỉ cho phép vào nếu là Admin thật sự
                if (res?.data?.isAdmin) {
                    localStorage.clear(); 
                    localStorage.setItem('access_token', JSON.stringify(res?.access_token));

                    dispatch(updateUser({ 
                        ...res?.data, 
                        access_token: res?.access_token 
                    }));

                    message.success('Đăng nhập Hệ thống Quản trị thành công! 👑');
                    navigate('/system/admin'); 
                } else {
                    message.error('Lỗi: Bạn không có quyền truy cập vào trang Admin! ❌');
                }
            } else {
                message.error(res?.message || 'Email hoặc mật khẩu sai rồi sếp ơi!');
            }
        } catch (e) {
            message.error("Lỗi hệ thống: " + e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#2c3e50' }}>
            <Card style={{ width: '400px', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <h2 style={{ color: '#2c3e50', margin: 0 }}>⚙️ ADMIN LOGIN</h2>
                    <p style={{ color: '#95a5a6' }}>Hệ thống Quản lý Flower Shop</p>
                </div>
                
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item 
                        name="email" 
                        rules={[{ required: true, message: 'Vui lòng nhập Email Admin!' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Admin Email" size="large" />
                    </Form.Item>

                    <Form.Item 
                        name="password" 
                        rules={[{ required: true, message: 'Vui lòng nhập Mật khẩu!' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
                    </Form.Item>

                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        block 
                        loading={loading}
                        style={{ background: '#2c3e50', borderColor: '#2c3e50', height: '45px', fontSize: '16px', fontWeight: 'bold' }}
                    >
                        ĐĂNG NHẬP HỆ THỐNG
                    </Button>
                </Form>
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <a onClick={() => navigate('/')} style={{ color: '#2c3e50' }}>Quay lại Trang chủ</a>
                </div>
            </Card>
        </div>
    );
};