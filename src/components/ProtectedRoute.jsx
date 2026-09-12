import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import DefaultSpinner from "./spinners/DefaultSpinner";


const ProtectedRoute = () => {

    const {
        isAuthenticated,
        loading
    } = useSelector(
        (state) => state.auth
    );

    const location = useLocation();


    // Authentication is still being checked
    if (loading) {

        return (
            <div className="authentication-loading">
                <DefaultSpinner size={56} />
            </div>
        );

    }


    // User is not authenticated
    if (!isAuthenticated) {

        return (
            <Navigate
                to="/login"
                replace
                state={{
                    from: location
                }}
            />
        );

    }


    // User is authenticated
    return <Outlet />;
};


export default ProtectedRoute;