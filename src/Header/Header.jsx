import React, { useState } from "react";
import "./Header.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Header() {
  const [idxtoken, setIdxtoken] = useState("");

  const navigate = useNavigate();
  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    localStorage.removeItem("token");

    axios
      .get("http://localhost:5000/api/users/logout")
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout failed", error);
      });
  };

  // if (localStorage.getItem("token")) {
  //   const idxt = localStorage.getItem("idx");
  //   axios
  //     .get(`http://localhost:5000/api/users/getuser?id=${idxt}`)
  //     .then((response) => {
  //       console.log(response);
  //       setIdxtoken(response);
  //     })
  //     .catch((error) => {
  //       console.error("Logout failed", error);
  //     });
  // }
  return (
    <div className="header">
      <div className="left">
        <div className="profilePicture"></div>
        <div className="homeicon" onClick={() => navigate("/")}>
          Home
        </div>
      </div>
      {localStorage.getItem("token") ? (
        <div className="buttons">
          <button onClick={handleLogout} className="btn2">
            Logout
          </button>
        </div>
      ) : (
        <div className="buttons">
          <button onClick={() => navigate("/registration")} className="btn1">
            Sign Up
          </button>
          <button onClick={() => navigate("/login")} className="btn2">
            Login
          </button>
        </div>
      )}
    </div>
  );
}
