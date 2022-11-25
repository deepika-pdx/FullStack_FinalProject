/** @format */
import "./App.css";
import { SplitPane } from "react-multi-split-pane";
import TopBar from "./components/TopBar";
import LeftsideBar from "./components/LeftsideBar";
import Content from "./components/Content";
import RightsideBar from "./components/RightsideBar";
import Exercise from "./components/Exercise";
import WaterReminder from "./components/WaterReminder";
import FunActivities from "./components/FunActivities";

function App() {
  return (
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
          <WaterReminder />
          <FunActivities />
        </SplitPane>
      </SplitPane>
    </div>
  );
}

export default App;
