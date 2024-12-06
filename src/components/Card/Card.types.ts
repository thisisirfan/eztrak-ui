
import React from 'react';

export interface CardProps {
  title: string;
  content: string;
  icon: React.ReactNode;
  onClick?: () => void;
  containerClassName?: string;
  iconClassName?: string;
  titleClassName?: string;
  contentClassName?: string;
}