import React from "react";
import Collapse from "@material-ui/core/Collapse";
import Switch from "@material-ui/core/Switch";
import StateTextfield from "./TextField";
import "../App.css";

class LinechartForm extends React.Component {
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

  handleChange = (index, value) => {
    console.log(index, value);
  };

  render() {
    return (
      <div className="linechart-form">
        <div className="barchart-collapse-control">
          {" "}
          Show controls{" "}
          <Switch
            checked={this.state.open}
            onChange={this.toggleOpen}
            size="small"
          />
        </div>
        <Collapse in={this.state.open}>
          {this.props.data.map((datum) => {
            return (
              <div className="form-item-name" key={datum.index}>
                {datum.label}:{" "}
                <StateTextfield
                  key={datum.index}
                  index={datum.index}
                  value={datum.series.map((year) => year.y)}
                  handleChange={this.handleChange}
                />
              </div>
            );
          })}
        </Collapse>
      </div>
    );
  }
}

export default LinechartForm;
