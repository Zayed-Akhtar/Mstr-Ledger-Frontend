import React, { useState } from "react";
import {
    MdEmail,
    MdLockOutline,
    MdPersonOutline,
    MdVisibility,
    MdVisibilityOff,
} from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showToast } from "../features/toast/toastSlice";

export const SignupForm = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const serverEndpoint = import.meta.env.VITE_SERVER_ENDPOINT;
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
    });

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


        if (formData.password !== formData.confirmPassword) {

            dispatch(
                showToast({
                    message: "Passwords do not match.",
                    variant: "danger",
                })
            );

            return;
        }


        try {

            setLoading(true);

            const response = await fetch(
                `${serverEndpoint}/auth/signup`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    credentials: "include",

                    body: JSON.stringify({
                        fullname: formData.fullname.trim(),
                        email: formData.email.trim(),
                        password: formData.password,
                        phoneNumber: formData.phoneNumber.trim(),
                    }),
                }
            );

            const data = await response.json();


            if (!response.ok) {

                dispatch(
                    showToast({
                        message:
                            data.message ||
                            "Unable to create account.",
                        variant: "danger",
                    })
                );

                return;
            }


            // Signup also authenticates the user
            dispatch(
                setCredentials(data.user)
            );


            dispatch(
                showToast({
                    message:
                        "Account created successfully.",
                    variant: "success",
                })
            );


            navigate("/mstr-ledger", {
                replace: true,
            });

        } catch (error) {

            console.error("Signup error:", error);

            dispatch(
                showToast({
                    message:
                        "Unable to create account. Please try again.",
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

                {/* Logo */}
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
                    <h1>Create Account</h1>

                    <p>
                        Get started with{" "}
                        <span>Mstr-Ledger</span>
                    </p>
                </div>

                <form onSubmit={handleSubmit}>

                    {/* Name */}
                    <div className="form-group">
                        <label htmlFor="fullname">
                            Full Name
                        </label>

                        <div className="input-wrapper">
                            <MdPersonOutline className="input-icon" />

                            <input
                                id="fullname"
                                type="text"
                                name="fullname"
                                placeholder="Enter your full name"
                                value={formData.fullname}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

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
                    <div className="form-group">
                        <label htmlFor="phoneNumber">
                            Phone Number
                        </label>

                        <div className="input-wrapper">
                            <FaPhone className="input-icon" />
                            <input
                                id="phoneNumber"
                                type="tel"
                                name="phoneNumber"
                                placeholder="Enter you phone #"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="form-group">
                        <label htmlFor="password">
                            Password
                        </label>

                        <div className="input-wrapper">
                            <MdLockOutline className="input-icon" />

                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Create a password"
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
                    </div>

                    {/* Confirm Password */}
                    <div className="form-group">
                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>

                        <div className="input-wrapper">
                            <MdLockOutline className="input-icon" />

                            <input
                                id="confirmPassword"
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        (prev) => !prev
                                    )
                                }
                            >
                                {showConfirmPassword ? (
                                    <MdVisibility />
                                ) : (
                                    <MdVisibilityOff />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Signup */}
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

                                <span>Creating Account...</span>
                            </>
                        ) : (
                            <>
                                <MdPersonOutline />

                                <span>Create Account</span>
                            </>
                        )}
                    </button>

                </form>

                {/* Divider */}
                <div className="divider">
                    <span></span>
                    <p>or</p>
                    <span></span>
                </div>

                {/* Login */}
                <div className="signup-text">
                    <span>Already have an account?</span>
                    <NavLink to="/login">
                        Login
                    </NavLink>
                </div>

            </div>
        </section>
    );
};