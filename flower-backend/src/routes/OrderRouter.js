const express = require("express");
const router = express.Router();

// Tạm thời để trống hoặc viết một cái route demo cho nó khỏi lỗi
router.get('/test', (req, res) => {
    res.send('Order Router đang chạy ngon lành!');
});

module.exports = router;