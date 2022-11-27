/** @format */

import React from "react";
import {redirect as Redirect} from "react-router-dom";

const TopBar = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		<Redirect to = "/login" ></Redirect>;
	};
  return (
    <div className="main_container">
			<nav className="navbar">
				<h1> Hi.. this is the topbar</h1>
				<button className="white_btn1" onClick={handleLogout}>
					Logout
				</button>
			</nav>
		</div>
  );
}

export default TopBar;
