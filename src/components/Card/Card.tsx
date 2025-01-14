import React from 'react';
import { CardProps } from './Card.types';

export const Card: React.FC<CardProps> = ({ 
  title, 
  content, 
  icon, 
  onClick, 
  containerClassName = 'shadow p-6', 
  iconClassName = '', 
  titleClassName = '', 
  contentClassName = '' 
}) => {
  return (
    <div className={`transform  transition duration-300 cursor-pointer select-none ${containerClassName}`} onClick={onClick}>
      <div className="flex space-x-4">
        <span className={`text-primary text-3xl ${iconClassName}`}>{icon}</span>
        <div>
          <h3 className={`font-semibold text-lg text-primary ${titleClassName}`}>{title}</h3>
          <p className={`text-sm text-secondary ${contentClassName}`}>{content}</p>
        </div>
      </div>
    </div>
  );
};