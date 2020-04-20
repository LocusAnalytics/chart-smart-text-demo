import React from "react";
import StateSlider from "./Slider.js";

class BarchartForm extends React.Component {
  handleChange = (sliderIndex, newSliderValue) => {
    this.props.updateData(sliderIndex, newSliderValue);
  };

  render() {
    return (
      <form>
        {this.props.data.map((datum) => {
          return (
            <div key={datum.index}>
              {datum.name}:{" "}
              <StateSlider
                key={datum.index}
                index={datum.index}
                value={datum.val}
                handleChange={this.handleChange}
              />
              <br></br>
            </div>
          );
        })}
      </form>
    );
  }
}

export default BarchartForm;
