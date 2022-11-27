/** @format */
import "./App.css";
import { useEffect } from "react";
import { SplitPane } from "react-multi-split-pane";
import TopBar from "./components/TopBar";
import BottomBar from "./components/BottomBar";
import LeftsideBar from "./components/LeftsideBar";
import Content from "./components/Content";
import RightsideBar from "./components/RightsideBar";
import Exercise from "./components/Exercise";
import FunActivities from "./components/FunActivities";
import WaterTracker from "./components/WaterTracker";
import full_glass_icon from "../src/images/WaterTracker/full_glass_icon.svg";
import leg_exercise_1 from "../src/images/Exercise/leg_exercise_1.gif";

import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Main from "./components/Main";

function App() {
  const user = localStorage.getItem("token");
  const waterTimeInterval = 60000;
  const exerciseTimeInterval = 60000 * 2;
  const waterReminderText = "Hey there!! Please drink enough water!";
  const exerciseReminderText = "Hey there!! Try some relaxing exercises!";

  useEffect(() => {
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else {
      Notification.requestPermission();
    }

    const waterInterval = setInterval(() => {
      console.log("In water notification");
      const waterOptions = {
        body: waterReminderText,
        icon: full_glass_icon,
      };
      new Notification("Water Reminder", waterOptions);
    }, waterTimeInterval);

    const exerciseInterval = setInterval(() => {
      console.log("In exercisenotification");
      const exerciseOptions = {
        body: exerciseReminderText,
        icon: leg_exercise_1,
      };
      new Notification("Exercise Reminder", exerciseOptions);
    }, exerciseTimeInterval);

    return () => {
      clearInterval(waterInterval);
      clearInterval(exerciseInterval);
    };
  }, []);

  return (
    <React.Fragment>
      <div className="App">
        <SplitPane split="horizontal">
          <TopBar />
          <SplitPane split="vertical" className="splitPaneClass">
            <LeftsideBar />
            <Content />
            <RightsideBar />
          </SplitPane>
          <SplitPane split="vertical" className="splitPaneClass">
            <Exercise />
            <WaterTracker />
            <FunActivities />
          </SplitPane>
        </SplitPane>
      </div>
      <Routes>
        {user && <Route path="/" exact element={<Login />} />}
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/" element={<Navigate replace to="/Main" />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
