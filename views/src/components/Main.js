import "../styles/Main.css";
import { SplitPane } from "react-multi-split-pane";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import LeftsideBar from "./LeftsideBar";
import RightsideBar from "./RightsideBar";
import React, { useState } from "react";

function Main() {
  const [updateContent, setUpdateContent] = useState(false);
  return (
    <div className="Main">
      <SplitPane split="horizontal" minSize={50}>
        <TopBar />
        <SplitPane split="vertical">
          <LeftsideBar sendmainstate={setUpdateContent} />
          <RightsideBar />
        </SplitPane>
        <BottomBar />
      </SplitPane>
    </div>
  );
}

export default Main;