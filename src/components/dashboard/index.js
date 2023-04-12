import React, { useEffect, useState, CSSProperties } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import Header from "../header";
import "./index.css";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Dashboard = () => {
  let [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [uId, setUId] = useState("");
  const notify = () => toast(() => "Question Deleted");

  useEffect(() => {
    async function fetchUserDetails() {
      const id = Cookies.get("generalId");
      axios
        .get(`https://leetcode-backend-nvic.onrender.com/users/${id}`)
        .then(({ data }) => setUId(data));
    }
    fetchUserDetails();
  }, []);

  useEffect(() => {
    async function fetchQuestions() {
      const { data } = await axios.get(
        "https://leetcode-backend-nvic.onrender.com/questions"
      );
      setQuestions(data);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
    fetchQuestions();
  }, []);

  const handleRemoveQuestions = async (id) => {
    await axios.delete(
      `https://leetcode-backend-nvic.onrender.com/questions/${id}`
    );
    setQuestions(questions.filter((q) => q._id !== id));
    notify();
  };

  return (
    <div className="dContainer">
      <Header />
      {loading ? (
        <div className="loaderContainer">
          <SyncLoader
            color={"white"}
            loading={loading}
            cssOverride={override}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <>
          <div className="dashboard-container">
            <ul>
              {questions.map((q) => (
                <div key={q.id} className="questionsContainer">
                  <div>
                    <h1>{q.title}</h1>
                    <p>{q.description}</p>
                  </div>
                  <div>
                    {uId.role === "Admin" ? (
                      <button
                        type="button"
                        className="qRemoveBtn"
                        onClick={() => handleRemoveQuestions(q._id)}
                      >
                        Remove
                      </button>
                    ) : (
                      <button type="button" className="qRemoveBtn">
                        <Link className="q-link" to={`/problems/${q.id}`}>
                          Solve Problem
                        </Link>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </ul>
          </div>
          <ToastContainer />
        </>
      )}
    </div>
  );
};

export default Dashboard;
