import React from 'react';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-hot-toast";
import { useContext } from 'react';

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <div className="border rounded-2xl shadow-lg p-6 flex flex-col items-center transition-all transform hover:shadow-2xl">
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover mb-4 rounded-lg"
            />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">{product.name}</h2>
            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
            <p className="text-lg font-bold text-gray-500 mb-4">${product.price}</p>
            {isLoggedIn ? (
                <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition-colors"
                >
                    <FontAwesomeIcon icon={faCartPlus} className="mr-2" />
                    Add to Cart
                </button>
            ) : (
                <button
                    onClick={() => toast.error('Please login to add items to cart', {
                        duration: 1500,
                        position: "top-center",
                    })}
                    className="w-full bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition-colors"
                >
                    <FontAwesomeIcon icon={faCartPlus} className="mr-2" />
                    Add to Cart
                </button>
            )}
        </div>
    );
};

export default ProductCard;
