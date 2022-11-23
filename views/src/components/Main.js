import "../styles/Main.css";
import { SplitPane } from "react-multi-split-pane";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import LeftsideBar from "./LeftsideBar";
import Content from "./Content";
import RightsideBar from "./RightsideBar";

function Main() {
  return (
    <div className="Main">
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

export default Main;