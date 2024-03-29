/** @format */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import waterImage from '../images/WaterTracker/water_icon.png';
import emptyGlassIcon from '../images/WaterTracker/empty_glass_icon.svg';
import fullGlassIcon from '../images/WaterTracker/full_glass_icon.svg';
import '../styles/WaterTracker.css';
import Popup from 'reactjs-popup';

//This component tracks the amount of water you drink in a day.

function WaterTracker() {
  const [emptyGlassCount, setEmptyGlassCount] = useState(8);
  const [emptyGlassArray, setEmptyGlassArray] = useState([]);

  const [fullGlassCount, setFullGlassCount] = useState(0);
  const [fullGlassArray, setfullGlassArray] = useState([]);
  const [glassLimitReached, setGlassLimitReached] = useState(false);

  const updateWaterGlassCountData = async () => {
    const userEmail = localStorage.getItem('email');
    const reqUserData = {
      email: userEmail,
      waterGlassCount: fullGlassCount + 1,
    };
    const glassCountResult = await axios.post(
      '/updateWaterGlassCount',
      reqUserData
    );
    if (glassCountResult === null || glassCountResult.status !== 200) {
      console.log('Error updating water tracker details..!!');
    }
  };

  useEffect(() => {
    const fetchWaterGlassCountData = async () => {
      try {
        console.log('In fetch');
        const userEmail = localStorage.getItem('email');
        const reqUserData = { email: userEmail };
        const glassCountResult = await axios.post(
          '/fetchWaterGlassCount',
          reqUserData
        );
        if (glassCountResult !== null && glassCountResult.status === 200) {
          const fullCount = glassCountResult.data.waterGlassCount;
          const emptyCount = 8 - glassCountResult.data.waterGlassCount;
          setFullGlassCount(fullCount);
          setEmptyGlassCount(emptyCount);

          let empGlassesArray = [];
          for (let m = 1; m <= emptyCount; m++) {
            empGlassesArray.push(m);
          }
          setEmptyGlassArray(empGlassesArray);

          let fulGlassesArray = [];
          for (let n = 1; n <= fullCount; n++) {
            fulGlassesArray.push(n);
          }
          setfullGlassArray(fulGlassesArray);
        } else {
          console.log('Error fetching water tracker details..!!');
        }
      } catch (err) {
        console.log(`Error in fetchWaterGlassCountData ${err}`);
      }
    };

    fetchWaterGlassCountData();
  }, []);

  /*After you drink a glass of water and update it using the drankwater button, 
  one of the displayed empty glass is filled.*/

  function drankWater() {
    try {
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

      if (fullGlassCount === 7 || emptyGlassCount === 0) {
        setGlassLimitReached(true);
      }

      updateWaterGlassCountData();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="waterTrackerClass">
      <div className="waterTrackerHeading">
        <h3>
          Water Tracker&nbsp;&nbsp;
          <img src={waterImage} alt="water icon" width="30" height="30"></img>
        </h3>
      </div>
      <div className="waterClass">
        Did you drink enough water today?&nbsp;&nbsp;
        {fullGlassArray.map((j) => {
          return (
            <img
              key={j}
              src={fullGlassIcon}
              alt="full glass icon"
              width="30"
              height="30"
            ></img>
          );
        })}
        {emptyGlassArray.map((k) => {
          return (
            <img
              key={k}
              src={emptyGlassIcon}
              alt="empty glass icon"
              width="30"
              height="30"
            ></img>
          );
        })}
      </div>
      <div className="waterButtonAndPopup">
        {glassLimitReached && (
          <Popup
            trigger={
              <button className="waterButtonClass">
                Yes, I just had a glass of water.
              </button>
            }
            position="top center"
          >
            <div className="waterPopupClass">
              You are on the way to better health. Keep it up!!
            </div>
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

export default WaterTracker;
