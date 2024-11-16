import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("status"); 
    if (userLoggedIn === "logged-in") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      localStorage.removeItem("user");
      localStorage.removeItem("status");
      setIsLoggedIn(false);
      navigate("/");
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="shadow-md w-full px-6">
      <div className="flex justify-between items-center">
        <div>
          <img src="/logo.jpg" alt="Logo" className="h-20" />
        </div>

        <div className="md:flex items-center space-x-4">
          <button
            onClick={handleLoginLogout}
            className="px-4 py-2 text-white font-semibold bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
          >
            {isLoggedIn ? "Logout" : "Login"}
          </button>
        </div>
       
      </div>
    </nav>
  );
};

export default Navbar;
