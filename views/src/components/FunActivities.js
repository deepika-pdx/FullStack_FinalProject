/** @format */

import React from "react";
import fun_icon from "../images/Fun_Activities/fun_icon.png";
import lets_paint_icon from "../images/Fun_Activities/lets_paint_icon.png";
import jigsaw_puzzle_icon from "../images/Fun_Activities/jigsaw_puzzle_icon.png";
import books_and_coffee_icon from "../images/Fun_Activities/books_and_coffee_icon.jfif";
import dance_icon from "../images/Fun_Activities/dance_icon.jpg";
import music_icon from "../images/Fun_Activities/music_icon.jfif";
import recipe_icon from "../images/Fun_Activities/recipe_icon.png";
import "../styles/FunActivities.css";

function FunActivities() {
  return (
    <div className="funActivitiesClass">
      <div className="funActivitiesHeading">
        <h3>
          Would you like to have some &nbsp;
          <img src={fun_icon} alt="fun icon" width="45" height="25"></img> ?
        </h3>
      </div>
      <div className="activitiesBlockClass">
        <a href="https://www.autodraw.com/" target="_blank" rel="noopener noreferrer">
          <img src={lets_paint_icon} alt="Painting icon" width="170" height="150" className="individualActClass"></img>
        </a>
        <a href="https://puzzlegarage.com/" target="_blank" rel="noopener noreferrer">
          <img src={jigsaw_puzzle_icon} alt="Jigsaw puzzles icon" width="170" height="150" className="individualActClass"></img>
        </a>
        <a href="https://manybooks.net/" target="_blank" rel="noopener noreferrer">
          <img
            src={books_and_coffee_icon}
            alt="Books and coffee icon"
            width="170"
            height="150"
            className="individualActClass"
          ></img>
        </a>
        <a href="https://www.movewithcolour.com/freeclasses" target="_blank" rel="noopener noreferrer">
          <img src={dance_icon} alt="Dancing kids icon" width="170" height="150" className="individualActClass"></img>
        </a>
        <a href="https://open.spotify.com/" target="_blank" rel="noopener noreferrer">
          <img src={music_icon} alt="Listening music icon" width="170" height="150" className="individualActClass"></img>
        </a>
        <a href="https://www.youtube.com/c/KunalKapur/videos" target="_blank" rel="noopener noreferrer">
          <img src={recipe_icon} alt="Recipe icon" width="170" height="150" className="individualActClass"></img>
        </a>
      </div>
    </div>
  );
}

export default FunActivities;
