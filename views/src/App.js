//import "./App.css";
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Main from "./components/Main";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
	const user = localStorage.getItem("token");
    
    const [data, setData] = useState(0);

    const getUser = async () => {
		try {
			const url = "http://localhost:3003/auth";
			const { data } = await axios.get(url, { withCredentials: true });
			setData(data.user._json);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	return (
		<Routes>
            <Route
					exact path="/" element={user ? <Main user={user} /> : <Navigate to="/login" />}
				/>
				<Route
					exact path="/login" element={user ? <Navigate to="/" /> : <Login />}
				/>
				<Route
					path="/signup" element={user ? <Navigate to="/" /> : <Signup />}
				/>
        </Routes>
		
	);
}

export default App;