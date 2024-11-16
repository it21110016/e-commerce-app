import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';

const App = () => (
    <AuthProvider>
        <CartProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route
                        path="/cart"
                        element={
                            <ProtectedRoute>
                                <CartPage />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
                <Toaster />
            </Router>
        </CartProvider>
    </AuthProvider>
);

export default App;
