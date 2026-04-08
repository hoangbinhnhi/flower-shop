import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Image, Typography, Button, InputNumber, Space, message, Card, Divider } from 'antd';
import { ShoppingCartOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import * as FlowerService from '../../services/FlowerService';
import { addToCart } from '../../redux/userSlide'; 

const { Title, Text } = Typography;

export const FlowerDetailsPage = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const [flower, setFlower] = useState(null);
    const [num, setNum] = useState(1); 

    useEffect(() => {
        const fetchDetailFlower = async () => {
            try {
                const res = await FlowerService.getDetailsFlower(id);
                if (res?.status === 'OK') {
                    setFlower(res.data);
                }
            } catch (e) {
                message.error("Không lấy được thông tin hoa!");
            }
        };
        if (id) fetchDetailFlower();
    }, [id]);

    const handleAddCart = () => {
        // 🕵️‍♀️ BẮT MA: Nếu Console hiện "undefined" thì Backend bà đang trả về sai tên biến ID
        console.log("ID hoa lấy từ Database:", flower?._id);

        if(flower) {
            dispatch(addToCart({
                name: flower?.name,
                price: Number(flower?.price), // Ép kiểu số để không bị NaN
                image: flower?.image,
                product: flower?._id, // QUAN TRỌNG: Phải là _id
                amount: Number(num)
            }));
            message.success("Đã thêm vào giỏ hàng! 🌸");
        }
    };

    if (!flower) return <div style={{ padding: '100px', textAlign: 'center' }}>Đang tải hoa...</div>;

    return (
        <div style={{ padding: '100px 50px', background: '#fffafb', minHeight: '100vh' }}>
            <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/')} style={{ marginBottom: '20px' }}>
                Quay lại
            </Button>

            <Row gutter={[40, 40]} justify="center">
                <Col span={10}>
                    <Card hoverable cover={<Image alt={flower?.name} src={flower?.image} style={{ borderRadius: '15px' }} />}>
                    </Card>
                </Col>

                <Col span={10}>
                    <Title level={2}>{flower?.name}</Title>
                    <Text type="secondary">Loại: {flower?.type || 'Hoa tươi thiết kế'}</Text>
                    <Divider />
                    
                    <Title level={3} style={{ color: '#fb6f92' }}>
                        {flower?.price?.toLocaleString()} VNĐ
                    </Title>
                    
                    <div style={{ margin: '30px 0' }}>
                        <Text strong>Số lượng: </Text>
                        <InputNumber 
                            min={1} 
                            max={flower?.countInStock || 100} 
                            value={num} 
                            onChange={(value) => setNum(value)} 
                            size="large"
                            style={{ marginLeft: '15px', borderRadius: '5px' }}
                        />
                        <Text type="secondary" style={{ marginLeft: '10px' }}>
                            (Còn lại {flower?.countInStock || 0} bó)
                        </Text>
                    </div>

                    <Space size="middle">
                        <Button 
                            type="primary" 
                            size="large" 
                            icon={<ShoppingCartOutlined />} 
                            onClick={handleAddCart}
                            style={{ background: '#fb6f92', borderColor: '#fb6f92', height: '50px', padding: '0 40px', fontWeight: 'bold' }}
                        >
                            CHỌN MUA NGAY 🌸
                        </Button>
                        
                        <Button 
                            size="large" 
                            onClick={() => { handleAddCart(); setTimeout(() => navigate('/order'), 500); }}
                            style={{ height: '50px', borderColor: '#fb6f92', color: '#fb6f92' }}
                        >
                            MUA VÀ THANH TOÁN
                        </Button>
                    </Space>

                    <Divider />
                    <Title level={5}>Mô tả sản phẩm:</Title>
                    <Text>{flower?.description || "Bó hoa tươi thắm được thiết kế riêng, mang lại vẻ đẹp tinh tế cho không gian của bạn."}</Text>
                </Col>
            </Row>
        </div>
    );
};