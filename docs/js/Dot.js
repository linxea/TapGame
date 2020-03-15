/**
 * Dot updates DotManager on its lifecycle. It uses DotBoard's dimension
 * to decide on its spawn position and animation.
 */

export const DOT_TYPE = {
  COLOR: "color",
  EMOJI: "emoji"
};
const MAX_RANDOM_RANGE = 10;
const MIN_DIAMETER_IN_PX = 10;
const MIN_RANGE = 0;
const COLORS = [
  "rgb(194, 255, 182)",
  "rgb(255, 163, 182)",
  "rgb(221, 169, 255)",
  "rgb(162, 209, 255)"
];
const IMAGES = [
  "smile.png",
  "angry.png",
  "bat.png",
  "fat.png",
  "happy.png",
  "shock.png",
  "smile.png"
];

export default class Dot {
  static getRandomDotType() {
    const keys = Object.keys(DOT_TYPE);
    const randomIndex = Dot.getRandomNumber(keys.length - 1);
    return DOT_TYPE[keys[randomIndex]];
  }

  static getRandomNumber(maxRange) {
    return Math.floor(MIN_RANGE + Math.random() * (maxRange + 1 - MIN_RANGE));
  }

  constructor(
    dotBoard,
    dotFallingSpeed,
    handleRemoveDot,
    handleTouchedDot,
    id,
    dotType
  ) {
    this.dotType = dotType;
    this.dotBoard = dotBoard;
    this.dotElement = this.createRandomDotElement();
    this.dotElement.addEventListener("click", this.handleClick.bind(this));
    this.state = {
      isPaused: false,
      lastPosition: 0,
      dotFallingSpeed
    };
    this.handleRemoveDot = handleRemoveDot;
    this.handleTouchedDot = handleTouchedDot;
    this.id = id;
  }

  get getElement() {
    return this.dotElement;
  }

  createRandomDotElement() {
    const randomNumber = Dot.getRandomNumber(MAX_RANDOM_RANGE);
    this.dotDiameter = randomNumber * MIN_DIAMETER_IN_PX;
    this.dotScore = MAX_RANDOM_RANGE + 1 - randomNumber;

    const dotElement = document.createElement("div");
    dotElement.className = "dot";
    dotElement.style.width = `${this.dotDiameter}px`;
    dotElement.style.height = `${this.dotDiameter}px`;
    dotElement.style.left = this.getRandomPositionOnDotBoard();
    this.updateDotStyle(dotElement);

    return dotElement;
  }

  updateDotStyle(dotElement) {
    switch (this.dotType) {
      case DOT_TYPE.COLOR:
        dotElement.style.backgroundImage = this.getRandomColors();
        break;
      case DOT_TYPE.EMOJI:
        dotElement.style.backgroundImage = this.getRandomImages();
        dotElement.style.backgroundSize = "cover";
        break;
    }
  }

  getRandomColors() {
    const maxRange = COLORS.length - 1;
    return `linear-gradient(
      to right,
      ${COLORS[Dot.getRandomNumber(maxRange)]},
      ${COLORS[Dot.getRandomNumber(maxRange)]}
    )`;
  }

  getRandomImages() {
    const maxRange = IMAGES.length - 1;
    return `url('./images/${IMAGES[Dot.getRandomNumber(maxRange)]}')`;
  }

  getRandomPositionOnDotBoard() {
    const maxRange = this.dotBoard.clientWidth - this.dotDiameter;
    const randomNumber = Dot.getRandomNumber(maxRange);
    return randomNumber + "px";
  }

  handleClick(event) {
    if (!this.state.isPaused) {
      this.handleTouchedDot(this.dotScore);
      this.destroyDot(event.target);
    }
  }

  pause() {
    this.state.isPaused = true;
    this.state.lastPosition = this.dotElement.offsetTop;
  }

  resume() {
    this.state.isPaused = false;
    this.animate(this.state.lastPosition);
  }

  destroyDot(dotElement) {
    this.handleRemoveDot(this.id);
    dotElement.parentElement.removeChild(dotElement);
  }

  move(dotElement, position) {
    if (this.state.isPaused || !dotElement || !dotElement.parentElement) {
      return;
    }

    dotElement.style.top = `${position}px`;
    if (position <= dotElement.parentElement.clientHeight + this.dotDiameter) {
      const newPosition = position + this.state.dotFallingSpeed;
      requestAnimationFrame(() => {
        this.move(dotElement, newPosition);
      });
    } else {
      this.destroyDot(dotElement);
    }
  }

  animate(lastPosition = 0) {
    requestAnimationFrame(() => {
      this.move(this.dotElement, lastPosition);
    });
  }

  updateSpeed(speed) {
    this.state.dotFallingSpeed = speed;
  }
}
