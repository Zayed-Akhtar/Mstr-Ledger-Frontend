import React, { useState } from 'react'
import {
    MdEmail,
    MdLockOutline,
    MdVisibility,
    MdVisibilityOff,
} from "react-icons/md";
import { useDispatch } from 'react-redux';
import { showToast } from '../features/toast/toastSlice';
import { setCredentials } from '../store/authSlice';
import { NavLink, useLocation, useNavigate } from "react-router-dom";

export const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const serverEndpoint = import.meta.env.VITE_SERVER_ENDPOINT;

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (loading) return;

        try {

            setLoading(true);

            const response = await fetch(
                `${serverEndpoint}/auth/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    credentials: "include",

                    body: JSON.stringify({
                        email: formData.email.trim(),
                        password: formData.password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                dispatch(
                    showToast({
                        message:
                            data.message ||
                            "Invalid email or password.",
                        variant: "danger",
                    })
                );

                return;
            }


            // Store user in Redux
            dispatch(
                setCredentials(data.user)
            );


            // Show success message
            dispatch(
                showToast({
                    message: "Login successful.",
                    variant: "success",
                })
            );


            // Redirect to original destination
            const destination =
                location.state?.from?.pathname ||
                "/mstr-ledger";

            navigate(destination, {
                replace: true,
            });

        } catch (error) {

            console.error("Login error:", error);

            dispatch(
                showToast({
                    message:
                        "Unable to login. Please try again.",
                    variant: "danger",
                })
            );

        } finally {

            setLoading(false);

        }
    };
    return (
        <section className="login-form-section">
            <div className="login-card">
                <div className="login-logo">
                    <div className="login-logo-icon">
                        <span>▤</span>
                    </div>

                    <div className="login-logo-text">
                        <span className="logo-dark">Mstr-</span>
                        <span className="logo-green">Ledger</span>
                    </div>
                </div>
                {/* Heading */}
                <div className="login-heading">
                    <h1>Welcome Back!</h1>

                    <p>
                        Login to continue to{" "}
                        <span>Mstr-Ledger</span>
                    </p>
                </div>
                <form onSubmit={handleSubmit}>

                    {/* Email */}
                    <div className="form-group">
                        <label htmlFor="email">
                            Email Address
                        </label>

                        <div className="input-wrapper">
                            <MdEmail className="input-icon" />

                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="form-group password-group">
                        <label htmlFor="password">
                            Password
                        </label>

                        <div className="input-wrapper">
                            <MdLockOutline className="input-icon" />

                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowPassword((prev) => !prev)
                                }
                            >
                                {showPassword ? (
                                    <MdVisibility />
                                ) : (
                                    <MdVisibilityOff />
                                )}
                            </button>
                        </div>

                        <div className="forgot-password">
                            <button type="button">
                                Forgot Password?
                            </button>
                        </div>
                    </div>

                    {/* Login */}
                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span
                                    className="spinner-border spinner-border-sm"
                                    role="status"
                                    aria-hidden="true"
                                />

                                <span>Logging in...</span>
                            </>
                        ) : (
                            <>
                                <MdLockOutline />

                                <span>Login</span>
                            </>
                        )}
                    </button>

                </form>
                <div className="divider">
                    <span></span>
                    <p>or</p>
                    <span></span>
                </div>

                {/* Signup */}
                <div className="signup-text">
                    <span>Don’t have an account?</span>

                    <NavLink to="/signup">
                        Sign up
                    </NavLink>
                </div>
            </div>
        </section>
    )
}

