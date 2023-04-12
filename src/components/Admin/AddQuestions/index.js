import React, { useState } from "react";
import Header from "../../header";
import "./index.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddQuestions = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [popup, setPopUp] = useState("");
  const notify = () => toast(popup);

  const handleAddQuestion = (e) => {
    e.preventDefault();
    const questionDetails = { title, description, input, output };
    if (title === "" || description === "" || input === "" || output === "")
      return setPopUp("Please Add All The Fields");
    axios
      .post("http://localhost:4000/admin/questions", questionDetails)
      .then(() => setPopUp("Question Added Successfully"))
      .catch(() => setPopUp("Error Adding Question"));

    setTitle("");
    setDescription("");
    setInput("");
    setOutput("");
  };

  return (
    <div className="qContainer">
      <Header />
      <div className="form-container">
        <form className="questionsAddForm" onSubmit={handleAddQuestion}>
          <div className="input-container">
            <label htmlFor="title">Title</label>
            <input
              className="input"
              id="title"
              value={title}
              placeholder="Enter Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label htmlFor="description">Description</label>
            <textarea
              className="textArea-input"
              id="description"
              value={description}
              placeholder="Enter Description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label htmlFor="input">Input</label>
            <input
              className="input"
              id="input"
              value={input}
              placeholder="Enter Input"
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label htmlFor="output">Output</label>
            <input
              className="input"
              id="output"
              value={output}
              placeholder="Enter Output"
              onChange={(e) => setOutput(e.target.value)}
            />
          </div>
          <div>
            <button type="submit" className="addQuestionBtn" onClick={notify}>
              Add Question
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AddQuestions;
