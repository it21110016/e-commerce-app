import React from 'react';
import AuthForm from '../components/AuthForm';
import { Link, useSearchParams } from 'react-router-dom';
import { Player } from "@lottiefiles/react-lottie-player";

const LoginPage = () => {

    const [searchParams] = useSearchParams();
    const emailFromRegister = searchParams.get('email') || '';

    return (
        <div className="min-h-screen flex items-center justify-center bg-orange-500 md:bg-gray-100">
            <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full mx-5">
                <div className="hidden md:block md:w-1/2 bg-orange-500 h-[432px]">
                    <Player
                        autoplay
                        loop
                        src='/assets/animations/login.json'
                        style={{ height: "400px", width: "450px"}}
                    />
                </div>

                <div className="w-full md:w-1/2 p-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                        Welcome Back
                    </h1>
                    <p className="text-gray-600 text-sm text-center mb-6">
                        Please login to access your account.
                    </p>
                    <AuthForm isLogin={true} initialEmail={emailFromRegister} />
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                           <Link to="/register" className="text-blue-500 hover:underline font-semibold">
                                Register here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
