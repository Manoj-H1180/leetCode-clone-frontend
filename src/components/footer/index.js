import React from "react";
import { AiOutlineCopyright } from "react-icons/ai";
import "./index.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <p className="footer-text">
        <AiOutlineCopyright />
        2023 CodeHero, All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
