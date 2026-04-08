import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Spin, Button, message, Empty } from 'antd'; 
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/userSlide';
import * as FlowerService from '../../services/FlowerService';

export const Homepage = () => {
    const [flowers, setFlowers] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    const searchProduct = useSelector((state) => state.product?.search);

    useEffect(() => {
        const fetchFlowers = async () => {
            try {
                const res = await FlowerService.getAllFlower();
                if (res?.status === 'OK') {
                    setFlowers(res?.data);
                }
            } catch (e) {
                message.error("Lỗi lấy dữ liệu hoa!");
            } finally {
                setLoading(false);
            }
        };
        if (user?.id) {
            fetchFlowers();
        } else {
            setLoading(false);
        }
    }, [user?.id]); 

    const handleDetails = (id) => { navigate(`/flower-details/${id}`); }; 

    const handleAddToCart = (item, e) => {
        e.stopPropagation();
        dispatch(addToCart(item));
        message.success(`Đã thêm ${item.name} vào giỏ hàng!`);
    };

    const filteredFlowers = flowers?.filter((item) => {
        if (!searchProduct) return item;
        return item?.name?.toLowerCase()?.includes(searchProduct?.toLowerCase());
    });

    return (
        <div style={{ padding: '20px 50px', background: '#fff5f7', minHeight: '100vh' }}>
            
            {/* TRẠNG THÁI 1: CHƯA ĐĂNG NHẬP -> CHỈ HIỆN LỜI CHÀO MỜI */}
            {!user?.id ? (
                <div style={{ textAlign: 'center', marginTop: '50px', padding: '50px', background: '#fff', borderRadius: '20px', boxShadow: '0 4px 15px rgba(251, 111, 146, 0.2)' }}>
                    <HeartOutlined style={{ fontSize: '60px', color: '#fb6f92', marginBottom: '20px' }} />
                    <h1 style={{ color: '#fb6f92', fontSize: '32px', fontWeight: 'bold' }}>
                        CHÀO MỪNG BẠN ĐẾN VỚI SHOP HOA TỤI MÌNH 🌸
                    </h1>
                    <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px' }}>
                        Vui lòng đăng nhập để xem danh sách các loại hoa xinh đẹp và đặt hàng nhé!
                    </p>
                    <Button 
                        type="primary" 
                        size="large" 
                        onClick={() => navigate('/sign-in')}
                        style={{ background: '#fb6f92', borderColor: '#fb6f92', height: '50px', padding: '0 40px', borderRadius: '25px', fontSize: '18px' }}
                    >
                        ĐĂNG NHẬP NGAY
                    </Button>
                </div>
            ) : (
                /* TRẠNG THÁI 2: ĐÃ ĐĂNG NHẬP -> HIỆN 2 NÚT FORM + DANH SÁCH HOA */
                <>
                    <h1 style={{ textAlign: 'center', color: '#fb6f92', marginBottom: '20px' }}>
                        🌸 Danh Sách Hoa Tươi 🌸
                    </h1>

                    {/* DỜI 2 NÚT VÀO ĐÂY NÈ BÀ, ĐĂNG NHẬP XONG MỚI THẤY! */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '40px' }}>
                        <Button 
                            type="primary" 
                            size="large" 
                            style={{ background: '#ff8fab', borderColor: '#ff8fab', borderRadius: '10px', fontWeight: 'bold' }}
                            onClick={() => navigate('/contact')}
                        >
                            💌 Gửi Lời Nhắn / Liên Hệ
                        </Button>

                        <Button 
                            type="primary" 
                            size="large" 
                            style={{ background: '#fb6f92', borderColor: '#fb6f92', borderRadius: '10px', fontWeight: 'bold' }}
                            onClick={() => navigate('/checkout-form')}
                        >
                            🎨 Đặt Hoa Thiết Kế Riêng
                        </Button>
                    </div>
                    
                    {loading ? (
                        <div style={{ textAlign: 'center', marginTop: '50px' }}>
                            <Spin size="large" tip="Đang bưng hoa ra..." />
                        </div>
                    ) : (
                        <Row gutter={[24, 24]}>
                            {filteredFlowers?.length > 0 ? (
                                filteredFlowers.map((item) => (
                                    <Col span={6} key={item._id}>
                                        <Card
                                            hoverable
                                            onClick={() => handleDetails(item._id)}
                                            style={{ borderRadius: '15px', overflow: 'hidden' }}
                                            cover={<img alt="flower" src={item?.image || 'https://via.placeholder.com/250'} style={{ height: 250, objectFit: 'cover' }} />}
                                        >
                                            <Card.Meta 
                                                title={<span style={{ fontSize: '18px', color: '#333' }}>{item?.name || 'Hoa Vô Danh'}</span>} 
                                                description={
                                                    <div style={{ fontSize: '16px', color: '#ff4d4f', fontWeight: 'bold', margin: '10px 0' }}>
                                                        {item?.price ? item.price.toLocaleString() : '0'} VNĐ
                                                    </div>
                                                } 
                                            />
                                            <Button 
                                                type="primary" danger icon={<ShoppingCartOutlined />}
                                                style={{ width: '100%', marginTop: '15px', borderRadius: '8px', height: '40px', background: '#fb6f92', borderColor: '#fb6f92' }}
                                                onClick={(e) => handleAddToCart(item, e)}
                                            >
                                                Thêm vào giỏ
                                            </Button>
                                        </Card>
                                    </Col>
                                ))
                            ) : (
                                <div style={{ width: '100%', textAlign: 'center' }}>
                                    <Empty description="Không tìm thấy hoa nào phù hợp hết bà ơi! 🥀" />
                                </div>
                            )}
                        </Row>
                    )}
                </>
            )}
        </div>
    );
};