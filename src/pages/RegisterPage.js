import React from 'react';
import AuthForm from '../components/AuthForm';

const RegisterPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full mx-5">
                <div className="hidden md:block md:w-1/2 bg-green-500">
                    <img
                        src="/assets/images//register.jpg"
                        alt="Register"
                        className="w-full h-full object-cover"
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
                            <a
                                href="/"
                                className="text-blue-500 hover:underline font-semibold"
                            >
                                Log in here
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
