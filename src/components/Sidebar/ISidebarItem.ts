
import { ReactNode } from 'react';

export interface ISidebarItem {
  name: string;
  icon?: ReactNode;
  link: string;
  subItems?: ISidebarItem[];
}