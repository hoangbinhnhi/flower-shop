import React, { useState, useEffect } from 'react';
import { Button, Table, Space, Modal, Form, Input, InputNumber, message, Tabs, Tag, Popconfirm, Empty } from 'antd';
import { 
    PlusOutlined, EditOutlined, DeleteOutlined, ShopOutlined, 
    ReloadOutlined, ShoppingCartOutlined, InfoCircleOutlined,
    BgColorsOutlined, MessageOutlined 
} from '@ant-design/icons';
import * as FlowerService from '../../services/FlowerService';
import * as OrderService from '../../services/OrderService'; 

export const AdminPage = () => {
    const [flowers, setFlowers] = useState([]);
    const [orders, setOrders] = useState([]); 
    const [designOrders, setDesignOrders] = useState([]); // Kho thiết kế riêng
    const [contacts, setContacts] = useState([]);         // Kho liên hệ
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingFlower, setEditingFlower] = useState(null); 
    const [form] = Form.useForm();

    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [flowerDetail, setFlowerDetail] = useState(null);

    // --- HÀM TẢI DỮ LIỆU ---
    const loadAllData = async () => {
        try {
            const resFlower = await FlowerService.getAllFlower();
            if (resFlower?.status === 'OK') setFlowers(resFlower.data);
            
            const resOrder = await OrderService.getAllOrder(); 
            if (resOrder?.status === 'OK') setOrders(resOrder.data);

            // Lấy dữ liệu từ localStorage cho 2 bảng mới
            const localDesign = JSON.parse(localStorage.getItem('admin_orders') || '[]');
            setDesignOrders(localDesign);

            const localContacts = JSON.parse(localStorage.getItem('admin_contacts') || '[]');
            setContacts(localContacts);
        } catch (e) { 
            console.log("Lỗi tải dữ liệu:", e);
        }
    };

    useEffect(() => { loadAllData(); }, []);

    // --- LOGIC XỬ LÝ HOA (CỦA BÀ) ---
    const handleViewDetail = (flower) => {
        setFlowerDetail(flower);
        setIsDetailModalOpen(true);
    };

    const handleDeleteFlower = async (id) => {
        try {
            const res = await FlowerService.deleteFlower(id);
            if (res?.status === 'OK') {
                message.success('Đã xóa hoa khỏi kho! 🗑️');
                loadAllData();
            }
        } catch (e) { message.error("Lỗi xóa hoa"); }
    };

    const handleOpenEdit = (record) => {
        setEditingFlower(record); 
        form.setFieldsValue(record); 
        setIsModalOpen(true);
    };

    const onFinishFlower = async (values) => {
        try {
            const dataToSave = {
                ...values,
                rating: values.rating || 5,
                price: Number(values.price),
                countInStock: Number(values.countInStock || 0)
            };
            let res = editingFlower 
                ? await FlowerService.updateFlower(editingFlower._id, dataToSave)
                : await FlowerService.createFlower(dataToSave);
            
            if (res?.status === 'OK') {
                message.success('Thành công! ✨');
                setIsModalOpen(false);
                loadAllData();
            }
        } catch (e) { message.error("Lỗi server!"); }
    };

    // --- LOGIC XÓA CHO 2 BẢNG MỚI ---
    const deleteDesign = (id) => {
        const newData = designOrders.filter(i => i._id !== id);
        localStorage.setItem('admin_orders', JSON.stringify(newData));
        setDesignOrders(newData);
        message.success('Đã xóa yêu cầu thiết kế');
    };

    const deleteContact = (id) => {
        const newData = contacts.filter(i => i._id !== id);
        localStorage.setItem('admin_contacts', JSON.stringify(newData));
        setContacts(newData);
        message.success('Đã xóa liên hệ');
    };

    // --- ĐỊNH NGHĨA CỘT KHO HOA (KHÔI PHỤC LẠI CHO BÀ) ---
    const flowerColumns = [
        {
            title: 'Hình ảnh',
            dataIndex: 'image',
            render: (text, record) => (
                <img 
                    src={text || 'https://via.placeholder.com/50'} 
                    alt="flower" 
                    style={{ width: '50px', height: '50px', borderRadius: '8px', cursor: 'pointer', border: '1px solid #fb6f92', objectFit: 'cover' }} 
                    onClick={() => handleViewDetail(record)}
                />
            )
        },
        { title: 'Tên Hoa', dataIndex: 'name', render: (t) => <b>{t}</b> },
        { title: 'Loại', dataIndex: 'type', render: (t) => <Tag color="magenta">{t || 'Hoa tươi'}</Tag> },
        { title: 'Giá', dataIndex: 'price', render: (v) => <span style={{color: 'red'}}>{v?.toLocaleString()}đ</span> },
        { title: 'Kho', dataIndex: 'countInStock' },
        {
            title: 'Hành động',
            render: (_, record) => (
                <Space>
                    <Button icon={<EditOutlined />} onClick={() => handleOpenEdit(record)} type="primary" ghost>Sửa</Button>
                    <Popconfirm title="Xóa hoa này?" onConfirm={() => handleDeleteFlower(record._id)}>
                        <Button icon={<DeleteOutlined />} danger ghost>Xóa</Button>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    const designColumns = [
        { title: 'Khách Hàng', dataIndex: 'customerName', render: t => <b>{t}</b> },
        { title: 'Dịp Tặng', dataIndex: 'occasion' },
        { title: 'Ngân Sách', dataIndex: 'budget', render: v => <span style={{color: 'green'}}>{v?.toLocaleString()}đ</span> },
        { title: 'Ngày Nhận', dataIndex: 'deliveryDate' },
        { title: 'Mô Tả', dataIndex: 'description', ellipsis: true },
        { title: 'Xóa', render: (_, r) => <Button type="link" danger onClick={() => deleteDesign(r._id)}>Xóa</Button> }
    ];

    const contactColumns = [
        { title: 'Thời Gian', dataIndex: 'createdAt' },
        { title: 'Họ Tên', dataIndex: 'name', render: t => <b>{t}</b> },
        { title: 'SĐT/Email', dataIndex: 'email' },
        { title: 'Nội Dung', dataIndex: 'message' },
        { title: 'Xóa', render: (_, r) => <Button type="link" danger onClick={() => deleteContact(r._id)}>Xóa</Button> }
    ];

    return (
        <div style={{ padding: '30px', background: '#fff9fa', minHeight: '100vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h1 style={{ color: '#fb6f92' }}>🌸 QUẢN TRỊ FLOWERSHOP</h1>
                <Button icon={<ReloadOutlined />} onClick={loadAllData}>Làm mới dữ liệu</Button>
            </div>

            <Tabs defaultActiveKey="1" items={[
                {
                    key: '1',
                    label: <span><ShopOutlined /> Kho Hoa</span>,
                    children: (
                        <>
                            <div style={{ textAlign: 'right', marginBottom: '15px' }}>
                                <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingFlower(null); form.resetFields(); setIsModalOpen(true); }} style={{ background: '#fb6f92', borderColor: '#fb6f92' }}>Thêm Hoa Mới</Button>
                            </div>
                            <Table columns={flowerColumns} dataSource={flowers} rowKey="_id" />
                        </>
                    )
                },
                {
                    key: '2',
                    label: <span><ShoppingCartOutlined /> Đơn Hàng</span>,
                    children: <Table columns={[{title: 'Mã đơn', dataIndex: '_id'}, {title: 'Tổng tiền', dataIndex: 'totalPrice', render: v => v?.toLocaleString() + 'đ'}]} dataSource={orders} rowKey="_id" />
                },
                {
                    key: '3',
                    label: <span><BgColorsOutlined /> Thiết Kế Riêng</span>,
                    children: <Table columns={designColumns} dataSource={designOrders} rowKey="_id" />
                },
                {
                    key: '4',
                    label: <span><MessageOutlined /> Liên Hệ</span>,
                    children: <Table columns={contactColumns} dataSource={contacts} rowKey="_id" />
                }
            ]} />

            {/* MODAL THÊM/SỬA HOA */}
            <Modal title={editingFlower ? "Chỉnh sửa hoa" : "Thêm hoa mới"} open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null} destroyOnClose>
                <Form form={form} layout="vertical" onFinish={onFinishFlower}>
                    <Form.Item name="name" label="Tên hoa" rules={[{ required: true }]}><Input /></Form.Item>
                    <Form.Item name="type" label="Loại hoa"><Input /></Form.Item>
                    <Form.Item name="price" label="Giá bán"><InputNumber style={{ width: '100%' }} /></Form.Item>
                    <Form.Item name="countInStock" label="Tồn kho"><InputNumber style={{ width: '100%' }} /></Form.Item>
                    <Form.Item name="image" label="Link hình ảnh"><Input /></Form.Item>
                    <Form.Item name="description" label="Mô tả"><Input.TextArea rows={3} /></Form.Item>
                    <Button type="primary" htmlType="submit" block style={{ background: '#fb6f92', borderColor: '#fb6f92' }}>Lưu thông tin</Button>
                </Form>
            </Modal>

            {/* MODAL CHI TIẾT HOA */}
            <Modal title="Chi tiết loài hoa" open={isDetailModalOpen} onCancel={() => setIsDetailModalOpen(false)} footer={null}>
                {flowerDetail && (
                    <div style={{ textAlign: 'center' }}>
                        <img src={flowerDetail.image} alt="detail" style={{ width: '100%', borderRadius: '15px' }} />
                        <h2 style={{ color: '#fb6f92', marginTop: '15px' }}>{flowerDetail.name}</h2>
                        <p><b>Giá:</b> {flowerDetail.price?.toLocaleString()}đ</p>
                        <p><b>Mô tả:</b> {flowerDetail.description}</p>
                    </div>
                )}
            </Modal>
        </div>
    );
};