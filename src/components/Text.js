import React from "react";
import { createSmartText } from "../helpers/SmartText/SmartText";

class Text extends React.Component {
  render() {
    const defaultText =
      "This is a placeholder text that will display instead of SmartText description in the absence of a valid SmartText generated.";
    const smartText = createSmartText(
      this.props.data,
      this.props.chartType,
      this.props.chartProperties
    );

    return (
      <div className="smart-text">{smartText ? smartText : defaultText}</div>
    );
  }
}

export default Text;
