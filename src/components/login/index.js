import React, { useState } from "react";
import Cookies from "js-cookie";
import Footer from "../footer/";
import { Link } from "react-router-dom";

import "./index.css";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const onLoginSuccess = (token, data) => {
    Cookies.set("token", token, { expires: 30 });
    Cookies.set("generalId", data.id, { expires: 30 });
    window.location.href = "/dashboard";
  };

  const onLoginFailure = (msg) => {
    alert(msg);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const api = "https://leetcode-clone.vercel.app/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: userEmail, password: userPassword }),
    };
    const res = await fetch(api, options);
    const data = await res.json();
    console.log(res);
    if (res.ok) {
      onLoginSuccess(data.token, data);
    } else {
      onLoginFailure(data.message);
    }
  };

  const handleRedirect = () => {
    const token = Cookies.get("token");
    if (token !== undefined) {
      window.location.href = "/dashboard";
    }
  };

  handleRedirect();

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1 className="login-form-heading">Sign In</h1>
        <form className="login-form" onSubmit={handleLoginSubmit}>
          <div className="login-email-container">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Your Email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
          <div className="login-password-container">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              placeholder="Enter Your Password"
            />
          </div>
          <div className="login-btn-container">
            <button type="submit" className="login-btn">
              Sign In
            </button>
          </div>
        </form>
        <div className="textContainer">
          <p className="footer-text">
            Don't have an account{" "}
            <Link to="/sign-up" className="s-link">
              Click here
            </Link>
          </p>
        </div>
      </div>
      <div className="footer-section">
        <div>
          <Footer />
        </div>
        <ul className="footer-list">
          <li className="list">Terms</li>
          <li className="list">Privacy</li>
          <li className="list">Security</li>
          <li className="list">Get in Touch</li>
        </ul>
      </div>
    </div>
  );
};

export default Login;
