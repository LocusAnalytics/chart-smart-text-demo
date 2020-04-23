import React from "react";
import { TextField } from "@material-ui/core";

class StateTextfield extends React.Component {
  handleChange = (e) => {
    e.preventDefault();
    this.props.handleChange(this.props.index, e.target.value);
  };

  render() {
    return <TextField value={this.props.value} onChange={this.handleChange} />;
  }
}

export default StateTextfield;
