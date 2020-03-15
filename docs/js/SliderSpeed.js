/**
 * SliderSpeed updates the speed of the dots.
 */

const REQUEST_ANIMATION_FRAMERATE = 60;
const SLIDER_VALUE = {
  MIN: 10,
  MAX: 100,
  DEFAULT_VALUE: 50
};

export default class SliderSpeed {
  constructor(state, updateAllDotsSpeed) {
    this.sliderSpeedElement = document.getElementById("slider-speed");
    this.sliderSpeedElement.min = SLIDER_VALUE.MIN;
    this.sliderSpeedElement.max = SLIDER_VALUE.MAX;
    this.sliderSpeedElement.value = SLIDER_VALUE.DEFAULT_VALUE;
    this.sliderSpeedElement.addEventListener(
      "change",
      this.handleSpeedChange.bind(this)
    );

    this.updateAllDotsSpeed = updateAllDotsSpeed;
    this.state = state;
    this.state.dotFallingSpeed =
      SLIDER_VALUE.DEFAULT_VALUE / REQUEST_ANIMATION_FRAMERATE;
  }

  handleSpeedChange(event) {
    const newValue = parseInt(event.target.value);
    const newDotFallingSpeed = newValue / REQUEST_ANIMATION_FRAMERATE;
    this.state.dotFallingSpeed = newDotFallingSpeed;

    this.updateAllDotsSpeed(newDotFallingSpeed);
  }
}
