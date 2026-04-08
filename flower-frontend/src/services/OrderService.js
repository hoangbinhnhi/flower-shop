import axios from 'axios';

const API_URL = 'http://localhost:3001/api/order'; 

// 1. Lấy tất cả đơn hàng (Dành cho Admin)
export const getAllOrder = async () => {
    const res = await axios.get(`${API_URL}/get-all-order`);
    return res.data;
};

// 2. Lấy đơn hàng của 1 user cụ thể (Dành cho trang Lịch sử đơn)
export const getOrderByUserId = async (id) => {
    const res = await axios.get(`${API_URL}/get-all-order/${id}`);
    return res.data;
};

// 3. Tạo đơn hàng mới (Dành cho lúc khách ấn Thanh toán ở Giỏ hàng)
export const createOrder = async (data) => {
    const res = await axios.post(`${API_URL}/create`, data);
    return res.data;
};

// 4. Cập nhật trạng thái đơn hàng (Dành cho Admin ấn nút "Xác nhận giao")
export const updateOrder = async (id, data) => {
    const res = await axios.put(`${API_URL}/update/${id}`, data);
    return res.data;
};

// 5. Hủy đơn hàng (Dành cho khách ấn hủy đơn)
export const cancelOrder = async (id) => {
    const res = await axios.delete(`${API_URL}/cancel-order/${id}`);
    return res.data;
};