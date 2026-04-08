import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    email: '',
    phone: '',
    address: '',
    access_token: '',
    id: '',
    isAdmin: false,
    cart: [] 
}

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { name, email, access_token, address, phone, avatar, _id, isAdmin, city } = action.payload
            state.name = name || email || 'Khách hàng'; 
            state.email = email || state.email;
            state.address = address || state.address;
            state.phone = phone || state.phone;
            state.avatar = avatar || state.avatar;
            state.id = _id || state.id;
            state.access_token = access_token || state.access_token;
            state.isAdmin = isAdmin || state.isAdmin;
            state.city = city || state.city;
        },
        resetUser: (state) => {
            state.name = '';
            state.email = '';
            state.id = '';
            state.access_token = '';
            state.isAdmin = false;
            state.cart = []; 
        },
        addToCart: (state, action) => {
            const itemDetails = action.payload;
            const price = Number(itemDetails.price) || 0;
            const amount = Number(itemDetails.amount) || 1;
            const productId = itemDetails.product; // Đây là ID của hoa

            const isItemExist = state.cart.find((item) => item.product === productId);
            
            if (isItemExist && productId) { 
                isItemExist.amount = Number(isItemExist.amount) + amount;
            } else {
                state.cart.push({ 
                    ...itemDetails, 
                    price: price, 
                    amount: amount 
                });
            }
        },
        increaseAmount: (state, action) => {
            const idProduct = action.payload;
            const itemCart = state.cart.find((item) => item.product === idProduct);
            if (itemCart) {
                itemCart.amount = Number(itemCart.amount) + 1;
            }
        },
        decreaseAmount: (state, action) => {
            const idProduct = action.payload;
            const itemCart = state.cart.find((item) => item.product === idProduct);
            if (itemCart && itemCart.amount > 1) {
                itemCart.amount = Number(itemCart.amount) - 1;
            }
        },
        
        removeOrderProduct: (state, action) => {
            const idProductToRemove = action.payload;
            state.cart = state.cart.filter((item) => item.product !== idProductToRemove);
        }
    },
})

export const { 
    updateUser, resetUser, addToCart, 
    increaseAmount, decreaseAmount, removeOrderProduct 
} = userSlide.actions 

export default userSlide.reducer