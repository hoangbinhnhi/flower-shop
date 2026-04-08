import OrderConfirmationPage from '../pages/OrderConfirmationPage';
import { Homepage } from "../pages/Homepage/Homepage";
import { OrderPage } from "../pages/OrderPage/OrderPage";
import { FlowerDetailsPage } from "../pages/FlowerDetailsPage/FlowerDetailsPage";
import { SignInPage } from "../pages/SignInPage/SignInPage";
import { SignUpPage } from "../pages/SignUpPage/SignUpPage";
import { AdminPage } from "../pages/AdminPage/AdminPage";
import MyOrderPage from '../pages/MyOrderPage/MyOrderPage';
import ProfilePage from '../pages/ProfilePage'; 
import { CheckoutPage } from '../pages/CheckoutPage';
import { ContactPage } from '../pages/ContactPage';

// 🚀 IMPORT TRANG ĐĂNG NHẬP RIÊNG CỦA ADMIN VÀO NÈ:
import { AdminLoginPage } from '../pages/AdminLoginPage/AdminLoginPage';

export const routes = [
    { 
        path: '/confirm-order', 
        page: OrderConfirmationPage, 
        isShowHeader: true 
    },
    // --- DÀNH CHO NGƯỜI DÙNG ---
    { path: '/', page: Homepage, isShowHeader: true },
    { path: '/flower-details/:id', page: FlowerDetailsPage, isShowHeader: true },
    { path: '/sign-in', page: SignInPage, isShowHeader: false },
    { path: '/sign-up', page: SignUpPage, isShowHeader: false },
    { path: '/profile-user', page: ProfilePage, isShowHeader: true },

    { path: '/checkout-form', page: CheckoutPage, isShowHeader: true },
    { path: '/contact', page: ContactPage, isShowHeader: true },
    
    // --- CHỨC NĂNG ĐẶT HÀNG / HỦY HÀNG ---
    { path: '/order', page: OrderPage, isShowHeader: true }, 
    { path: '/my-order', page: MyOrderPage, isShowHeader: true }, 
    
    // --- DÀNH CHO ADMIN ---
    { 
        path: '/system/admin', 
        page: AdminPage, 
        isShowHeader: false, 
        isPrivate: true 
    },

   
    { 
        path: '/admin-login', 
        page: AdminLoginPage, 
        isShowHeader: false 
    }
];