import React, { useState, CSSProperties, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";
import { TailSpin } from "react-loader-spinner";
import CodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { langs } from "@uiw/codemirror-extensions-langs";
import "./index.css";
import Header from "../../header";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Problem = () => {
  const [code, setCode] = useState(
    "console.log('Write Javascript language only') "
  );
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [testResults, setTestResults] = useState(null);
  const [loadBtn, setLoadBtn] = useState(false);

  const { id } = useParams();

  setTimeout(() => {
    setLoading(false);
  }, 2000);

  useEffect(() => {
    axios
      .get(`https://leetcode-backend-nvic.onrender.com/questions/${id}`)
      .then(({ data }) => setProblem(data))
      .catch(() => {
        setProblem("Something Went Wrong");
      });
  }, []);

  const runTests = async () => {
    const response = await axios.post(
      "https://leetcode-backend-nvic.onrender.com/question/submit",
      {
        problem: problem.problem,
        code,
      }
    );
    setTestResults(response.data.testResults);
    console.log(response.data.testResults);
    setLoadBtn(true);
    setTimeout(() => {
      setLoadBtn(false);
    }, 3000);
  };

  return (
    <div className="problem-container">
      <Header question />
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
          <div className="user-container">
            <select className="language-select">
              <option>Javascript</option>
            </select>
          </div>
          <div className="row">
            <div className="questions">
              <h1>{problem.title}</h1>
              <p>{problem.description}</p>
              <div>
                {problem.testCases.map((eachQuestion, index) => (
                  <div key={index} style={{ marginTop: "20px" }}>
                    <p className="example-title">Example {index + 1}:</p>
                    <div className="questionInputContainer">
                      <h3 className="input-title">
                        Input:{" "}
                        <span style={{ fontSize: "14px", color: "#9eb6c0" }}>
                          {eachQuestion.input[0]}
                        </span>
                      </h3>
                      <h3 className="input-title">
                        Output:{" "}
                        <span style={{ fontSize: "14px", color: "#9eb6c0" }}>
                          {eachQuestion.expectedOutput}
                        </span>
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="code-container">
              <CodeMirror
                value={code}
                height="430px"
                className="editor"
                theme={dracula}
                extensions={[langs.jsx()]}
                onChange={(value, viewUpdate) => {
                  setCode(value);
                }}
              />
              <div className="testRow">
                {testResults && (
                  <div>
                    <h3>Test Results:</h3>
                    <ul className="testResultContainer">
                      {testResults.map((result) => (
                        <li key={result.input} className="testResult">
                          <div>Input: {JSON.stringify(result.input)}</div>
                          <div>
                            Expected Output:{" "}
                            {JSON.stringify(result.expectedOutput)}
                          </div>
                          <div>
                            Actual Output: {JSON.stringify(result.actualOutput)}
                          </div>
                          <div
                            className={
                              result.expectedOutput === result.actualOutput
                                ? "pass"
                                : "fail"
                            }
                          >
                            Pass:{" "}
                            {JSON.stringify(
                              result.expectedOutput === result.actualOutput
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="btn-container">
                  {loadBtn ? (
                    <button className="progressContainer">
                      <TailSpin
                        height="20"
                        width="20"
                        color="#fff"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                      />
                    </button>
                  ) : (
                    <button className="submitBtn" onClick={runTests}>
                      Run
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Problem;

// import React, { useState } from "react";
// import axios from "axios";

// function App() {
//   const [problem, setProblem] = useState(null);
//   const [code, setCode] = useState("");
//   const [testResults, setTestResults] = useState(null);

//   // Fetch a random coding problem from the API
//   const fetchProblem = async () => {
//     const response = await axios.get("http://localhost:4000/random-problem");
//     setProblem(response.data);
//     setTestResults(null);
//   };

//   // Run the user's code against the test cases for the current problem
//   const runTests = async () => {
//     const response = await axios.post("http://localhost:4000/question/submit", {
//       problem: problem.problem,
//       code,
//     });
//     setTestResults(response.data.testResults);
//   };

//   return (
//     <div>
//       <h1>Coding Problem Tester</h1>
//       {problem ? (
//         <>
//           <h2>{problem.problem}</h2>
//           <button onClick={fetchProblem}>Get a new problem</button>
//           <textarea
//             value={code}
//             onChange={(e) => setCode(e.target.value)}
//           ></textarea>
//           <button onClick={runTests}>Run tests</button>
//
//
//
//         </>
//       ) : (
//         <button onClick={fetchProblem}>Get a random coding problem</button>
//       )}
//     </div>
//   );
// }

// export default App;