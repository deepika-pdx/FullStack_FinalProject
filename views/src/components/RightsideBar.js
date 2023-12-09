/** @format */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/RightsideBar.css';
import NearbyEvents from './NearbyEvents';
import { SplitPane } from 'react-multi-split-pane';

//This component displays a random thought and the NearByEvent in the right side of the screen.

function RightsideBar() {
  const [simpleThought, setSimpleThought] = useState('');
  const fetchThoughtData = async () => {
    const thoughtResult = await axios.get('/thoughts');
    const thoughtId = Math.floor(Math.random() * 10);
    setSimpleThought(thoughtResult.data[thoughtId].thought);
  };

  useEffect(() => {
    // Fetch thoughts from DailyDiaryDatabase
    try {
      fetchThoughtData();
    } catch (err) {
      console.log(err);
    }
  }, []);


  return (
    <SplitPane split="horizontal" defaultSizes={[150, 330]}>
      <div className="thoughtBgClass">
        <p className="thoughtClass">{simpleThought}</p>
      </div>
      <NearbyEvents></NearbyEvents>
    </SplitPane>
  );
}
export default RightsideBar;
