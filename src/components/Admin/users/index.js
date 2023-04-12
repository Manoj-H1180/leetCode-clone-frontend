import React, { useEffect, useState } from "react";
import Header from "../../header";
import "./index.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      const api = "https://leetcode-backend-nvic.onrender.com/users";
      const options = {
        method: "GET",
      };
      const res = await fetch(api, options);
      const data = await res.json();
      setUsers(data);
    }
    fetchUsers();
  }, []);

  const handleUserId = (value) => {
    setUserId(value);
  };

  const handleDelete = async () => {
    const api = `https://leetcode-backend-nvic.onrender.com/users/${userId}`;
    const options = {
      method: "DELETE",
    };
    const res = await fetch(api, options);
    if (res.ok) {
      setUsers(users.filter((user) => user._id !== userId));
      setUserId("");
    }
  };

  return (
    <div className="uContainer">
      <Header />
      <div className="users-container">
        {users.map((e) => {
          return (
            <div key={e._id} className="users-row">
              <li>{e.email}</li>
              <p>{e.role}</p>
              <button
                className={
                  e.role === "Admin" ? "disabled-remove-btn " : "remove-btn"
                }
                type="button"
                onClick={() => handleUserId(e._id)}
                disabled={e.role === "Admin"}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
      {userId && (
        <div className="confirmationContainer">
          <p>Are you sure you want to remove this user?</p>
          <div className="confirmBtns">
            <button
              type="button"
              className="confirmBtnYes"
              onClick={handleDelete}
            >
              Yes
            </button>
            <button
              type="button"
              className="confirmBtnNo"
              onClick={() => setUserId("")}
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
