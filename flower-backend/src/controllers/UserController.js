const User = require('../models/UserModel');


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ status: 'ERR', message: 'User không tồn tại!' });
        }

       
        return res.status(200).json({
            status: 'OK',
            message: 'SUCCESS',
            access_token: 'token_that_ne',
           
data: {
    name: user.name || user.email, 
    email: user.email,
    _id: user._id
}
        });
    } catch (e) {
        return res.status(500).json({ status: 'ERR', message: e.message });
    }
};
   

// 2. HÀM ĐĂNG KÝ (Tạo user thật vào MongoDB)
const createUser = async (req, res) => {
    try {
        const { email, password, name, phone } = req.body;
        
        // Kiểm tra xem email có trùng không
        const checkUser = await User.findOne({ email: email });
        if (checkUser) {
            return res.status(404).json({ status: 'ERR', message: 'Email này có người dùng rồi!' });
        }

        // Tạo user mới vào database
        const newUser = await User.create({
            email, 
            password, 
            name: name || email.split('@')[0], // Nếu khách không nhập tên thì lấy email làm tên
            phone,
            isAdmin: false 
        });

        return res.status(200).json({
            status: 'OK',
            message: 'Tạo tài khoản thành công rực rỡ!',
            data: newUser
        });
    } catch (e) {
        return res.status(500).json({ status: 'ERR', message: e.message });
    }
};

module.exports = { loginUser, createUser };