/**
 * DotManager manages the spawning and removal of dot element.
 */

import Dot from "./Dot.js";
import SliderSpeed from "./SliderSpeed.js";

const DOT_SPAWN_IN_MS = 1000;

export default class DotManager {
  constructor(scoreBoard) {
    this.dotBoardElement = document.getElementById("dot-board");
    this.scoreBoard = scoreBoard;

    this.state = {
      dots: {},
      spawnInterval: 0,
      dotFallingSpeed: 0
    };

    this.slider = new SliderSpeed(
      this.state,
      this.updateAllDotsSpeed.bind(this)
    );

    this.dotType = Dot.getRandomDotType();
  }

  spawnDot() {
    // A simple unique id for each dot
    const id = Date.now();
    const newDot = new Dot(
      this.dotBoardElement,
      this.state.dotFallingSpeed,
      this.handleRemoveDot.bind(this),
      this.handleTouchedDot.bind(this),
      id,
      this.dotType
    );
    this.dotBoardElement.append(newDot.getElement);
    this.state.dots[id] = newDot;

    // Start dot before DotBoard
    const startPosition = -newDot.dotDiameter;
    newDot.animate(startPosition);
  }

  handleRemoveDot(id) {
    delete this.state.dots[id];
  }

  handleTouchedDot(dotScore) {
    this.scoreBoard.addScore(dotScore);
  }

  pauseDots() {
    this.stopSpawningDots();

    Object.values(this.state.dots).forEach(dot => {
      dot.pause();
    });
  }

  resumeDots() {
    Object.values(this.state.dots).forEach(dot => {
      dot.resume();
    });
  }

  updateAllDotsSpeed(newSpeed) {
    Object.values(this.state.dots).forEach(dot => {
      dot.updateSpeed(newSpeed);
    });
  }

  startSpawningDots() {
    this.resumeDots();
    this.state.spawnInterval = setInterval(
      this.spawnDot.bind(this),
      DOT_SPAWN_IN_MS
    );
  }

  stopSpawningDots() {
    clearInterval(this.state.spawnInterval);
  }
}
