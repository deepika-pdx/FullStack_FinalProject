/** @format */

import React from "react";
import { useState } from "react";
import Login from "./Login";
import axios from "axios";
import Main from "./Main";
//import { render } from "react-dom";

function TopBar() {
  const [data, setData] = useState({ email: "", password: "" });
  //console.log(data);
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
    //console.log(data);
  };

  const user = localStorage.getItem("email");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location.reload();
    //<Redirect to = "/login" ></Redirect>;
  };

  return (
    <div className="main_container">
      <nav className="navbar">
        <div>
          <h1>Logged In User : {user}</h1>
        </div>
        <span>
          <button className="white_btn1" onClick={handleLogout}>
            Logout
          </button>
        </span>
      </nav>
    </div>
  );
}

export default TopBar;
