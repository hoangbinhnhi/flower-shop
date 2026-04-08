import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Input, Button, message, Checkbox } from 'antd'; 
import { updateUser } from '../redux/userSlide'; 

const OrderConfirmationPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [updateProfile, setUpdateProfile] = useState(true);

    useEffect(() => {
        setName(user?.name || '');
        setPhone(user?.phone || '');
        setAddress(user?.address || '');
        setEmail(user?.email || '');
    }, [user]);

    const handleConfirmOrder = () => {
        // Cập nhật thông tin vào Redux để trang cá nhân nhận được
        if (updateProfile) {
            dispatch(updateUser({ 
                ...user, // Giữ lại ID và token cũ
                name, 
                phone, 
                address, 
                email 
            }));
        }

        message.success('Đặt hàng thành công! Thông tin đã được cập nhật vào hồ sơ 🌸');
        navigate('/profile-user'); // Chuyển về trang cá nhân để kiểm tra thành quả
    };

    return (
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '40px 20px', marginTop: '80px', border: '2px solid #ffb6c1', borderRadius: '15px' }}>
            <h1 style={{ color: '#fb6f92', textAlign: 'center' }}>🛒 XÁC NHẬN ĐẶT HÀNG</h1>
            <div style={{ padding: '20px', backgroundColor: '#fff0f3', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label>Họ và tên:</label>
                    <Input size="large" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>Số điện thoại:</label>
                    <Input size="large" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div>
                    <label>Địa chỉ giao hàng:</label>
                    <Input.TextArea rows={3} value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div>
                    <label>Email liên hệ:</label>
                    <Input size="large" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
            </div>
            <Checkbox checked={updateProfile} onChange={(e) => setUpdateProfile(e.target.checked)} style={{ marginTop: '20px' }}>
                Cập nhật thông tin này vào trang cá nhân
            </Checkbox>
            <Button type="primary" size="large" block onClick={handleConfirmOrder} style={{ background: '#fb6f92', marginTop: '20px' }}>
                🌸 XÁC NHẬN ĐƠN HÀNG
            </Button>
        </div>
    );
};

export default OrderConfirmationPage;