const Order = require('../models/OrderModel');

// 1. Khách đặt hàng (Lưu đơn vào DB)
const createOrder = async (req, res) => {
    try {
        const { orderItems, paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone, user } = req.body;
        
        if (!orderItems || !fullName || !address || !phone || !user) {
            return res.status(200).json({ status: 'ERR', message: 'Thiếu thông tin rồi bà ơi!' });
        }

        const createdOrder = await Order.create({
            orderItems,
            shippingAddress: { fullName, address, city, phone },
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice,
            user
        });

        return res.status(200).json({ status: 'OK', message: 'Đặt hàng thành công!', data: createdOrder });
    } catch (e) {
        return res.status(404).json({ message: e.message });
    }
};

// 2. Admin lấy tất cả đơn hàng
const getAllOrder = async (req, res) => {
    try {
        const allOrder = await Order.find().sort({ createdAt: -1, updatedAt: -1 });
        return res.status(200).json({ status: 'OK', message: 'Lấy đơn hàng thành công!', data: allOrder });
    } catch (e) {
        return res.status(404).json({ message: e.message });
    }
};

// 3. Admin xác nhận đã giao hàng
const updateOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const data = req.body;
        if (!orderId) {
            return res.status(200).json({ status: 'ERR', message: 'Thiếu ID đơn hàng!' });
        }
        const updatedOrder = await Order.findByIdAndUpdate(orderId, data, { new: true });
        return res.status(200).json({ status: 'OK', data: updatedOrder });
    } catch (e) {
        return res.status(404).json({ message: e.message });
    }
};

module.exports = { createOrder, getAllOrder, updateOrder };