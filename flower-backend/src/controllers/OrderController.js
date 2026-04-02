const Order = require('../models/OrderModel');

const createOrder = async (req, res) => {
    try {
        const { 
            paymentMethod, itemsPrice, shippingPrice, totalPrice, 
            fullName, address, city, phone, orderItems, user 
        } = req.body;

        // KIỂM TRA: Nếu không có user ID thật thì báo lỗi luôn, không cho đặt "ké" ông 9999 nữa
        if (!user) {
            return res.status(400).json({ status: 'ERR', message: 'Bà phải đăng nhập mới đặt hàng được chứ!' });
        }

        const createdOrder = await Order.create({
            orderItems,
            shippingAddress: {
                fullName: fullName || "Khách hàng",
                address: address || "Chưa có địa chỉ",
                city: city || "Đà Nẵng",
                phone: phone || "000000000"
            },
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice,
            user: user, // LẤY ID THẬT CỦA NGƯỜI ĐANG ĐĂNG NHẬP
        });

        return res.status(200).json({
            status: 'OK',
            message: 'Đặt hàng thành công rồi má ơi! 🌸',
            data: createdOrder
        });
    } catch (e) {
        return res.status(500).json({ status: 'ERR', message: e.message });
    }
};

module.exports = { createOrder };