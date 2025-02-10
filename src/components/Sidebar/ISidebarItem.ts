
export interface ISidebarItem {
  name: string;
  link?: string;
  icon?: React.ReactNode;
  subItems?: ISidebarItem[];
  component?: React.ComponentType;
  tooltip?: string;
  tooltipPlacement?: 'top' | 'right' | 'bottom' | 'left';
}