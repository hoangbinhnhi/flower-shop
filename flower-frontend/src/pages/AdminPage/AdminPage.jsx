import React, { useState, useEffect } from 'react';
import { Button, Table, Space, Modal, Form, Input, InputNumber, message, Tabs, Tag, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, MailOutlined, BgColorsOutlined, ShopOutlined, ReloadOutlined, CheckCircleOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import * as FlowerService from '../../services/FlowerService';
import * as OrderService from '../../services/OrderService'; 

export const AdminPage = () => {
    // === 1. CÁC STATE CŨ CỦA BÀ ===
    const [flowers, setFlowers] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [customOrders, setCustomOrders] = useState([]);
    const [orders, setOrders] = useState([]); 
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingFlower, setEditingFlower] = useState(null); 
    const [form] = Form.useForm();

    // === 2. STATE MỚI ĐỂ HIỂN THỊ POPUP CHI TIẾT HOA ===
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [flowerDetail, setFlowerDetail] = useState(null);

    const handleViewDetail = (flower) => {
        setFlowerDetail(flower); // Lưu thông tin hoa được click
        setIsDetailModalOpen(true); // Mở popup lên
    };

    // === CÁC HÀM XỬ LÝ ===
    const loadAllData = async () => {
        try {
            const resFlower = await FlowerService.getAllFlower();
            if (resFlower?.status === 'OK') setFlowers(resFlower.data);
        } catch (e) { 
            message.error("Lỗi kết nối Server khi tải danh sách hoa!"); 
        }

        try {
            const resOrder = await OrderService.getAllOrder(); 
            if (resOrder?.status === 'OK') {
                setOrders(resOrder.data); 
            } else if (Array.isArray(resOrder)) {
                setOrders(resOrder);
            }
        } catch (e) {
            console.log("Chưa tải được đơn hàng:", e);
        }

        const localContacts = JSON.parse(localStorage.getItem('admin_contacts') || '[]');
        setContacts(localContacts);

        const localOrders = JSON.parse(localStorage.getItem('admin_orders') || '[]');
        setCustomOrders(localOrders);
    };

    useEffect(() => { loadAllData(); }, []);

    const handleDeleteFlower = async (id) => {
        try {
            const res = await FlowerService.deleteFlower(id);
            if (res?.status === 'OK') {
                message.success('Xóa hoa thành công! 🗑️');
                loadAllData();
            } else { 
                message.error(res?.message || 'Không thể xóa hoa'); 
            }
        } catch (e) { 
            message.error("Lỗi hệ thống khi xóa: " + e.message); 
        }
    };

    const handleOpenEdit = (record) => {
        setEditingFlower(record); 
        form.setFieldsValue(record); 
        setIsModalOpen(true);
    };

    const onFinishFlower = async (values) => {
        try {
            let res = editingFlower ? await FlowerService.updateFlower(editingFlower._id, values) : await FlowerService.createFlower(values);
            if (res?.status === 'OK') {
                message.success(editingFlower ? 'Cập nhật thành công! ✨' : 'Thêm mới thành công! 🌸');
                setIsModalOpen(false); 
                setEditingFlower(null); 
                form.resetFields(); 
                loadAllData();
            } else { 
                message.error(res?.message || "Có lỗi xảy ra!"); 
            }
        } catch (e) { 
            message.error("Lỗi từ Server: " + (e.response?.data?.message || e.message)); 
        }
    };

    const handleApproveContact = (id) => {
        const updated = contacts.map(item => item._id === id ? { ...item, status: 'Đã duyệt' } : item);
        setContacts(updated); 
        localStorage.setItem('admin_contacts', JSON.stringify(updated)); 
        message.success('Đã duyệt tin nhắn!');
    };

    const handleApproveOrder = (id) => {
        const updated = customOrders.map(item => item._id === id ? { ...item, status: 'Đã duyệt' } : item);
        setCustomOrders(updated); 
        localStorage.setItem('admin_orders', JSON.stringify(updated)); 
        message.success('Đã duyệt đơn thiết kế!');
    };

    const handleConfirmDelivery = async (id) => {
        try {
            const res = await OrderService.updateOrder(id, { isDelivered: true });
            if (res?.status === 'OK' || res) {
                const updated = orders.map(item => item._id === id ? { ...item, isDelivered: true } : item);
                setOrders(updated);
                message.success('Đã xác nhận giao hàng thành công! 🚚');
            }
        } catch (error) {
            message.error('Có lỗi xảy ra khi cập nhật đơn hàng. Bà kiểm tra lại Backend nhé!');
            console.log(error);
        }
    };

    // === ĐỊNH NGHĨA CỘT KHO HOA (Đã thêm cột ảnh click được) ===
    const flowerColumns = [
        {
            title: 'Hình ảnh',
            dataIndex: 'image',
            render: (imageLink, record) => (
                <img 
                    src={imageLink || "https://via.placeholder.com/50"} 
                    alt="hoa" 
                    style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px', cursor: 'pointer', border: '1px solid #ddd' }} 
                    onClick={() => handleViewDetail(record)} // BẤM VÀO ĐÂY LÀ HIỆN POPUP
                    title="Click để xem chi tiết"
                />
            )
        },
        { title: 'Tên Hoa', dataIndex: 'name' },
        { title: 'Giá', dataIndex: 'price', render: (v) => v?.toLocaleString() + 'đ' },
        { title: 'Kho', dataIndex: 'countInStock' },
        { title: 'Hành động', render: (_, record) => (
                <Space>
                    <Button icon={<EditOutlined />} type="primary" onClick={() => handleOpenEdit(record)}>Sửa</Button>
                    <Popconfirm title="Xóa hoa này?" onConfirm={() => handleDeleteFlower(record._id)} okText="Xóa luôn" cancelText="Thôi">
                        <Button icon={<DeleteOutlined />} danger>Xóa</Button>
                    </Popconfirm>
                </Space>
            ) 
        },
    ];

    const contactColumns = [
        { title: 'Khách hàng', dataIndex: 'name' },
        { title: 'Nội dung', dataIndex: 'message' },
        { title: 'Trạng thái', dataIndex: 'status', render: (status, record) => (
                <Space>
                    <Tag color={status === 'Đã duyệt' ? 'green' : 'volcano'}>{status || 'Chưa duyệt'}</Tag>
                    {status !== 'Đã duyệt' && <Button size="small" type="primary" ghost onClick={() => handleApproveContact(record._id)}>Duyệt</Button>}
                </Space>
            ) 
        },
    ];

    const customOrderColumns = [
        { title: 'Người đặt', dataIndex: 'customerName' },
        { title: 'Dịp tặng', dataIndex: 'occasion' },
        { title: 'Ngân sách', dataIndex: 'budget', render: (v) => v?.toLocaleString() + 'đ' },
        { title: 'Trạng thái', dataIndex: 'status', render: (status, record) => (
                <Space>
                    <Tag color={status === 'Đã duyệt' ? 'green' : 'volcano'}>{status || 'Chưa duyệt'}</Tag>
                    {status !== 'Đã duyệt' && <Button size="small" icon={<CheckCircleOutlined />} type="primary" onClick={() => handleApproveOrder(record._id)}>Duyệt</Button>}
                </Space>
            ) 
        },
    ];

    const orderColumns = [
        { 
            title: 'Mã đơn', 
            dataIndex: '_id', 
            key: '_id', 
            render: (text) => <b>#{text ? text.slice(-5) : '00000'}</b> 
        },
        { 
            title: 'Khách hàng', 
            dataIndex: 'shippingAddress', 
            key: 'fullName',
            render: (shipping) => <b>{shipping?.fullName || 'Khách vãng lai'}</b>
        },
        { 
            title: 'Số điện thoại', 
            dataIndex: 'shippingAddress', 
            key: 'phone',
            render: (shipping) => <span style={{ color: 'gray' }}>0{shipping?.phone}</span>
        },
        { 
            title: 'Sản phẩm mua', 
            dataIndex: 'orderItems', 
            key: 'items',
            render: (items) => items?.map((item, i) => (
                <div key={i}>- {item.amount}x {item.name}</div>
            ))
        },
        { 
            title: 'Tổng tiền', 
            dataIndex: 'totalPrice', 
            key: 'totalPrice', 
            render: (v) => <span style={{ color: 'red', fontWeight: 'bold' }}>{v?.toLocaleString() || 0}đ</span> 
        },
        { 
            title: 'Trạng thái', 
            dataIndex: 'isDelivered', 
            key: 'isDelivered',
            render: (isDelivered) => (
                <Tag color={isDelivered ? 'green' : 'orange'}>
                    {isDelivered ? 'ĐÃ GIAO HÀNG' : 'CHỜ XÁC NHẬN'}
                </Tag>
            )
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Button 
                    type="primary" 
                    size="small" 
                    icon={<CheckCircleOutlined />}
                    disabled={record.isDelivered}
                    onClick={() => handleConfirmDelivery(record._id)}
                    style={{ backgroundColor: record.isDelivered ? '' : '#52c41a' }}
                >
                    Xác nhận giao
                </Button>
            )
        }
    ];

    return (
        <div style={{ padding: '30px', background: '#fff', minHeight: '100vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 style={{ color: '#fb6f92' }}>🛠 QUẢN TRỊ VIÊN FLOWERSHOP</h1>
                <Button icon={<ReloadOutlined />} onClick={loadAllData} type="default">Làm mới</Button>
            </div>
            
            <Tabs defaultActiveKey="1" items={[
                {
                    key: '1',
                    label: <span><ShopOutlined />Kho Hoa</span>,
                    children: (
                        <>
                            <div style={{ textAlign: 'right', marginBottom: 10 }}>
                                <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingFlower(null); form.resetFields(); setIsModalOpen(true); }}>Thêm Hoa</Button>
                            </div>
                            <Table columns={flowerColumns} dataSource={flowers} rowKey="_id" />
                        </>
                    ),
                },
                {
                    key: '2',
                    label: <span><MailOutlined />Liên Hệ ({contacts.filter(c => c.status !== 'Đã duyệt').length})</span>,
                    children: <Table columns={contactColumns} dataSource={contacts} rowKey="_id" />,
                },
                {
                    key: '3',
                    label: <span><BgColorsOutlined />Đơn Thiết Kế ({customOrders.filter(o => o.status !== 'Đã duyệt').length})</span>,
                    children: <Table columns={customOrderColumns} dataSource={customOrders} rowKey="_id" />,
                },
                {
                    key: '4',
                    label: <span><ShoppingCartOutlined />Đơn Hàng ({orders ? orders.filter(o => !o.isDelivered).length : 0})</span>,
                    children: <Table columns={orderColumns} dataSource={orders} rowKey="_id" 
                        locale={{ emptyText: 'Chưa có đơn hàng nào!' }}
                    />,
                },
            ]} />

            {/* MODAL THÊM/SỬA HOA */}
            <Modal 
                title={editingFlower ? "Cập nhật thông tin hoa" : "Thêm hoa mới"} 
                open={isModalOpen} 
                onCancel={() => { setIsModalOpen(false); setEditingFlower(null); form.resetFields(); }} 
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={onFinishFlower}>
                    <Form.Item name="name" label="Tên hoa" rules={[{ required: true, message: 'Nhập tên hoa bà ơi!' }]}><Input /></Form.Item>
                    <Form.Item name="price" label="Giá" rules={[{ required: true, message: 'Giá bao nhiêu?' }]}><InputNumber style={{ width: '100%' }} /></Form.Item>
                    <Form.Item name="countInStock" label="Số lượng"><InputNumber style={{ width: '100%' }} /></Form.Item>
                    <Form.Item name="description" label="Mô tả"><Input.TextArea /></Form.Item>
                    <Form.Item name="image" label="Link ảnh"><Input /></Form.Item>
                    <Button type="primary" htmlType="submit" block>Xác nhận</Button>
                </Form>
            </Modal>

            {/* POPUP XEM CHI TIẾT HOA BÀ VỪA YÊU CẦU ĐÂY NÈ */}
            <Modal 
                title={<span style={{ color: '#fb6f92', fontSize: '20px' }}>Chi tiết hoa 🌸</span>}
                open={isDetailModalOpen} 
                onCancel={() => setIsDetailModalOpen(false)} 
                footer={[
                    <Button key="close" type="primary" onClick={() => setIsDetailModalOpen(false)} style={{ background: '#fb6f92', borderColor: '#fb6f92' }}>
                        Đóng lại
                    </Button>
                ]}
            >
                {flowerDetail && (
                    <div style={{ textAlign: 'center' }}>
                        <img 
                            src={flowerDetail.image || "https://via.placeholder.com/300"} 
                            alt={flowerDetail.name} 
                            style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '15px', marginBottom: '15px' }} 
                        />
                        <h2>{flowerDetail.name}</h2>
                        
                        <div style={{ textAlign: 'left', background: '#fff0f3', padding: '15px', borderRadius: '10px', marginTop: '15px' }}>
                            <p style={{ fontSize: '16px', margin: '5px 0' }}><strong>💰 Giá bán:</strong> <span style={{ color: 'red', fontWeight: 'bold' }}>{Number(flowerDetail.price).toLocaleString()} VNĐ</span></p>
                            <p style={{ fontSize: '16px', margin: '5px 0' }}><strong>📦 Trong kho:</strong> {flowerDetail.countInStock} bó</p>
                            <p style={{ fontSize: '16px', margin: '5px 0' }}><strong>📝 Mô tả:</strong> {flowerDetail.description || 'Chưa có thông tin mô tả chi tiết.'}</p>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};