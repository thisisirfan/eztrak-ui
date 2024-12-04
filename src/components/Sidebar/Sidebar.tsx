import React, { HTMLAttributes, FC, ReactNode, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import cx from 'clsx';

import './Sidebar.scss';

export interface ISidebarItem {
  name: string;
  icon?: ReactNode;
  link: string;
  subItems?: ISidebarItem[];
}

export interface ISidebarProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  collapsed?: boolean;
  activeGroup?: string;
  setActiveGroup?: (activeGroup: string) => void;
  setCollapsed?: (collapsed: boolean) => void;
  items?: ISidebarItem[];
  logoUrl?: string;
  logoAltText?: string;
  collapseButtonText?: string;
  expandButtonText?: string;
  classNames?: {
    logoSection?: string;
    navSection?: string;
    groupItem?: string;
    subItem?: string;
    collapseButton?: string;
  };
}

export const Sidebar: FC<ISidebarProps> = ({
  className,
  children,
  collapsed,
  setCollapsed = () => {},
  items = [],
  activeGroup,
  setActiveGroup = () => {},
  logoUrl = "logo_url",
  logoAltText = "EZTRAK Logo",
  collapseButtonText = "⬅️ Collapse",
  expandButtonText = "➡️",
  classNames = {},
  ...rest
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    console.log('Sidebar component mounted');
    return () => {
      setIsMounted(false);
      console.log('Sidebar component unmounted');
    };
  }, []);

  const toggleGroup = (group:string) => {
    setActiveGroup(activeGroup === group ? '' : group);
  };

  return (
    <div data-test={isMounted} className={cx('sidebar', className)} {...rest}>
      {/* Logo Section */}
      <div className={cx("flex items-center justify-center h-16 border-b border-gray-300", classNames.logoSection)}>
        {/* <img src={logoUrl} alt={logoAltText} className="h-10" /> */}
      </div>

      {/* Navigation Section */}
      <nav className={cx("flex-grow", classNames.navSection)}>
        {items.map((item, index) => {
          if (item.subItems) {
            // Render collapsible group
            return (
              <div key={index} className="my-2">
                <div
                  onClick={() => toggleGroup(item.name)}
                  className={cx("flex items-center justify-between p-4 hover:bg-gray-200 cursor-pointer", classNames.groupItem)}
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-orange-600">{item.icon}</span>
                    {!collapsed && (
                      <span className="text-gray-800 font-semibold">
                        {item.name}
                      </span>
                    )}
                  </div>
                  {!collapsed && (
                    <span
                      className={`transform transition-transform ${
                        activeGroup === item.name ? "rotate-90" : "rotate-0"
                      }`}
                    >
                      ▼
                    </span>
                  )}
                </div>
                {activeGroup === item.name && !collapsed && (
                  <div className={cx("ml-8 mt-2", classNames.subItem)}>
                    {item.subItems.map((subItem, subIndex) => (
                      <Link
                        to={subItem.link}
                        key={`${index}-${subIndex}`}
                        className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          // Render single menu item
          return (
            <Link
              to={item.link}
              key={index}
              className="flex items-center space-x-4 p-4 hover:bg-gray-200 rounded"
            >
              <span className="text-orange-600">{item.icon}</span>
              {!collapsed && <span className="text-gray-800">{item.name}</span>}
            </Link>
          );
        })}
      </nav>
      {children}

      <button
        onClick={() => setCollapsed(!collapsed)}
        className={cx("p-4 bg-gray-300 hover:bg-gray-400 border-t border-gray-300", classNames.collapseButton)}
      >
        {collapsed ? expandButtonText : collapseButtonText}
      </button>
    </div>
  );
};