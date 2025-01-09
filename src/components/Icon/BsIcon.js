import React from "react";
import * as FontAwesome from "react-icons/bs";

const BsIcon = ({ iconName, size = "1em", color = "#000",action }) => {
  const icon = React.createElement(FontAwesome[iconName]);
  return <span onClick={action} style={{ fontSize: size, color: color }}>{icon}</span>;
};

export default BsIcon;
