import { Component } from "react";
import Cookies from "js-cookie";
import "./index.css";

export default class Home extends Component {
  render() {
    const token = Cookies.get("token");
    if (token === undefined || token !== undefined) {
      window.location.href = "/login";
    }
    return (
      <div className="home-container">
        <div className="home">
          <h1>Hello</h1>
        </div>
      </div>
    );
  }
}
