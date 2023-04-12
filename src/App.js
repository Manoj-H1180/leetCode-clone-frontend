import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./components/register";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import Home from "./components/home";
import Users from "./components/Admin/users";
import AddQuestions from "./components/Admin/AddQuestions";
import Problem from "./components/Admin/problem";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/sign-up" Component={Register} />
        <Route exact path="/login" Component={Login} />
        <Route exact path="/" Component={Home} />
        <Route exact path="/admin/users" Component={Users} />
        <Route exact path="/problems/:id" Component={Problem} />
        <Route exact path="/admin/add-question" Component={AddQuestions} />
        <Route exact path="/dashboard" Component={Dashboard} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
