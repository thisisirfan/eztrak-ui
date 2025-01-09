import React from "react";
import * as FontAwesome from "react-icons/fa";

const FaIcon = ({ iconName, size = "1em", color = "#000", action }) => {
  const icon = React.createElement(FontAwesome[iconName]);
  return (
    <span
      className="btn-behaviour"
      onClick={action}
      style={{ fontSize: size, color: color }}
    >
      {FontAwesome[iconName] && icon}
    </span>
  );
};
export default FaIcon;
