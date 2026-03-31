import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { debounce } from 'lodash'
import { addToCart } from '../../cart/cartSlice'
import './GlobalSearch.css'

const GlobalSearch = () => {
    const dispatch = useDispatch()
    const { products } = useSelector((state) => state.products)
    const [searchTerm, setSearchTerm] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [addedProduct, setAddedProduct] = useState(null)

    const debouncedSearch = debounce((term) => {
        if (!term.trim()) {
            setSearchResults([])
            return
        }

        setIsLoading(true)
        try {
            // Search through products
            const results = products.filter(product =>
                product.name.toLowerCase().includes(term.toLowerCase()) ||
                product.description.toLowerCase().includes(term.toLowerCase())
            ).slice(0, 8)

            setSearchResults(results)
        } catch (error) {
            console.error('Search error:', error)
            setSearchResults([])
        } finally {
            setIsLoading(false)
        }
    }, 300)

    const handleSearchChange = (e) => {
        const value = e.target.value
        setSearchTerm(value)
        setShowDropdown(true)
        debouncedSearch(value)
    }

    const handleAddToCart = (product, e) => {
        e.stopPropagation()
        dispatch(addToCart({
            ...product,
            quantity: 1
        }))
        setAddedProduct(product.id)
        setTimeout(() => setAddedProduct(null), 1500)
    }

    const handleResultClick = (product) => {
        setSearchTerm('')
        setShowDropdown(false)
        setSearchResults([])
        // Optional: Navigate to product or open details
    }

    const handleClear = () => {
        setSearchTerm('')
        setSearchResults([])
        setShowDropdown(false)
    }

    return (
        <div className="global-search">
            <div className="search-box">
                <span className="search-icon-left">🔍</span>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onFocus={() => setShowDropdown(true)}
                    className="search-input-global"
                />
                {searchTerm && (
                    <button className="clear-btn" onClick={handleClear}>
                        ✕
                    </button>
                )}
            </div>

            {showDropdown && (searchTerm || searchResults.length > 0) && (
                <div className="search-dropdown">
                    {isLoading ? (
                        <div className="dropdown-loading">
                            <span className="mini-spinner"></span>
                            <span>Searching products...</span>
                        </div>
                    ) : searchResults.length > 0 ? (
                        <div className="dropdown-results">
                            {searchResults.map((result) => (
                                <div
                                    key={result.id}
                                    className="dropdown-item product-item"
                                    onClick={() => handleResultClick(result)}
                                >
                                    <div className="product-info">
                                        <span className="result-type-icon">📦</span>
                                        <div className="product-details">
                                            <span className="result-name">{result.name}</span>
                                            <span className="result-description">{result.description}</span>
                                            <span className="result-price">{result.price}</span>
                                        </div>
                                    </div>
                                    <button
                                        className={`add-to-cart-btn ${addedProduct === result.id ? 'added' : ''}`}
                                        onClick={(e) => handleAddToCart(result, e)}
                                        title="Add to cart"
                                    >
                                        {addedProduct === result.id ? '✓' : '🛒'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : searchTerm ? (
                        <div className="dropdown-empty">
                            <span className="empty-icon">😔</span>
                            <span className="empty-text">No products found</span>
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    )
}

export default GlobalSearch
