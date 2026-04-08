import React, { useState } from 'react'; 
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; 
import { updateUser } from '../../redux/userSlide'; 
import * as UserService from '../../services/FlowerService';

export const SignInPage = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch(); 

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const res = await UserService.loginUser(values); 
            
            if (res?.status === 'OK') {
                localStorage.clear(); 
                localStorage.setItem('access_token', JSON.stringify(res?.access_token));

                dispatch(updateUser({ 
                    ...res?.data, 
                    access_token: res?.access_token 
                }));

             
                if (res?.data?.isAdmin) {
                    message.success('Chào mừng Admin quản lý hệ thống! 👑');
                    navigate('/system/admin'); 
                } else {
                    message.success('Đăng nhập thành công! Shopping thôi! 🌸');
                    navigate('/'); 
                }
            } else {
                message.error(res?.message || 'Email hoặc mật khẩu sai rồi má ơi!');
            }
        } catch (e) {
            message.error("Lỗi rồi: " + (e.response?.data?.message || e.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#fff5f7' }}>
            <div style={{ width: '400px', padding: '40px', background: '#fff', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <h2 style={{ textAlign: 'center', color: '#fb6f92', marginBottom: '30px' }}>🌸 ĐĂNG NHẬP 🌸</h2>
                
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item 
                        name="email" 
                        label="Email" 
                        rules={[{ required: true, message: 'Nhập email giùm cái!' }, { type: 'email', message: 'Email gì lạ vậy?' }]}
                    >
                        <Input placeholder="example@gmail.com" style={{ height: '40px' }} />
                    </Form.Item>

                    <Form.Item 
                        name="password" 
                        label="Mật khẩu" 
                        rules={[{ required: true, message: 'Chưa nhập mật khẩu kìa!' }]}
                    >
                        <Input.Password placeholder="******" style={{ height: '40px' }} />
                    </Form.Item>

                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        block 
                        loading={loading}
                        style={{ background: '#fb6f92', borderColor: '#fb6f92', height: '45px', fontSize: '16px', marginTop: '20px' }}
                    >
                        VÀO SHOP NGAY
                    </Button>
                </Form>
                
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    Chưa có tài khoản? <span style={{ color: '#fb6f92', cursor: 'pointer' }} onClick={() => navigate('/sign-up')}>Đăng ký ngay</span>
                </div>
            </div>
        </div>
    );
};