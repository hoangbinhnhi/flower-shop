import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UserOutlined, ShoppingCartOutlined, SearchOutlined } from '@ant-design/icons';
import { Badge, Input, Popover } from 'antd';
import { resetUser } from '../../redux/userSlide';
import { searchProduct } from '../../redux/productSlide';
import { useNavigate } from 'react-router-dom';

export const HeaderComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const handleLogout = () => {
        dispatch(resetUser());
        localStorage.removeItem('access_token');
        navigate('/');
    };

    const onSearch = (e) => {
        dispatch(searchProduct(e.target.value));
    };

    // --- 🔐 ĐÃ LẮP LẠI Ổ KHÓA isAdmin Ở ĐÂY ---
    const content = (
        <div style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div onClick={() => navigate('/profile-user')}>Thông tin cá nhân</div>
            <div onClick={() => navigate('/my-order')}>Đơn hàng của tôi</div>
            
            {/* Chỉ hiện nếu user là Admin thật sự */}
            {user?.isAdmin && (
                <div onClick={() => navigate('/system/admin')} style={{ color: '#fb6f92', fontWeight: 'bold' }}>
                    ⚙️ Quản lý hệ thống
                </div>
            )}
            
            <div onClick={handleLogout} style={{ color: 'red' }}>Đăng xuất</div>
        </div>
    );

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 50px', background: '#fb6f92', color: '#fff' }}>
            <h2 style={{ cursor: 'pointer', color: '#fff', margin: 0 }} onClick={() => navigate('/')}>
                🌸 FLOWER SHOP
            </h2>

            <div style={{ width: '40%' }}>
                <Input 
                    placeholder="Tìm loại hoa bà thích..." 
                    suffix={<SearchOutlined />} 
                    style={{ borderRadius: '20px' }}
                    onChange={onSearch} 
                />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <UserOutlined style={{ fontSize: '22px' }} />
                    {user?.name ? (
                        <Popover content={content} trigger="hover">
                            <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{user.name}</span>
                        </Popover>
                    ) : (
                        <span onClick={() => navigate('/sign-in')}>Đăng nhập / Đăng ký</span>
                    )}
                </div>

                <div style={{ cursor: 'pointer' }} onClick={() => navigate('/order')}>
                    <Badge count={user?.cart?.length || 0} size="small">
                        <ShoppingCartOutlined style={{ fontSize: '25px', color: '#fff' }} />
                    </Badge>
                    <span style={{ marginLeft: '5px' }}>Giỏ hàng</span>
                </div>
            </div>
        </div>
    );
};