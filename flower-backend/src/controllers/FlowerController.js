const FlowerService = require('../services/FlowerService');

// 1. Tạo hoa mới
const createFlower = async (req, res) => {
    try {
        const resService = await FlowerService.createFlower(req.body);
        return res.status(200).json(resService);
    } catch (e) {
        return res.status(500).json({ status: 'ERR', message: e.message });
    }
};

// 2. Cập nhật hoa (Cái này để nút Sửa chạy nè!)
const updateFlower = async (req, res) => {
    try {
        const flowerId = req.params.id;
        const data = req.body;
        
        if (!flowerId) {
            return res.status(200).json({ status: 'ERR', message: 'Thiếu ID hoa rồi má!' });
        }
        
        // Gọi sang Service để update
        const resService = await FlowerService.updateFlower(flowerId, data);
        return res.status(200).json(resService);
    } catch (e) {
      
        return res.status(200).json({ status: 'ERR', message: e.message });
    }
};



const deleteFlower = async (req, res) => {
    try {
        const flowerId = req.params.id;
        if (!flowerId) {
            return res.status(400).json({ status: 'ERR', message: 'ID hoa đâu mà xóa!' });
        }
        const resService = await FlowerService.deleteFlower(flowerId);
        return res.status(200).json(resService);
    } catch (e) {
        return res.status(500).json({ status: 'ERR', message: e.message });
    }
};

// 4. Lấy tất cả hoa
const getAllFlower = async (req, res) => {
    try {
        const resService = await FlowerService.getAllFlower();
        return res.status(200).json(resService);
    } catch (e) {
        return res.status(500).json({ status: 'ERR', message: e.message });
    }
};

// 5. Chi tiết hoa
const getDetailsFlower = async (req, res) => {
    try {
        const flowerId = req.params.id;
        const resService = await FlowerService.getDetailsFlower(flowerId);
        return res.status(200).json(resService);
    } catch (e) {
        return res.status(500).json({ status: 'ERR', message: e.message });
    }
};

module.exports = {
    createFlower,
    updateFlower,
    deleteFlower,
    getAllFlower,
    getDetailsFlower
};