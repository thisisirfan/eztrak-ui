import { ReactNode } from 'react';

export interface PopoverProps {
  trigger: ReactNode;
  title?: string;
  children: ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
  width?: string;
  className?: string;
  closebtn?: boolean;
}
