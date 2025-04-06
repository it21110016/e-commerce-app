import React, { useContext, useState } from "react";
import CartContext from "../context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { faCreditCard } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCheckout = () => {
    setShowConfirmModal(true);
  };

  const confirmCheckout = () => {
    setShowConfirmModal(false);
    setLoading(true);
    setTimeout(() => {
      clearCart();
    }, 2000);
    setTimeout(() => {
      setLoading(false);
      navigate("/products");
    }, 4000);
  };

  const handleIncrement = (productId) => {
    const product = cart.find((item) => item.id === productId);
    updateQuantity(productId, product.quantity + 1);
  };

  const handleDecrement = (productId) => {
    const product = cart.find((item) => item.id === productId);
    if (product.quantity > 1) {
      updateQuantity(productId, product.quantity - 1);
    }
  };

  return (
    <div className={`container mx-auto p-6 max-w-4xl ${loading ? "opacity-50" : ""}`}>
      {/* Spinner Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-opacity-75 flex items-center justify-center z-50 top-50 left-50">
          <Player
            autoplay
            loop
            src='/assets/animations/spinner.json'
            style={{ height: "300px", width: "300px", margin: "0 auto" }}
          />
        </div>
      )}

      {cart.length === 0 ? (
        <div className="text-center">
          <Player
            autoplay
            loop
            src='/assets/animations/empty-cart.json'
            style={{ height: "200px", width: "200px", margin: "0 auto" }}
          />
          <p className="text-lg font-semibold text-gray-500 mt-6">
            Your cart is empty. Start shopping now!
          </p>
        </div>
      ) : (
        <div>
          {/* Cart Item List */}
          <div className="space-y-6 border border-gray-500">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row justify-between items-center p-6 border-b border-gray-500 bg-white"
              >
                {/* Product Info */}
                <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg border border-gray-300"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>

                {/* Quantity and Price */}
                <div className="flex items-center justify-between lg:space-x-8 mt-4">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleDecrement(item.id)}
                      disabled={item.quantity === 1}
                      className={`${
                        item.quantity === 1
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-emerald-300 text-gray-800 hover:bg-emerald-400"
                      } text-xl px-3 py-1 rounded-lg transition-colors`}
                    >
                      -
                    </button>
                    <p className="text-lg font-semibold text-gray-900 w-2.5">
                      {item.quantity}
                    </p>
                    <button
                      onClick={() => handleIncrement(item.id)}
                      className="bg-emerald-300 text-gray-800 text-xl px-3 py-1 rounded-lg hover:bg-emerald-400 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <p className="text-lg font-semibold text-gray-900 ml-4 w-10">
                    ${item.price * item.quantity}
                  </p>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-800 transition-colors flex items-center ml-4"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate("/products")}
            className="text-blue-500 hover:underline font-semibold mt-4"
          >
            <FontAwesomeIcon icon={faArrowLeftLong} className="mr-2" />
            Continue Shopping
          </button>

          {/* Cart Total and Checkout Button */}
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm">
            <p className="text-2xl font-semibold text-gray-900">
              Total: ${cartTotal}
            </p>
            <button
              onClick={handleCheckout}
              className="mt-4 sm:mt-0 px-8 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 transition-colors"
            >
              <FontAwesomeIcon icon={faCreditCard} className="mr-2" />
              Checkout
            </button>
          </div>

          {/* Confirmation Modal */}
          {showConfirmModal && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full mx-5">
                <h2 className="text-lg font-semibold text-gray-900">
                  Confirm Checkout
                </h2>
                <p className="text-sm text-gray-600 my-4">
                  Are you sure you want to complete your purchase? This will
                  clear your cart.
                </p>
                <div className="flex flex-col sm:flex-row justify-end space-x-0 sm:space-x-4">
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmCheckout}
                    className="mt-4 sm:mt-0 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
