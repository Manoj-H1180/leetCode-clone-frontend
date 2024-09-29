import React from "react";
import { AiOutlineCopyright } from "react-icons/ai";
import "./index.css";

const Footer = () => {
  const date = new Date(
  return (
    <div className="footer-container">
      <p className="footer-text">
        <AiOutlineCopyright />
    {`${date.getFullYear() CodeHero, All Rights Reserved}`}
      </p>
    </div>
  );
};

export default Footer;
