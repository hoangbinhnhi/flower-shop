const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// 1. Kéo các Router vào
const FlowerRouter = require("./routes/FlowerRouter");
const UserRouter = require("./routes/UserRouter");
const OrderRouter = require("./routes/OrderRouter"); 

dotenv.config();

const app = express();
const port = process.env.PORT || 3001; 

// 2. Cấu hình middleware (BẮT BUỘC PHẢI CÓ ĐỂ NHẬN DATA TỪ FRONTEND)
app.use(cors()); 
app.use(express.json({ limit: '50mb' })); 
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// 3. Cắm đường ống API
app.use('/api/flower', FlowerRouter); 
app.use('/api/user', UserRouter);
app.use('/api/order', OrderRouter); 

// 4. Kết nối Database
// Nhớ check xem tên Database trong Compass của bà có đúng là FlowerShop không nha
mongoose.connect('mongodb://localhost:27017/FlowerShop') 
    .then(() => {
        console.log('--- CHÚC MỪNG BÀ NỘI! ---');
        console.log('Kết nối Database thành công! 🌸');
        console.log('Dữ liệu chuẩn bị chảy vào MongoDB rồi nè! 🚀');
    })
    .catch((err) => {
        console.log('Lỗi kết nối MongoDB rồi bà ơi: ', err);
    });

// 5. Khởi động Server
app.listen(port, () => {
    console.log("Server đang chạy ở port: " + port);
});