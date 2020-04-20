import React from "react";
import { Slider } from "@material-ui/core";

class StateSlider extends React.Component {
  handleChange = (e, value) => {
    e.preventDefault();
    this.props.handleChange(this.props.index, value);
  };

  render() {
    return (
      <Slider value={this.props.value} onChange={this.handleChange} max={30} />
    );
  }
}

export default StateSlider;
