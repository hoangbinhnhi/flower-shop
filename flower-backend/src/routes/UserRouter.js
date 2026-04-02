const express = require("express");
const router = express.Router();
const userController = require('../controllers/UserController');

// Đăng ký thành viên
router.post('/sign-up', userController.createUser);

// Đăng nhập
router.post('/sign-in', userController.loginUser);

// QUAN TRỌNG: Phải có dòng này thì index.js mới chạy được
module.exports = router;