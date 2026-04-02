const Flower = require("../models/FlowerModel")

// 1. Tạo hoa mới
const createFlower = (newFlower) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { name, image, type, price, countInStock, description } = newFlower || {}
            if (!name || !image || !price) {
                return resolve({ status: 'ERR', message: 'Thiếu thông tin bắt buộc rồi má!' })
            }

            const checkFlower = await Flower.findOne({ name: name })
            if (checkFlower !== null) {
                return resolve({ status: 'ERR', message: 'Tên hoa này có rồi, đặt tên khác đi!' })
            }

            const createdFlower = await Flower.create({
                name, image, type, price, countInStock, description
            })
            
            resolve({
                status: 'OK',
                message: 'Thêm hoa thành công rực rỡ!',
                data: createdFlower
            })
        } catch (e) {
            reject(e)
        }
    })
}

// 2. Cập nhật hoa
const updateFlower = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Dùng findById cho nhanh và chuẩn
            const checkFlower = await Flower.findById(id)
            if (!checkFlower) {
                return resolve({ status: 'ERR', message: 'Hoa này không có trong kho!' })
            }
            const updatedFlower = await Flower.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'Sửa xong rồi nha!',
                data: updatedFlower
            })
        } catch (e) {
            reject(e)
        }
    })
}

// 3. Xóa hoa
const deleteFlower = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkFlower = await Flower.findById(id)
            if (!checkFlower) {
                return resolve({ status: 'ERR', message: 'Có hoa đâu mà xóa bà nội!' })
            }
            await Flower.findByIdAndDelete(id)
            resolve({ status: 'OK', message: 'Xóa sổ bông hoa này rồi!' })
        } catch (e) {
            reject(e)
        }
    })
}

// 4. Lấy tất cả hoa
const getAllFlower = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allFlower = await Flower.find().sort({ createdAt: -1 }) // Hiện hoa mới nhất lên đầu
            resolve({
                status: 'OK',
                message: 'Đã bưng hết hoa ra đây!',
                data: allFlower
            })
        } catch (e) {
            reject(e)
        }
    })
}

// 5. Chi tiết hoa
const getDetailsFlower = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const flower = await Flower.findById(id)
            if (!flower) {
                return resolve({ status: 'ERR', message: 'Tìm lòi mắt không thấy hoa này!' })
            }
            resolve({
                status: 'OK',
                message: 'Đây, chi tiết nó đây!',
                data: flower
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createFlower,
    updateFlower,
    deleteFlower,
    getAllFlower,
    getDetailsFlower
}