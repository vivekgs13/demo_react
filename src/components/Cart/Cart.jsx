import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
} from '../../cart/cartSlice'
import './Cart.css'

const Cart = () => {
    const dispatch = useDispatch()
    const { items, totalPrice, totalItems } = useSelector((state) => state.cart)
    const [isCheckingOut, setIsCheckingOut] = useState(false)

    const handleRemove = (id) => {
        dispatch(removeFromCart(id))
    }

    const handleIncrease = (id) => {
        dispatch(increaseQuantity(id))
    }

    const handleDecrease = (id) => {
        dispatch(decreaseQuantity(id))
    }

    const handleCheckout = () => {
        if (items.length === 0) {
            alert('Your cart is empty!')
            return
        }
        setIsCheckingOut(true)
        setTimeout(() => {
            alert(`Order placed successfully! Total: $${totalPrice.toFixed(2)}`)
            dispatch(clearCart())
            setIsCheckingOut(false)
        }, 1000)
    }

    return (
        <div className="cart-container">
            <div className="cart-header">
                <h1>🛒 Shopping Cart</h1>
                <p className="item-count">{totalItems} items</p>
            </div>

            {items.length === 0 ? (
                <div className="empty-cart">
                    <div className="empty-icon">🛍️</div>
                    <h2>Your cart is empty</h2>
                    <p>Add some products to get started!</p>
                </div>
            ) : (
                <>
                    <div className="cart-items">
                        {items.map((item) => (
                            <div key={item.id} className="cart-item">
                                <div className="item-info">
                                    <h3>{item.name}</h3>
                                    <p className="item-price">{item.price}</p>
                                </div>

                                <div className="item-quantity">
                                    <button
                                        className="qty-btn"
                                        onClick={() => handleDecrease(item.id)}
                                        title="Decrease quantity"
                                    >
                                        −
                                    </button>
                                    <span className="qty-value">{item.quantity}</span>
                                    <button
                                        className="qty-btn"
                                        onClick={() => handleIncrease(item.id)}
                                        title="Increase quantity"
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="item-total">
                                    <span className="total-label">Total:</span>
                                    <span className="total-value">${item.totalPrice.toFixed(2)}</span>
                                </div>

                                <button
                                    className="remove-btn"
                                    onClick={() => handleRemove(item.id)}
                                    title="Remove from cart"
                                >
                                    🗑️
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <div className="summary-row">
                            <span>Subtotal:</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping:</span>
                            <span>FREE</span>
                        </div>
                        <div className="summary-row">
                            <span>Tax (10%):</span>
                            <span>${(totalPrice * 0.1).toFixed(2)}</span>
                        </div>
                        <div className="summary-row total">
                            <span>Grand Total:</span>
                            <span>${(totalPrice * 1.1).toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="cart-actions">
                        <button
                            className="clear-cart-btn"
                            onClick={() => {
                                if (window.confirm('Clear all items from cart?')) {
                                    dispatch(clearCart())
                                }
                            }}
                        >
                            Clear Cart
                        </button>
                        <button
                            className="checkout-btn"
                            onClick={handleCheckout}
                            disabled={isCheckingOut}
                        >
                            {isCheckingOut ? (
                                <>
                                    <span className="spinner"></span>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    Continue to Checkout
                                    <span className="arrow">→</span>
                                </>
                            )}
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

export default Cart
