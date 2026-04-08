const express = require("express");
const router = express.Router();
// Đảm bảo tên file FlowerController viết đúng nha
const flowerController = require('../controllers/FlowerController');

router.get('/get-all', flowerController.getAllFlower); 
router.post('/create-flower', flowerController.createFlower);
router.put('/update-flower/:id', flowerController.updateFlower);
router.delete('/delete-flower/:id', flowerController.deleteFlower);

module.exports = router;