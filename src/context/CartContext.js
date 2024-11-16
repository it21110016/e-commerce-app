import React, { createContext, useState, useContext, useEffect } from 'react';
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
        toast.success("🎉 Thank you for your purchase! Redirecting to the shop...", {
            duration: 2000,
            position: "top-center",
        });
    };

    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, cartTotal, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
