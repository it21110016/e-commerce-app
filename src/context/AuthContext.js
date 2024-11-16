import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email, password) => {
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser || savedUser.email !== email) {
      throw new Error("Invalid user. Please register first.");
    } else if (savedUser.password !== password) {
      throw new Error("Invalid credentials. Please try again.");
    } else {
      setUser(savedUser);
      localStorage.setItem("status", "logged-in");
      toast.success('Login successful!', {
        duration: 1500,
        position: "top-center",
    });
    setTimeout(() => {
      window.location.replace("/products");
    }, 1800);
    }
  };

  const register = (name, email, password) => {
    const fakeUser = { name, email, password };
    setUser(fakeUser);
    localStorage.setItem("user", JSON.stringify(fakeUser));
    
    window.location.replace(`/?email=${encodeURIComponent(email)}`);
};

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
