import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import DefaultSpinner from "./spinners/DefaultSpinner";

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
                <DefaultSpinner size={56} />
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