const express = require("express");
const router = express.Router();
const flowerController = require('../controllers/FlowerController');

// XÓA cái dòng res.send cũ đi, thay bằng dòng này:
router.get('/get-all', flowerController.getAllFlower); 

module.exports = router;