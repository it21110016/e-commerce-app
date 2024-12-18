import React from 'react';
import AuthForm from '../components/AuthForm';
import { Link } from 'react-router-dom';
import { Player } from "@lottiefiles/react-lottie-player";

const RegisterPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-emerald-500 md:bg-gray-100">
            <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full mx-5">
                <div className="hidden md:block md:w-1/2 bg-emerald-500 h-[530px]">
                    <Player
                        autoplay
                        loop
                        src='/assets/animations/register.json'
                        style={{ height: "532px", width: "450px"}}
                    />
                </div>

                <div className="w-full md:w-1/2 p-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                        Create an Account
                    </h1>
                    <p className="text-gray-600 text-sm text-center mb-6">
                        Join us today and start shopping for amazing products!
                    </p>
                    <AuthForm isLogin={false} />
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="text-blue-500 hover:underline font-semibold">
                                Log in here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
