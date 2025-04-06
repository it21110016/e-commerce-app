import React from 'react';
import Cart from '../components/Cart';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {

    const navigate = useNavigate();
    
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-semibold text-gray-800 mb-5">Your Shopping Cart</h1>
            <button
            onClick={() => navigate("/products")}
            className="text-blue-500 hover:underline text-xl font-semibold mb-14"
          >
            Back to Products
          </button>
            <Cart />
        </div>
    );
};

export default CartPage;
