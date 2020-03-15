/**
 * ScoreBoard manages the game score.
 */

export default class ScoreBoard {
  constructor() {
    this.scoreBoardElement = document.getElementById("score-board");
    this.state = {
      score: 0
    };
  }

  addScore(score) {
    this.state.score += score;
    this.scoreBoardElement.innerText = this.state.score;
  }
}
