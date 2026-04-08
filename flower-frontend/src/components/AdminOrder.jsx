import React, { useEffect, useState } from 'react';
import { Table, Typography, Tag, message } from 'antd';
import * as OrderService from '../../services/OrderService';

const { Title } = Typography;

const AdminOrder = () => {
    // State chứa danh sách đơn hàng lấy từ Backend về
    const [orders, setOrders] = useState([]);

    // Tự động gọi API lấy đơn hàng khi vừa mở trang Admin
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await OrderService.getAllOrder();
                if (res?.status === 'OK') {
                    setOrders(res.data); // Nhét data vào state để Table nó vẽ ra
                } else {
                    message.error("Không tải được danh sách đơn hàng!");
                }
            } catch (error) {
                console.error("Lỗi khi lấy đơn hàng:", error);
                message.error("Lỗi kết nối đến máy chủ!");
            }
        };
        fetchOrders();
    }, []);

    // Khai báo các cột cho bảng hiển thị
    const columns = [
        {
            title: 'Tên Khách Hàng',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Số Điện Thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Địa Chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tổng Tiền',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            // Render định dạng tiền tệ cho đẹp
            render: (price) => <strong>{Number(price)?.toLocaleString()} VNĐ</strong>
        },
        {
            title: 'Thanh Toán',
            dataIndex: 'isPaid',
            key: 'isPaid',
            // Dùng Tag của Ant Design để hiện màu xanh/đỏ
            render: (isPaid) => (
                isPaid ? <Tag color="green">Đã thanh toán</Tag> : <Tag color="red">Chưa thanh toán</Tag>
            )
        },
        {
            title: 'Giao Hàng',
            dataIndex: 'isDelivered',
            key: 'isDelivered',
            // Dùng Tag để hiện trạng thái giao hàng
            render: (isDelivered) => (
                isDelivered ? <Tag color="green">Đã giao</Tag> : <Tag color="orange">Đang xử lý</Tag>
            )
        }
    ];

    return (
        <div>
            <Title level={3} style={{ marginBottom: '20px' }}>Quản Lý Đơn Hàng 📦</Title>
            
            <Table 
                columns={columns} 
                dataSource={orders} 
                rowKey="_id" // Cực kỳ quan trọng: Báo cho React biết lấy ID làm key để khỏi báo lỗi đỏ
                pagination={{ pageSize: 8 }} // Mỗi trang hiện 8 đơn hàng cho đỡ rối mắt
            />
        </div>
    );
};

export default AdminOrder;