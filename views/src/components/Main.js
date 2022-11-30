/** @format */

import "../styles/Main.css";
import axios from "axios";
import { useEffect } from "react";
import { SplitPane } from "react-multi-split-pane";
import TopBar from "./TopBar";
import LeftsideBar from "./LeftsideBar";
import EventBar from "./NewsBar";
import RightsideBar from "./RightsideBar";
import Exercise from "./Exercise";
import FunActivities from "./FunActivities";
import WaterTracker from "./WaterTracker";
import full_glass_icon from "../images/WaterTracker/full_glass_icon.svg";
import leg_exercise_1 from "../images/Exercise/leg_exercise_1.gif";

function Main() {
  const resetWaterTracker = async (currTimeObj) => {
    const resetResult = await axios.post("http://localhost:3001/resetWaterGlassCount", currTimeObj);
    if (resetResult === null && resetResult.status !== 200) {
      console.log("Error resetting water tracker..!!");
    }
  };
  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    const currentTime = new Date().toLocaleString();
    if (currentTime.includes("12:01")) {
      const timeObj = { email: userEmail, currentTimeObj: currentTime };
      resetWaterTracker(timeObj);
    }

    const waterTimeInterval = 60000 * 60;
    const exerciseTimeInterval = 60000 * 60 * 1.5;
    const waterReminderText = "Hey there!! Please drink enough water!";
    const exerciseReminderText = "Hey there!! Try some relaxing exercises!";

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
    <div className="App">
      <SplitPane split="horizontal" defaultSizes={[150, 450, 250]} primary="second">
        <TopBar />
        <SplitPane split="vertical" defaultSizes={[150, 230, 150]} className="splitPaneClass">
          <EventBar />
          <LeftsideBar />
          <RightsideBar />
        </SplitPane>
        <SplitPane split="vertical" className="splitPaneClass" defaultSizes={[150, 230, 150]}>
          <Exercise />
          <FunActivities />
          <WaterTracker />
        </SplitPane>
      </SplitPane>
    </div>
  );
}

export default Main;
