import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = () => {

    const {
        isAuthenticated,
        loading
    } = useSelector(
        (state) => state.auth
    );

    if (loading) {
        return (
            <div className="authentication-loading">
                <p>Loading...</p>
            </div>
        );
    }

    if (isAuthenticated) {
        return (
            <Navigate
                to="/mstr-ledger"
                replace
            />
        );
    }

    return <Outlet />;
};

export default PublicRoute;