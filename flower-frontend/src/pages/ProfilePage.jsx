import React from 'react';
import { useSelector } from 'react-redux'; 

const ProfilePage = () => {
    // Lôi thông tin ông khách đang đăng nhập từ trong kho Redux ra
    const user = useSelector((state) => state.user);

    return (
        <div style={{ padding: '50px', textAlign: 'center', marginTop: '100px' }}>
            <h1 style={{ color: '#ff69b4' }}>👤 THÔNG TIN CÁ NHÂN 👤</h1>
            
            {/* Chỗ này sẽ tự động thay đổi theo tên của người đăng nhập */}
            <h3>Tên người dùng: <span style={{ color: '#fb6f92' }}>{user?.name || "Khách ẩn danh"}</span></h3>
            <p>Email: <b>{user?.email || "Chưa cập nhật"}</b></p>
            <p>Số điện thoại: <b>{user?.phone || "Chưa cập nhật"}</b></p>
          
            
            <img src="https://i.pinimg.com/originals/e4/26/70/e426702edf874b181aced1e2fa5c6cde.gif" alt="cute" width="150" />
        </div>
    );
};

export default ProfilePage;