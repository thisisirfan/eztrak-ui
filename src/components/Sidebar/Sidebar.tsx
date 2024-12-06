import React, { FC, useState } from 'react';
import { Link } from "react-router-dom";
import cx from 'clsx';
import './Sidebar.scss';
import { ISidebarProps } from './ISidebarProps';
import { ISidebarItem } from './ISidebarItem';

export const Sidebar: FC<ISidebarProps> = ({
  className,
  header,
  children,
  footer,
  items = [],
  logoUrl = "",
  logoAltText = "Logo",
  collapseButtonText = "⬅️ Collapse",
  expandButtonText = "➡️",
  location = { pathname: '' },
  classNames = {},
  ...rest
}) => {

  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const toggleGroup = (group: string) => {
    setActiveGroup(activeGroup === group ? '' : group);
  };

  const isActive = (link: string) => {
    return typeof location === 'object' && location.pathname === link;
  };

  return (
    <div
      className={`flex flex-col bg-gray-100 shadow h-screen overflow-hidden ${className} ${collapsed ? "w-20 w-max-20 justify-center items-center" : " w-48 w-max-48"
        } transition-all duration-100`}
      {...rest}
    >
      {/* Logo Section */}
      {logoUrl && <div className={cx("flex items-center justify-center h-16 border-b border-gray-300", classNames.logoSection)}>
        <img src={logoUrl} alt={logoAltText} className="h-10" />
      </div>
      }

      {/*Header Section */}
      {header && <div className="flex items-center justify-between p-4 border-b border-gray-300">{header}</div>}

      {/* Navigation Section */}
      <nav className={cx("flex-grow", classNames.navSection)}>
        {items.map((item, index) => {
          if (item.subItems) {
            // Render collapsible group
            return (
              <div key={index} className="my-2">
                <div
                  onClick={() => toggleGroup(item.name)}
                  className={`flex items-center justify-between p-4 hover:bg-gray-200 cursor-pointer text-secondary hover:text-primary ${isActive(item.link)
                    ? "bg-gray-200 border-l-4 border-primary"
                    : ""
                    }`}
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
                      className={`transform transition-transform ${activeGroup === item.name ? "rotate-90" : "rotate-0"
                        }`}
                    >
                      ▼
                    </span>
                  )}
                </div>
                {activeGroup === item.name && !collapsed && (
                  <div className={cx("ml-8 mt-2", classNames.subItem)}>
                    {item.subItems.map((subItem: ISidebarItem, subIndex: number) => (
                      <Link
                        to={subItem.link}
                        key={`${index}-${subIndex}`}
                        className={`flex items-center space-x-4 p-4 hover:bg-gray-200 rounded ${isActive(item.link) ? "bg-gray-200" : ""
                          }`}
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
              className={`flex items-center text-secondary space-x-4 p-4 hover:bg-gray-200 hover:text-primary ${isActive(item.link)
                ? "bg-gray-200 border-l-4 border-primary"
                : ""
                }`}
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

      {/* Footer Section */}
      {footer && <div className="p-4 border-t border-gray-300">{footer}</div>}
    </div>
  );
};