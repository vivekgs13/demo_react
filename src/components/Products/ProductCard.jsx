import React from 'react'

const ProductCard = ({ product, onViewDetails }) => {
  const handleAddToCart = () => {
    alert(`${product.name} added to cart!`)
  }

  return (
    <div className="product-card" onClick={() => onViewDetails && onViewDetails(product)}>
      <div className="product-image">
        <span className="product-icon">📦</span>
      </div>
      <h3>{product.name}</h3>
      <p className="product-description">{product.description}</p>
      <p className="price">{product.price}</p>
      <button 
        className="btn btn-primary" 
        onClick={(e) => {
          e.stopPropagation()
          handleAddToCart()
        }}
      >
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCard
