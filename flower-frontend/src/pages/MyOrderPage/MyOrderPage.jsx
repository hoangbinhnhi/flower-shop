import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, Tag, Button, Modal, message, Typography } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { confirm } = Modal;

const MyOrderPage = () => {
    const user = useSelector((state) => state.user);
    
    
    const [orders, setOrders] = useState([
        {
            key: '1',
            orderId: 'DH12345',
            items: 'Bó Hoa Hồng Valentine, Giỏ Hoa Khai Trương',
            totalPrice: 1700000,
            status: 'pending', // Chờ xác nhận
            createdAt: '2026-03-27'
        },
        {
            key: '2',
            orderId: 'DH67890',
            items: 'Hoa Hướng Dương Nắng Mai',
            totalPrice: 450000,
            status: 'delivered', // Đã giao
            createdAt: '2026-03-25'
        }
    ]);

    // 2. Hàm xử lý Hủy đơn hàng
    const handleCancelOrder = (orderId) => {
        confirm({
            title: 'Bà có chắc muốn hủy đơn này không?',
            icon: <ExclamationCircleOutlined />,
            content: `Đơn hàng ${orderId} sẽ bị hủy và không thể khôi phục.`,
            okText: 'Xác nhận hủy',
            okType: 'danger',
            cancelText: 'Suy nghĩ lại',
            onOk() {
                // TODO: Gọi API Backend (VD: OrderService.cancelOrder)
                // Demo: Xóa đơn hàng khỏi danh sách hiện tại
                const newOrders = orders.filter(item => item.orderId !== orderId);
                setOrders(newOrders);
                message.success('Đã hủy đơn hàng thành công! 🌸');
            },
        });
    };

    // 3. Cấu hình các cột cho cái Bảng
    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'orderId',
            key: 'orderId',
            render: (text) => <strong style={{color: '#fb6f92'}}>{text}</strong>
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'items',
            key: 'items',
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (price) => `${price.toLocaleString()} VNĐ`
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                let color = status === 'pending' ? 'orange' : 'green';
                let text = status === 'pending' ? 'Đang chờ' : 'Đã giao';
                if (status === 'cancelled') { color = 'red'; text = 'Đã hủy'; }
                return <Tag color={color}>{text.toUpperCase()}</Tag>;
            }
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Button 
                    danger 
                    disabled={record.status !== 'pending'} // Chỉ cho hủy khi đơn đang chờ
                    onClick={() => handleCancelOrder(record.orderId)}
                >
                    Hủy đơn
                </Button>
            ),
        },
    ];

    return (
        <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto', marginTop: '60px' }}>
            <Title level={2} style={{ color: '#fb6f92', textAlign: 'center', marginBottom: '30px' }}>
                📦 ĐƠN HÀNG CỦA TÔI
            </Title>
            
            <Table 
                columns={columns} 
                dataSource={orders} 
                pagination={false}
                locale={{ emptyText: 'Bà chưa mua bông hoa nào hết trơn!' }}
            />
            
            <p style={{ marginTop: '20px', color: '#888', fontStyle: 'italic' }}>
                * Lưu ý: Chỉ có thể hủy các đơn hàng ở trạng thái "Đang chờ".
            </p>
        </div>
    );
};

export default MyOrderPage;