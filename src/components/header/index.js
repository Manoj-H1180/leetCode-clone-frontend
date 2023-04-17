import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import "./index.css";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const Header = ({ question }) => {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState("");

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("generalId");
    window.location.href = "/login";
  };

  useEffect(() => {
    async function fetchData() {
      const id = Cookies.get("generalId");
      const api = `https://leetcode-clone.vercel.app/users/${id}`;
      const options = {
        method: "GET",
      };
      const res = await fetch(api, options);
      const data = await res.json();
      setUserData(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <header>
        <div className="header">
          <div>
            <img
              alt="website logo"
              className="logo"
              src="https://res.cloudinary.com/dy1lfg1dp/image/upload/v1680967527/ddd_jwb238.png"
            />
          </div>
          {question && (
            <div className="logoutBtnContainer">
              <Link to="/dashboard" className="link">
                <li className="nav-list">Dashboard</li>
              </Link>
              {userData.role === "Admin" && (
                <Link to="/admin/add-question" className="link">
                  <li className="nav-list">Add Questions</li>
                </Link>
              )}
              {userData.role === "Admin" && (
                <Link to="/admin/users" className="link">
                  <li className="nav-list">Users</li>
                </Link>
              )}
              <button
                type="button"
                className="logoutBtn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
          <div className={question ? "hidden" : "show"}>
            <CgProfile
              className="profile-icon"
              onClick={() => setOpen(!open)}
            />
          </div>
        </div>
        <div className="pLists">
          {open && (
            <div className="profile-list">
              {userData.role === "Admin" && (
                <Link to="/admin/add-question" className="link">
                  <li className="nav-list">Add Questions</li>
                </Link>
              )}
              {userData.role === "Admin" && (
                <Link to="/dashboard" className="link">
                  <li className="nav-list">Dashboard</li>
                </Link>
              )}
              {userData.role === "Admin" && (
                <Link to="/admin/users" className="link">
                  <li className="nav-list">Users</li>
                </Link>
              )}

              <li className="nav-list" onClick={handleLogout}>
                Logout
              </li>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
