const Flower = require('../models/FlowerModel');

// 1. HÀM LẤY HOA THẬT TỪ DATABASE
const getAllFlower = async (req, res) => {
    try {
        // Dùng lệnh .find() để lôi hết hoa từ MongoDB ra
        const allFlower = await Flower.find(); 
        
        return res.status(200).json({
            status: 'OK',
            message: 'Success',
            data: allFlower,
            total: allFlower.length,
        });
    } catch (e) {
        return res.status(404).json({ message: e.message });
    }
};

// 2. HÀM TẠO HOA MỚI VÀO DATABASE
const createFlower = async (req, res) => {
    try {
        const { name, image, type, price, countInStock, rating, description } = req.body;
        
        // Nhét hoa vào kho
        const newFlower = await Flower.create({
            name, image, type, price, countInStock, rating, description
        });

        return res.status(200).json({ 
            status: 'OK', 
            message: 'Thêm hoa vào Database thành công!',
            data: newFlower 
        });
    } catch (e) {
        return res.status(404).json({ message: e.message });
    }
};

module.exports = { 
    getAllFlower, 
    createFlower 
};