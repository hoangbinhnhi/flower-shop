import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { List, Button, Card, Typography, Empty, Space, message } from 'antd';
import { DeleteOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { increaseAmount, decreaseAmount, removeOrderProduct } from '../../redux/userSlide';

const { Title, Text } = Typography;

export const OrderPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user); 
    const cartItems = user?.cart || []; 

    const handleChangeCount = (productId, type) => {
        if (type === 'increase') {
            dispatch(increaseAmount(productId));
        } else {
            dispatch(decreaseAmount(productId));
        }
    };

    const handleDeleteItem = (productId) => {
        dispatch(removeOrderProduct(productId));
        message.success("Đã xóa sản phẩm khỏi giỏ hàng 🌸");
    };

    // 🛠 DIỆT NaN Ở ĐÂY: Tính tổng tiền
    const total = cartItems.reduce((sum, item) => {
        const p = Number(item.price) || 0;
        const a = Number(item.amount) || 0;
        return sum + (p * a);
    }, 0);

    return (
        <div style={{ padding: '30px', maxWidth: '900px', margin: '0 auto', marginTop: '70px', minHeight: '80vh' }}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>Giỏ hàng của bạn 🛒</Title>
            
            {cartItems.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <List
                        itemLayout="horizontal"
                        dataSource={cartItems}
                        renderItem={(item) => (
                            <Card key={item.product} style={{ marginBottom: '10px', borderRadius: '12px' }} bodyStyle={{ padding: '15px' }}>
                                <List.Item 
                                    actions={[
                                        <Text strong style={{ fontSize: '16px', color: '#fb6f92' }}>
                                            {(Number(item.price) * Number(item.amount) || 0).toLocaleString()} VNĐ
                                        </Text>,
                                        <Button 
                                            type="text" danger 
                                            icon={<DeleteOutlined style={{ fontSize: '18px' }} />} 
                                            onClick={() => handleDeleteItem(item.product)} 
                                        />
                                    ]}
                                >
                                    <List.Item.Meta
                                        avatar={<img src={item.image} alt="hoa" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />}
                                        title={<Text strong style={{ fontSize: '17px' }}>{item.name}</Text>}
                                        description={
                                            <Space direction="vertical" size={0}>
                                                <Text type="secondary">{(Number(item.price) || 0).toLocaleString()} VNĐ / bó</Text>
                                                <Space style={{ marginTop: '10px', background: '#f5f5f5', padding: '2px 8px', borderRadius: '5px' }}>
                                                    <Button type="text" size="small" icon={<MinusOutlined />} onClick={() => handleChangeCount(item.product, 'decrease')} disabled={item.amount <= 1} />
                                                    <Text strong style={{ width: '30px', textAlign: 'center', display: 'inline-block' }}>{item.amount}</Text>
                                                    <Button type="text" size="small" icon={<PlusOutlined />} onClick={() => handleChangeCount(item.product, 'increase')} />
                                                </Space>
                                            </Space>
                                        }
                                    />
                                </List.Item>
                            </Card>
                        )}
                    />

                    <Card style={{ marginTop: '10px', backgroundColor: '#fff0f3', borderRadius: '15px', border: '1px solid #ffccd5' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <Text style={{ fontSize: '16px' }}>Tổng thanh toán:</Text>
                                <Title level={3} style={{ margin: 0, color: '#fb6f92' }}>{total.toLocaleString()} VNĐ</Title>
                            </div>
                            <Button type="primary" size="large" onClick={() => navigate('/confirm-order')} style={{ background: '#fb6f92', borderColor: '#fb6f92', height: '50px', padding: '0 40px', fontWeight: 'bold', borderRadius: '10px' }}>
                                Tiến hành thanh toán 🌸
                            </Button>
                        </div>
                    </Card>
                </div>
            ) : (
                <Card style={{ textAlign: 'center', padding: '50px', borderRadius: '15px' }}>
                    <Empty description="Giỏ hàng trống trơn!" />
                    <Button type="primary" onClick={() => navigate('/')} style={{ marginTop: '20px', background: '#fb6f92', borderColor: '#fb6f92' }}>Quay lại mua hoa</Button>
                </Card>
            )}
        </div>
    );
};