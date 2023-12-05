/** @format */

import React from "react";
import funIcon from "../images/Fun_Activities/fun_icon.png";
import letsPaintIcon from "../images/Fun_Activities/lets_paint_icon.png";
import jigsawPuzzleIcon from "../images/Fun_Activities/jigsaw_puzzle_icon.png";
import booksAndCoffeeIcon from "../images/Fun_Activities/books_and_coffee_icon2.jpg";
import danceIcon from "../images/Fun_Activities/dance_icon.jpg";
import musicIcon from "../images/Fun_Activities/music_icon.jfif";
import recipeIcon from "../images/Fun_Activities/recipe_icon.png";
import "../styles/FunActivities.css";
import Tooltip from "@material-ui/core/Tooltip";

function FunActivities() {
  return (
    <div className="funActivitiesClass">
      <div className="funActivitiesHeading">
        <h3>
          Would you like to have some &nbsp;
          <img src={funIcon} alt="fun icon" width="45" height="25"></img> ?
        </h3>
      </div>
      <div className="activitiesBlockClass">
        <a href="https://www.autodraw.com/" target="_blank" rel="noopener noreferrer">
          <Tooltip title="Try your hands at Painting">
            <img src={letsPaintIcon} alt="Painting icon" width="170" height="130" className="individualActClass"></img>
          </Tooltip>
        </a>
        <a href="https://puzzlegarage.com/" target="_blank" rel="noopener noreferrer">
          <Tooltip title="Solve Jigsaw Puzzles">
            <img src={jigsawPuzzleIcon} alt="Jigsaw puzzles icon" width="170" height="130" className="individualActClass"></img>
          </Tooltip>
        </a>
        <a href="https://manybooks.net/" target="_blank" rel="noopener noreferrer">
          <Tooltip title="Read book while having some coffee">
            <img
              src={booksAndCoffeeIcon}
              alt="Books and coffee icon"
              width="170"
              height="130"
              className="individualActClass"
            ></img>
          </Tooltip>
        </a>
        <a href="https://www.movewithcolour.com/freeclasses" target="_blank" rel="noopener noreferrer">
          <Tooltip title="Try some dance moves">
            <img src={danceIcon} alt="Dancing kids icon" width="170" height="130" className="individualActClass"></img>
          </Tooltip>
        </a>
        <a href="https://open.spotify.com/" target="_blank" rel="noopener noreferrer">
          <Tooltip title="Listen to some soothing music">
            <img src={musicIcon} alt="Listening music icon" width="170" height="130" className="individualActClass"></img>
          </Tooltip>
        </a>
        <a href="https://www.youtube.com/c/KunalKapur/videos" target="_blank" rel="noopener noreferrer">
          <Tooltip title="Try some yummy recipes">
            <img src={recipeIcon} alt="Recipe icon" width="170" height="130" className="individualActClass"></img>
          </Tooltip>
        </a>
      </div>
    </div>
  );
}

export default FunActivities;
