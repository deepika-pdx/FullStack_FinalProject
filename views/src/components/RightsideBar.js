/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/RightsideBar.css";
import { SplitPane } from "react-multi-split-pane";

function RightsideBar() {
  const [simpleThought, setSimpleThought] = useState("");

  const fetchThoughtData = async () => {
    const thoughtResult = await axios.get("/thoughts");
    const thoughtId = Math.floor(Math.random() * 10);
    setSimpleThought(thoughtResult.data[thoughtId].thought);
  };

  useEffect(() => {
    // Fetch thoughts from DailyDiaryDatabase
    fetchThoughtData();
  }, []);

  return (
    <SplitPane split="horizontal" defaultSizes={[150, 330]}>
      <div className="thoughtBgClass">
        <p className="thoughtClass">{simpleThought}</p>
      </div>
      <div>Add event data here</div>
    </SplitPane>
  );
}

export default RightsideBar;
