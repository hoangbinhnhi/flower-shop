import axios from "axios";

// 1. Lấy tất cả hoa (Hiện danh sách lên bảng)
export const getAllFlower = async () => {
    const res = await axios.get(`http://localhost:3001/api/flower/get-all`)
    return res.data
}

// 🚀 MỚI: Lấy chi tiết 1 bó hoa (Để hiện trang FlowerDetails và bỏ vào giỏ)
export const getDetailsFlower = async (id) => {
    const res = await axios.get(`http://localhost:3001/api/flower/get-details/${id}`)
    return res.data
}

// 2. Thêm hoa mới
export const createFlower = async (data) => {
    const res = await axios.post(`http://localhost:3001/api/flower/create-flower`, data)
    return res.data
}

// 3. Cập nhật hoa
export const updateFlower = async (id, data) => {
    const res = await axios.put(`http://localhost:3001/api/flower/update-flower/${id}`, data)
    return res.data
}

// 4. Xóa hoa
export const deleteFlower = async (id) => {
    const res = await axios.delete(`http://localhost:3001/api/flower/delete-flower/${id}`)
    return res.data
}

// 5. Đăng nhập (Dành cho Admin/User)
export const loginUser = async (data) => {
    const res = await axios.post(`http://localhost:3001/api/user/sign-in`, data);
    return res.data;
};