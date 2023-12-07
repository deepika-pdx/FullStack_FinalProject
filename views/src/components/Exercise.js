/** @format */

import React, { useState } from 'react';
import armExercise1 from '../images/Exercise/arm_exercise_1.png';
import armExercise2 from '../images/Exercise/arm_exercise_2.png';
import armExercise3 from '../images/Exercise/arm_exercise_3.png';
import legExercise1 from '../images/Exercise/leg_exercise_1.gif';
import legExercise2 from '../images/Exercise/leg_exercise_2.gif';
import fullbodyExercise1 from '../images/Exercise/fullbody_exercise_1.jfif';
import fullbodyExercise2 from '../images/Exercise/fullbody_exercise_2.jfif';
import headExercise from '../images/Exercise/head_exercise.png';
import '../styles/Exercise.css';

function Exercise() {
  const [index, setIndex] = useState(0);

  function handlePreviousExercise() {
    try {
      if (index === 0) {
        setIndex(7);
      } else {
        setIndex(index - 1);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function handleNextExercise() {
    try {
      if (index === 7) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="mainExerciseClass">
      <div className="exerciseHeading">
        <h3>Exercises</h3>
      </div>
      <div className="exerciseImageClass">
        <div className="exerciseChangeClass">
          <button
            onClick={handlePreviousExercise}
            className="exercisePrevButtonClass"
          >
            Previous
          </button>
        </div>
        {index === 0 && (
          <img
            src={headExercise}
            alt="Head exercise"
            width="200"
            height="150"
          />
        )}
        {index === 1 && (
          <img
            src={armExercise1}
            alt="Arm exercise 1"
            width="200"
            height="150"
          />
        )}
        {index === 2 && (
          <img
            src={armExercise2}
            alt="Arm exercise 2"
            width="200"
            height="150"
          />
        )}
        {index === 3 && (
          <img
            src={armExercise3}
            alt="Arm exercise 3"
            width="200"
            height="150"
          />
        )}
        {index === 4 && (
          <img
            src={legExercise1}
            alt="Leg exercise 1"
            width="200"
            height="150"
          />
        )}
        {index === 5 && (
          <img
            src={legExercise2}
            alt="Leg exercise 2"
            width="200"
            height="150"
          />
        )}
        {index === 6 && (
          <img
            src={fullbodyExercise1}
            alt="Full body exercise 1"
            width="200"
            height="150"
          />
        )}
        {index === 7 && (
          <img
            src={fullbodyExercise2}
            alt="Full body exercise 2"
            width="200"
            height="150"
          />
        )}
        <div className="exerciseChangeClass">
          <button
            onClick={handleNextExercise}
            className="exerciseNextButtonClass"
          >
            Next
          </button>
        </div>
      </div>
      <div className="exerciseTextDiv">
        {index === 0 && <p className="exerciseTextClass">Head exercise</p>}
        {index === 1 && <p className="exerciseTextClass">Arm exercise 1</p>}
        {index === 2 && <p className="exerciseTextClass">Arm exercise 2</p>}
        {index === 3 && <p className="exerciseTextClass">Arm exercise 3</p>}
        {index === 4 && <p className="exerciseTextClass">Leg exercise 1</p>}
        {index === 5 && <p className="exerciseTextClass">Leg exercise 2</p>}
        {index === 6 && (
          <p className="exerciseTextClass">Full body exercise 1</p>
        )}
        {index === 7 && (
          <p className="exerciseTextClass">Full body exercise 2</p>
        )}
      </div>
    </div>
  );
}

export default Exercise;
