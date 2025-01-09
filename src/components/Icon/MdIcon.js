import React from "react";
import * as FontAwesome from "react-icons/md";

const MdIcon = ({ iconName, size = "1em", color = "#000", action }) => {
  const icon = React.createElement(FontAwesome[iconName]);
  return (
    <span
      className="btn-behaviour"
      style={{ fontSize: size, color: color }}
      onClick={action}
    >
      {icon}
    </span>
  );
};

export default MdIcon;
