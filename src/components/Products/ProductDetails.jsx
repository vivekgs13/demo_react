import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../cart/cartSlice'
import './ProductDetails.css'

const ProductDetails = ({ product, onClose }) => {
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  const handleAddToCart = () => {
    dispatch(addToCart({
      ...product,
      quantity: quantity
    }))
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleQuantityChange = (value) => {
    if (value > 0) {
      setQuantity(value)
    }
  }

  const extractPrice = (priceStr) => {
    return parseFloat(priceStr.replace('$', ''))
  }

  const totalPrice = (extractPrice(product.price) * quantity).toFixed(2)

  return (
    <div className="product-details-overlay" onClick={onClose}>
      <div className="product-details-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>

        <div className="details-container">
          <div className="details-image">
            <div className="product-image-large">
              <span className="product-icon-large">📦</span>
            </div>
          </div>

          <div className="details-content">
            <h2 className="details-name">{product.name}</h2>
            
            <div className="details-rating">
              <span className="stars">⭐⭐⭐⭐⭐</span>
              <span className="rating-text">(324 reviews)</span>
            </div>

            <div className="details-price">
              <span className="price-amount">{product.price}</span>
              <span className="price-label">per unit</span>
            </div>

            <p className="details-description">
              {product.description}
            </p>

            <div className="details-features">
              <h3>Key Features</h3>
              <ul>
                <li>✓ Premium quality materials</li>
                <li>✓ 2-year warranty included</li>
                <li>✓ Free shipping on orders over $50</li>
                <li>✓ 30-day money-back guarantee</li>
              </ul>
            </div>

            <div className="details-stock">
              <span className="stock-badge in-stock">✓ In Stock</span>
              <span className="stock-count">45 items available</span>
            </div>

            <div className="details-actions">
              <div className="quantity-selector">
                <label>Quantity:</label>
                <div className="quantity-controls">
                  <button 
                    className="qty-btn"
                    onClick={() => handleQuantityChange(quantity - 1)}
                  >
                    −
                  </button>
                  <input 
                    type="number" 
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    min="1"
                  />
                  <button 
                    className="qty-btn"
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="total-price">
                <span className="label">Total:</span>
                <span className="amount">${totalPrice}</span>
              </div>
            </div>

            <div className="details-buttons">
              <button 
                className={`btn-add-cart ${addedToCart ? 'added' : ''}`}
                onClick={handleAddToCart}
              >
                {addedToCart ? '✓ Added to Cart' : '🛒 Add to Cart'}
              </button>
              <button className="btn-wishlist">♡ Add to Wishlist</button>
            </div>

            <div className="details-shipping">
              <p>📦 <strong>Free Standard Shipping</strong> on orders over $50</p>
              <p>🚚 Estimated delivery: 3-5 business days</p>
              <p>↩️ <strong>Easy Returns</strong> within 30 days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
