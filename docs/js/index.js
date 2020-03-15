/**
 * DotGame stores the game state and handles the game lifecycle.
 * It contains DotManager and ScoreBoard which update the game state.
 */

import ScoreBoard from "./ScoreBoard.js";
import DotManager from "./DotManager.js";

class DotGame {
  constructor() {
    this.state = {
      isPlaying: false,
      hasSwitchedTabWhilePlaying: false
    };

    this.scoreBoard = new ScoreBoard();
    this.dotMananger = new DotManager(this.scoreBoard);
    this.startButton = document.getElementById("start-button");
    this.startButton.addEventListener("click", this.toggleButton.bind(this));

    document.addEventListener(
      "visibilitychange",
      this.handleVisibilityChange.bind(this),
      false
    );
  }

  // Pause game if user switches browser tab
  handleVisibilityChange() {
    if (this.state.isPlaying && document.hidden) {
      this.state.hasSwitchedTab = true;
      this.pauseGame();
    }

    if (this.state.hasSwitchedTab && !document.hidden) {
      this.state.hasSwitchedTab = false;
      this.startGame();
    }
  }

  toggleButton() {
    this.state.isPlaying = !this.state.isPlaying;

    if (this.state.isPlaying) {
      this.startGame();
    } else {
      this.pauseGame();
    }
  }

  updateButtonText() {
    this.startButton.innerText = this.state.isPlaying ? "Pause" : "Start";
  }

  startGame() {
    this.dotMananger.startSpawningDots();
    this.updateButtonText();
  }

  pauseGame() {
    this.dotMananger.pauseDots();
    this.updateButtonText();
  }
}

new DotGame();

// Add Service Worker to enable offline playing
window.onload = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js");
  }
};
