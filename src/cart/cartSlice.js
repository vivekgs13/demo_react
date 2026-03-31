import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload
      const existingItem = state.items.find(item => item.id === product.id)

      if (existingItem) {
        // If product already in cart, increase quantity
        existingItem.quantity += product.quantity || 1
        existingItem.totalPrice = existingItem.quantity * parseFloat(existingItem.price.replace('$', ''))
      } else {
        // Add new product to cart
        const priceValue = parseFloat(product.price.replace('$', ''))
        state.items.push({
          ...product,
          quantity: product.quantity || 1,
          totalPrice: priceValue * (product.quantity || 1),
        })
      }

      // Update totals
      state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)
      state.totalPrice = state.items.reduce((sum, item) => sum + item.totalPrice, 0)
    },

    removeFromCart: (state, action) => {
      const productId = action.payload
      state.items = state.items.filter(item => item.id !== productId)

      // Update totals
      state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)
      state.totalPrice = state.items.reduce((sum, item) => sum + item.totalPrice, 0)
    },

    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload
      const item = state.items.find(item => item.id === productId)

      if (item) {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          state.items = state.items.filter(i => i.id !== productId)
        } else {
          item.quantity = quantity
          item.totalPrice = quantity * parseFloat(item.price.replace('$', ''))
        }
      }

      // Update totals
      state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)
      state.totalPrice = state.items.reduce((sum, item) => sum + item.totalPrice, 0)
    },

    clearCart: (state) => {
      state.items = []
      state.totalItems = 0
      state.totalPrice = 0
    },

    increaseQuantity: (state, action) => {
      const productId = action.payload
      const item = state.items.find(item => item.id === productId)

      if (item) {
        item.quantity += 1
        item.totalPrice = item.quantity * parseFloat(item.price.replace('$', ''))
      }

      // Update totals
      state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)
      state.totalPrice = state.items.reduce((sum, item) => sum + item.totalPrice, 0)
    },

    decreaseQuantity: (state, action) => {
      const productId = action.payload
      const item = state.items.find(item => item.id === productId)

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1
          item.totalPrice = item.quantity * parseFloat(item.price.replace('$', ''))
        } else {
          state.items = state.items.filter(i => i.id !== productId)
        }
      }

      // Update totals
      state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)
      state.totalPrice = state.items.reduce((sum, item) => sum + item.totalPrice, 0)
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions

export default cartSlice.reducer
