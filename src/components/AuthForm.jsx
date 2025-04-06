import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const AuthForm = ({ isLogin, initialEmail = '' }) => {
    const [showPassword, setShowPassword] = useState(false);
    const { login, register } = useContext(AuthContext);

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    const initialValues = {
        email: initialEmail,
        password: '',
        name: isLogin ? '' : '',
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string().required('Password is required'),
        name: !isLogin ? Yup.string().required('Name is required') : Yup.string(),
    });

    const handleSubmit = (values, { setSubmitting, setErrors }) => {
        if (isLogin) {
            try {
                login(values.email, values.password);
                setSubmitting(false);
            } catch (err) {
                setErrors({ password: err.message });
                setSubmitting(false);
            }
        } else {
            register(values.name, values.email, values.password);
            setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ setFieldValue, values, isSubmitting }) => (
                <Form className="space-y-4">
                    {!isLogin && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <Field
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                className="w-full px-4 py-2 border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <ErrorMessage
                                name="name"
                                component="p"
                                className="text-red-500 text-sm"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <Field
                            type="email"
                            name="email"
                            placeholder="email@example.com"
                            className="w-full px-4 py-2 border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <ErrorMessage
                            name="email"
                            component="p"
                            className="text-red-500 text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="relative">
                            <Field
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="••••••••"
                                className="w-full px-4 py-2 border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                            >
                                {showPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                            </button>
                        </div>
                        <ErrorMessage
                            name="password"
                            component="p"
                            className="text-red-500 text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        {isLogin ? 'Log In' : 'Sign Up'}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default AuthForm;
