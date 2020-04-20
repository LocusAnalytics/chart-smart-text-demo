import React, { useState } from "react";
import SmartText from "../helpers/SmartText";

const Text = () => {
  const defaultText =
    "This is a placeholder text that will display instead of SmartText description in the absence of a valid SmartText generated.";
  const [text, updateText] = useState(defaultText);

  return <div className="smart-text">{text}</div>;
};

export default Text;
