/** @format */

import axios from 'axios';
import { useEffect } from 'react';
import { SplitPane } from 'react-multi-split-pane';
import '../styles/Main.css';
import TopBar from './TopBar';
import TodoItems from './TodoItems';
import EventBar from './NewsBar';
import RightsideBar from './RightsideBar';
import NearbyEvents from './NearbyEvents';
import Exercise from './Exercise';
import FunActivities from './FunActivities';
import WaterTracker from './WaterTracker';
import fullGlassIcon from '../images/WaterTracker/full_glass_icon.svg';
import legExercise1 from '../images/Exercise/leg_exercise_1.gif';

function Main() {
  // Determine the device width for responsive design
  const deviceWidth = window.innerWidth;
  const mobileMaxWidth = 768;

  // Reset the water tracker count for a new day
  const resetWaterTracker = async (currTimeObj) => {
    const resetResult = await axios.post(
      'http://localhost:3001/resetWaterGlassCount',
      currTimeObj
    );
    if (resetResult === null && resetResult.status !== 200) {
      console.log('Error resetting water tracker..!!');
    }
  };

  useEffect(() => {
    const userEmail = localStorage.getItem('email');
    const currentTime = new Date().toLocaleString();

    // Reset water tracker at 12:01 AM daily
    if (currentTime.includes('12:01')) {
      const timeObj = { email: userEmail, currentTimeObj: currentTime };
      resetWaterTracker(timeObj);
    }

    // Set up intervals for water and exercise reminders
    const waterTimeInterval = 60000 * 60;
    const exerciseTimeInterval = 60000 * 60 * 2;
    const waterReminderText = 'Hey there!! Please drink enough water!';
    const exerciseReminderText = 'Hey there!! Try some relaxing exercises!';

    if (!('Notification' in window)) {
      console.log('This browser does not support desktop notification');
    } else {
      Notification.requestPermission();
    }

    const waterInterval = setInterval(() => {
      console.log('In water notification');
      const waterOptions = {
        body: waterReminderText,
        icon: fullGlassIcon,
      };
      new Notification('Water Reminder', waterOptions);
    }, waterTimeInterval);

    const exerciseInterval = setInterval(() => {
      console.log('In exercise notification');
      const exerciseOptions = {
        body: exerciseReminderText,
        icon: legExercise1,
      };
      new Notification('Exercise Reminder', exerciseOptions);
    }, exerciseTimeInterval);

    return () => {
      // Clear intervals when the component is unmounted
      clearInterval(waterInterval);
      clearInterval(exerciseInterval);
    };
  }, []);

  // Render different layouts based on device width

  return deviceWidth < mobileMaxWidth ? (
    <div className="Main">
      <SplitPane
        split="horizontal"
        defaultSizes={[150, 450, 250]}
        primary="second"
      >
        <TopBar />
        <TodoItems />
        <div className="sideActivities">
          <EventBar />
          <NearbyEvents />
          <Exercise />
          <FunActivities />
          <WaterTracker />
        </div>
        <div className="Mainfooter">
          <footer>
            Copyright &copy; @About:{' '}
            <a href="https://github.com/deepika-pdx">Deepika Velapure</a>&nbsp;
            &nbsp; <a href="https://github.com/vidyav2">Vidya Jayashankar</a>
            &nbsp; &nbsp;
            <a href="https://github.com/gaurikasar">Gauri Kasar</a>&nbsp; &nbsp;
          </footer>
        </div>
      </SplitPane>
    </div>
  ) : (
    <div className="Main">
      <SplitPane
        split="horizontal"
        defaultSizes={[150, 450, 250]}
        primary="second"
      >
        <TopBar />
        <SplitPane
          split="vertical"
          defaultSizes={[155, 230, 150]}
          className="splitPaneClass"
        >
          <EventBar />
          <TodoItems />
          <RightsideBar />
        </SplitPane>
        <SplitPane
          split="vertical"
          className="splitPaneClass"
          defaultSizes={[155, 230, 150]}
        >
          <Exercise />
          <FunActivities />
          <WaterTracker />
        </SplitPane>
        <div className="Mainfooter">
          <footer>
            Copyright &copy; @About:{' '}
            <a href="https://github.com/deepika-pdx">Deepika Velapure</a>&nbsp;
            &nbsp; <a href="https://github.com/vidyav2">Vidya Jayashankar</a>
            &nbsp; &nbsp;
            <a href="https://github.com/gaurikasar">Gauri Kasar</a>&nbsp; &nbsp;
          </footer>
        </div>
      </SplitPane>
    </div>
  );
}

export default Main;
