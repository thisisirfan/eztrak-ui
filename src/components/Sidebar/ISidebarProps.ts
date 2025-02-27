
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
  sideCollapseWidth?: string;
  sidebarWidth?: string;
  location?: {
    pathname?: string;
  };
  classNames?: {
    logoSection?: string;
    navSection?: string;
    groupItem?: string;
    subItem?: string;
    collapseButton?: string;
    navItemText?: string;
    footer?: string;
    navItem?: string;
    itemDropdown?: string;
  };
  itemDropdownIcon?: ReactNode;
  onCollapseChange?: (collapsed: boolean) => void;
  isCollapsed?: boolean;
}