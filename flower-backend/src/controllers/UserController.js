const User = require('../models/UserModel');
const bcrypt = require('bcrypt'); 

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(200).json({ status: 'ERR', message: 'Nhập thiếu Email hoặc Pass kìa!' });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(200).json({ status: 'ERR', message: 'Tài khoản này chưa đăng ký!' });
        }

        // 🚨 KÍNH CHIẾU YÊU: Chấp hết mọi thể loại mật khẩu
        let isCheckPassword = false;
        
        // Nếu password trong DB dài thòong loòng (do bị UserModel lén mã hóa)
        if (user.password.length > 30) { 
            isCheckPassword = bcrypt.compareSync(password, user.password);
        } 
        // Nếu password lưu bình thường
        else { 
            isCheckPassword = (password === user.password);
        }

        if (!isCheckPassword) {
            return res.status(200).json({ status: 'ERR', message: 'Mật khẩu sai rồi bà nội ơi!' });
        }

        return res.status(200).json({
            status: 'OK',
            message: 'Đăng nhập thành công!',
            access_token: 'token_that_ne', 
            data: {
                name: user.name || user.email, 
                email: user.email,
                _id: user._id,
                isAdmin: user.isAdmin 
            }
        });
    } catch (e) {
        return res.status(500).json({ status: 'ERR', message: e.message });
    }
};

const createUser = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;
        
        if (!email || !password) {
            return res.status(200).json({ status: 'ERR', message: 'Vui lòng nhập đầy đủ thông tin!' });
        }

        if (confirmPassword && password !== confirmPassword) {
            return res.status(200).json({ status: 'ERR', message: 'Hai mật khẩu không khớp nhau!' });
        }

        const checkUser = await User.findOne({ email: email });
        if (checkUser) {
            return res.status(200).json({ status: 'ERR', message: 'Email này có người dùng rồi!' });
        }

        // Lưu thẳng mật khẩu vào Database luôn!
        const newUser = await User.create({
            email: email, 
            password: password, 
            name: email.split('@')[0], 
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