import React from "react";
import { Input } from "@material-ui/core";

class StateTextfield extends React.Component {
  handleChange = (year, newValue) => {
    const oldSeries = this.props.series;
    const newSeries = oldSeries.map((item) => {
      if (item.x === year) {
        return { ...item, y: newValue };
      } else {
        return item;
      }
    });

    this.props.handleChange(this.props.index, newSeries);
  };

  render() {
    return this.props.series.map((item) => {
      return (
        <YearTextfield
          key={item.x}
          year={item.x}
          value={item.y}
          onYearChange={this.handleChange}
        />
      );
    });
  }
}

class YearTextfield extends React.Component {
  handleYearChange = (e) => {
    e.preventDefault();
    const parsedVal = parseFloat(e.target.value);
    if (!isNaN(parsedVal)) {
      this.props.onYearChange(this.props.year, parsedVal);
    } else {
      this.props.onYearChange(this.props.year, 0);
    }
  };

  render() {
    return (
      <Input
        value={this.props.value}
        onChange={this.handleYearChange}
        margin="dense"
      />
    );
  }
}

export default StateTextfield;
