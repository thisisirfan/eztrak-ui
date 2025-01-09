
import React, { ButtonHTMLAttributes, FC } from "react";
import "./Button.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button: FC<ButtonProps> = ({ className = '', children, ...props }) => {
  const buttonClass = `btn ${className}`;
  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};

export default Button;