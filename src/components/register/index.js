import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineLoading } from "react-icons/ai";
import "./index.css";
import Footer from "../footer";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onRegisterSuccessful = (successMsg) => {
    window.location.href = "/dashboard";
    alert(successMsg);
    setIsLoading(false);
  };

  const onRegisterFailure = (message) => {
    alert(message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const apiUrl = "https://leetcode-clone.vercel.app/signup";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullName, email, password, role: "user" }),
    };
    const res = await fetch(apiUrl, options);
    const data = await res.json();
    if (res.ok) {
      onRegisterSuccessful(data.message);
    } else {
      onRegisterFailure(data.message);
    }
  };
  return (
    <div className="r-container">
      <div className="form-container">
        <h1 className="r-heading">Create an Account</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="fullName-container">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter Your FullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="email-container">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="password-container">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Enter Your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="r-btn-container">
            <button disabled={isLoading} type="submit" className="r-btn">
              {isLoading ? <AiOutlineLoading className="loader" /> : "Sign In"}
            </button>
          </div>
        </form>
        <div className="already-a-user-container">
          <p>
            Already a user?{" "}
            <Link to="/login" className="link">
              Log in
            </Link>
          </p>
        </div>
      </div>
      <div className="r-footer">
        <Footer />
      </div>
    </div>
  );
};

export default Register;
