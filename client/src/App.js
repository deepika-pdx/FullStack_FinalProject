/** @format */
import "./App.css";
import { SplitPane } from "react-multi-split-pane";
import TopBar from "./components/TopBar";
import BottomBar from "./components/BottomBar";
import LeftsideBar from "./components/LeftsideBar";
import Content from "./components/Content";
import RightsideBar from "./components/RightsideBar";

function App() {
  return (
    <div className="App">
      <SplitPane split="horizontal" minSize={50}>
        <TopBar />
        <SplitPane split="vertical">
          <LeftsideBar />
          <Content />
          <RightsideBar />
        </SplitPane>
        <BottomBar />
      </SplitPane>
    </div>
  );
}

export default App;
