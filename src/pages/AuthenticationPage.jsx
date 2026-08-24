import React, { useState } from "react";

import "./AuthenticationPage.css";
import loginHero from "../assets/mstr-ledger-login-hero.png";
import { Outlet } from "react-router-dom";
import ToastNotification from "../components/common/ToastNotification";

const AuthenticationPage = () => {
  return (
    <div className="login-page">

      {/* LEFT PANEL */}
      <section className="login-hero">
        <img
          src={loginHero}
          alt="Mstr-Ledger"
          className="login-hero-image"
        />
      </section>

      {/* RIGHT PANEL */}
      <Outlet />
    </div>
    
  );
};

export default AuthenticationPage;