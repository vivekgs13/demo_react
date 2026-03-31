import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../counter/counterSlice'
import navReducer from '../components/Nav/navSlice'
import authReducer from '../auth/authSlice'
import cartReducer from '../cart/cartSlice'
import themeReducer from '../theme/themeSlice'
import productsReducer from '../products/productsSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        nav: navReducer,
        auth: authReducer,
        cart: cartReducer,
        theme: themeReducer,
        products: productsReducer,
    }

});