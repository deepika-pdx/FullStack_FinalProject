/** @format */

import React, { useEffect, useState } from "react";
import water_image from "../images/WaterReminder/water_icon.png";
import empty_glass_icon from "../images/WaterReminder/empty_glass_icon.svg";
import full_glass_icon from "../images/WaterReminder/full_glass_icon.svg";
import "../styles/WaterReminder.css";
import Popup from "reactjs-popup";

function WaterReminder() {
  const [emptyGlassCount, setEmptyGlassCount] = useState(8);
  const [emptyGlassArray, setEmptyGlassArray] = useState([]);

  const [fullGlassCount, setFullGlassCount] = useState(0);
  const [fullGlassArray, setfullGlassArray] = useState([]);
  const [areMixedGlass, setAreMixedGlass] = useState(false);
  const [glassLimitReached, setGlassLimitReached] = useState(false);

  useEffect(() => {
    let empGlassesArray = [1, 2, 3, 4, 5, 6, 7, 8];
    setEmptyGlassArray(empGlassesArray);

    let fulGlassesArray = [];
    setfullGlassArray(fulGlassesArray);
  }, []);

  function drankWater() {
    setEmptyGlassCount(emptyGlassCount - 1);
    let empGlassesArray = [];
    for (let m = 1; m <= emptyGlassCount - 1; m++) {
      empGlassesArray.push(m);
    }
    setEmptyGlassArray(empGlassesArray);

    setFullGlassCount(fullGlassCount + 1);
    let fulGlassesArray = [];
    for (let n = 1; n <= fullGlassCount + 1; n++) {
      fulGlassesArray.push(n);
    }
    setfullGlassArray(fulGlassesArray);

    if (fullGlassCount === 7) {
      setGlassLimitReached(true);
    }

    setAreMixedGlass(true);
  }

  return (
    <div className="waterReminderClass">
      <div className="waterReminderHeading">
        <h3>
          Water Reminder&nbsp;&nbsp;
          <img src={water_image} alt="water icon" width="30" height="30"></img>
        </h3>
      </div>
      <div className="waterClass">
        Did you drink enough water today?&nbsp;&nbsp;
        {!areMixedGlass &&
          emptyGlassArray.map((i) => {
            return <img src={empty_glass_icon} alt="empty glass icon" width="30" height="30"></img>;
          })}
        {areMixedGlass &&
          fullGlassArray.map((j) => {
            return <img src={full_glass_icon} alt="full glass icon" width="30" height="30"></img>;
          })}
        {areMixedGlass &&
          emptyGlassArray.map((k) => {
            return <img src={empty_glass_icon} alt="empty glass icon" width="30" height="30"></img>;
          })}
      </div>
      <div>
        {glassLimitReached && (
          <Popup trigger={<button className="waterButtonClass">Yes, I just had a glass of water.</button>} position="top center">
            <div className="waterPopupClass">You are on the way to better health. Keep it up!!</div>
          </Popup>
        )}
        {!glassLimitReached && (
          <button onClick={drankWater} className="waterButtonClass">
            Yes, I just had a glass of water.
          </button>
        )}
      </div>
    </div>
  );
}

export default WaterReminder;
