import React from "react";
import StateSlider from "./Slider.js";
import "../App.css";

class BarchartForm extends React.Component {
  handleChange = (sliderIndex, newSliderValue) => {
    this.props.updateData(sliderIndex, newSliderValue);
  };

  render() {
    return (
      <form className="form barchart-form">
        {this.props.data.map((datum) => {
          return (
            <div className="form-item-name" key={datum.index}>
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
