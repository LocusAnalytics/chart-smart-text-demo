import React from "react";
import Collapse from "@material-ui/core/Collapse";
import Switch from "@material-ui/core/Switch";
import StateSlider from "./Slider.js";
import "../App.css";

class BarchartForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  toggleOpen = () => {
    let oldState = this.state.open;
    this.setState({ open: !oldState });
  };

  handleChange = (sliderIndex, newSliderValue) => {
    this.props.updateData(sliderIndex, newSliderValue);
  };

  render() {
    return (
      <div className="barchart-form">
        <div className="barchart-collapse-control">
          {" "}
          Show controls{" "}
          <Switch checked={this.state.open} onChange={this.toggleOpen} />
        </div>
        <Collapse in={this.state.open}>
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
        </Collapse>
      </div>
    );
  }
}

export default BarchartForm;
