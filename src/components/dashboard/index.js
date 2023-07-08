import React, { useEffect, useState, CSSProperties } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import Header from "../header";
import "./index.css";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import Pagination from "../Pagination/pagination.js";
import toast, { Toaster } from "react-hot-toast";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Dashboard = () => {
  let [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [uId, setUId] = useState("");

  useEffect(() => {
    async function fetchUserDetails() {
      const id = Cookies.get("generalId");
      axios
        .get(`https://leetcode-clone.vercel.app/users/${id}`)
        .then(({ data }) => setUId(data));
    }
    fetchUserDetails();
  }, []);

  useEffect(() => {
    async function fetchQuestions() {
      const { data } = await axios.get(
        "https://leetcode-clone.vercel.app/questions"
      );
      setQuestions(data);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
    fetchQuestions();
  }, []);

  const handleRemoveQuestions = async (id) => {
    await axios
      .delete(`https://leetcode-clone.vercel.app/questions/${id}`)
      .then(
        () => toast.success("Problem Removed"),
        setQuestions(questions.filter((q) => q.id !== id))
      )
      .catch((error) => toast.error(error.message));
  };

  const lastPostIndex = currentPage * postsPerPage;
  const firstPageIndex = lastPostIndex - postsPerPage;
  const questionsData = questions.slice(firstPageIndex, lastPostIndex);

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
              {questionsData?.map((q) => {
                return (
                  <div key={q.id} className="questionsContainer">
                    <div>
                      <h1>{q.title}</h1>
                      <p>{q.description}</p>
                    </div>
                    <div>
                      {uId.role === "Admin" ? (
                        <div className="d-btn-container">
                          <button
                            type="button"
                            className="qRemoveBtn"
                            onClick={() => handleRemoveQuestions(q.id)}
                          >
                            Remove
                          </button>
                          <button type="button" className="qRemoveBtn">
                            <Link className="q-link" to={`/problems/${q.id}`}>
                              Solve
                            </Link>
                          </button>
                        </div>
                      ) : (
                        <button type="button" className="qRemoveBtn">
                          <Link className="q-link" to={`/problems/${q.id}`}>
                            Solve Problem
                          </Link>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </ul>
          </div>
          <Toaster />
          <Pagination
            totalPosts={questions.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            setPostsPerPage={setPostsPerPage}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
