
import { HTMLAttributes, ReactNode } from 'react';
import { ISidebarItem } from './ISidebarItem';

export interface ISidebarProps extends HTMLAttributes<HTMLDivElement> {
  header?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  items?: ISidebarItem[];
  logoUrl?: string;
  logoAltText?: string;
  collapseButtonText?: ReactNode;
  expandButtonText?: ReactNode;
  location?: {
    pathname?: string;
  };
  classNames?: {
    logoSection?: string;
    navSection?: string;
    groupItem?: string;
    subItem?: string;
    collapseButton?: string;
  };
}