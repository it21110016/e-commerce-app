import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faUser as faRegUser } from "@fortawesome/free-regular-svg-icons"; 
import AuthContext from "../context/AuthContext";
import CartContext from "../context/CartContext";

const Navbar = () => {
  const { logout, isLoggedIn } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      logout();
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  const goToCart = () => {
    navigate("/cart");
  };

  return (
    <nav className="shadow-md w-full px-6 sticky top-0 bg-white z-10">
      <div className="flex justify-between items-center">
        <div>
          <Link to="/products" className="text-2xl font-semibold text-gray-800">
            <img src="/logo.jpg" alt="Logo" className="h-20" />
          </Link>
        </div>

        <div className="flex justify-between items-center space-x-4">
          {isLoggedIn && (
            <button
              onClick={goToCart}
              className="bg-orange-500 text-white py-3 px-3 rounded-lg flex items-center hover:bg-orange-600 transition-colors sm:py-2"
            >
              <div className="-mr-1.5 -mb-1.5">
                < FontAwesomeIcon icon={faShoppingCart}  />
                <span className="relative inline-block -left-2.5 -top-2.5 font-bold bg-white rounded-full text-xs text-emerald-600 w-3.5 h-3.75">{cartCount}</span>
              </div>
              <span className="hidden sm:inline">View Cart</span>
            </button>
          )}
            <button
              onClick={handleLoginLogout}
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors sm:py-2"
            >
              <FontAwesomeIcon icon={isLoggedIn ? faUser : faRegUser} className="sm:mr-2" />
              {isLoggedIn ? <span className="hidden sm:inline">Logout</span> : <span className="hidden sm:inline">Login</span>}
            </button>
        </div>
       
      </div>
    </nav>
  );
};

export default Navbar;
