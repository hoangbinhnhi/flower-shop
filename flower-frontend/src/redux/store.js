import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlide'
import productReducer from './productSlide' // 1. Import cái thợ tìm kiếm vào đây

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer, // 2. Gắn nó vào hệ thống quản lý
  },
})