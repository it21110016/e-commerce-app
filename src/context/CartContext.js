import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const [cart, setCart] = useState(storedCart);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        const existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {
            toast.error(`${product.name} is already in your cart!`, {
                duration: 1500,
                position: "top-center",
            });
        } else {
            setCart((prevCart) => {
                const updatedCart = [...prevCart, { ...product, quantity: 1 }];
                toast.success(`${product.name} has been added to your cart!`, {
                    duration: 1500,
                    position: "top-center",
                });
                return updatedCart;
            });
        }
    };

    const updateQuantity = (productId, quantity) => {
        setCart((prevCart) =>
            prevCart.map(item =>
                item.id === productId ? { ...item, quantity: Number(quantity) } : item
            )
        );
    };

    const removeFromCart = (productId) => {
        const removedProduct = cart.find(item => item.id === productId);
        setCart((prevCart) => prevCart.filter(item => item.id !== productId));
        toast.success(`${removedProduct.name} has been removed from your cart!`, {
            duration: 1500,
            position: "top-center",
        });
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
        toast("Thank you for your purchase! Redirecting to the shop...", {
            duration: 2000,
            position: "top-center",
            style: {
                border: '2px solid #10b981',
                padding: '16px',
                fontSize: '1.1rem',
                color: 'white',
                backgroundColor: '#10b981',
              },
              iconTheme: {
                primary: '#10b981',
                secondary: '#f97316',
              },
        });
    };

    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, cartTotal, clearCart, cartCount }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
