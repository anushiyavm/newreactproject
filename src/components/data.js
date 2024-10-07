import React, { useState, useEffect } from 'react';

const ProductList = () => {
    const [products, setProducts] = useState([]); // To store products from API
    const [cart, setCart] = useState([]); // To store products added to cart
    const [searchTerm, setSearchTerm] = useState(''); // To store search term
    const [isCheckout, setIsCheckout] = useState(false); // To toggle checkout view
    const [orderSummary, setOrderSummary] = useState(null); // To store order summary
    const [error, setError] = useState(null); // To store API errors

    // Fetch products from API when component mounts
    useEffect(() => {
        async function fetchProducts() {
            try {
                let response = await fetch("http://localhost:2311/product/all", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                let data = await response.json();
                if (response.ok) {
                    setProducts(data.data); // Store the fetched products
                } else {
                    throw new Error("Error fetching products");
                }
            } catch (error) {
                setError("Error fetching products, please try again later.");
            }
        }
        fetchProducts();
    }, []);

    // Search functionality
    const handleSearch = (event) => {
        setSearchTerm(event.target.value); // Update search term
    };

    // Filter products based on search term
    const filteredProducts = products.filter(product =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Add to Cart functionality
    const addToCart = (product) => {
        setCart([...cart, product]); // Add selected product to cart
        alert(`${product.productName} added to cart!`);
    };

    // Load cart from localStorage when the component mounts
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(savedCart);
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Proceed to checkout
    const handleCheckout = () => {
        setIsCheckout(true);
        setOrderSummary({
            products: cart,
            total: cart.reduce((sum, product) => sum + product.sellingPrice, 0), // Calculate total price
        });
    };

    // Place Order functionality
    const placeOrder = () => {
        alert('Order placed successfully using cash!');
        setCart([]); // Clear the cart after order placement
        localStorage.removeItem('cart'); // Clear cart from localStorage
        setIsCheckout(false); // Reset to product listing
    };

    return (
        <div className="app">
            <h1>Product List</h1>

            {/* Search Input */}
            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
            />

            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if API fails */}

            {/* Display Product List or Checkout based on isCheckout state */}
            {!isCheckout ? (
                <div>
                    {/* Product List */}
                    <div className="product-list">
                        {filteredProducts.map(product => (
                            <div key={product._id} className="product-card">
                                <img 
                                  src={product.productImage} 
                                  alt={product.productName} 
                                  style={{ width: '200px', height: '200px', objectFit: 'cover' }} 
                                />
                                <h2>{product.productName}</h2>
                                <p>{product.productDescription}</p>
                                <p>Original Price: ₹{product.originalPrice}</p>
                                <p>Selling Price: ₹{product.sellingPrice}</p>
                                {/* Add to Cart button */}
                                <button onClick={() => addToCart(product)}>Add to Cart</button>
                            </div>
                        ))}
                    </div>

                    {/* Show Proceed to Checkout Button if cart is not empty */}
                    {cart.length > 0 && (
                        <div className="checkout-container">
                            <button onClick={handleCheckout} className="checkout-button">
                                Proceed to Checkout
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                // Checkout View
                <div className="checkout">
                    <h2>Checkout</h2>
                    <h3>Order Summary</h3>
                    <ul>
                        {orderSummary.products.map(product => (
                            <li key={product._id}>
                                {product.productName} - ₹{product.sellingPrice}
                            </li>
                        ))}
                    </ul>
                    <h3>Total: ₹{orderSummary.total}</h3>
                    <button onClick={placeOrder}>Place Order (Cash)</button>
                    <button onClick={() => setIsCheckout(false)}>Back to Products</button>
                </div>
            )}
        </div>
    );
};

export default ProductList;
