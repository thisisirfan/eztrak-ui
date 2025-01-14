import React, { FC, useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import cx from 'clsx';
import './Sidebar.scss';
import { ISidebarProps } from './ISidebarProps';
import { ISidebarItem } from './ISidebarItem';

export const Sidebar: FC<ISidebarProps> = ({
  className,
  sideCollapseWidth = "w-20",
  sidebarWidth = "w-48",
  header,
  children,
  footer,
  items = [],
  logoUrl = "",
  logoAltText = "Logo",
  collapseButtonText = "⬅️ Collapse",
  expandButtonText = "➡️",
  // location = { pathname: '' },
  classNames = {},
  onCollapseChange,
  isCollapsed = false,
  ...rest
}) => {

  const location = useLocation();
  const [collapsed, setCollapsed] = useState<boolean>(isCollapsed);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [activeLink, setActiveLink] = useState<string>(location.pathname);

  useEffect(() => {
    if (onCollapseChange) {
      onCollapseChange(collapsed);
    }
  }, [collapsed, onCollapseChange]);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const toggleGroup = (group: string) => {
    setActiveGroup(activeGroup === group ? '' : group);
  };

  const isActive = (link: string) => {
    return activeLink === link;
  };

  return (
    <div
      className={`flex flex-col h-screen overflow-hidden ${collapsed ? `${sideCollapseWidth} justify-center items-center collapsed` : `${sidebarWidth}`
        } transition-all duration-100 ${className}`}
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
                  className={`flex cursor-pointer ${classNames?.navItem}`}
                >
                  <div className="flex items-center space-x-4">
                    <span className={classNames?.navItemText}>{item.icon}</span>
                    {!collapsed && (
                      <span className={classNames?.navItemText}>
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
                  <div className={cx("collapse-btn-wrapper ml-8 mt-2", classNames.subItem)}>
                    {item.subItems.map((subItem: ISidebarItem, subIndex: number) => (
                      <Link
                        to={subItem.link}
                        key={`${index}-${subIndex}`}
                        className={`flex ${classNames?.navItem} ${isActive(subItem.link) ? 'active' : ''}`}
                        onClick={() => setActiveLink(subItem.link)}
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
              className={`flex ${classNames?.navItem} ${isActive(item.link) ? 'active' : ''}`}
              onClick={() => setActiveLink(item.link)}
            >
              <span className={classNames.navItemText ?? 'text-orange-600'}>{item.icon}</span>
              {!collapsed && <span className={classNames.navItemText}>{item.name}</span>}
            </Link>
          );
        })}
      </nav>
      {children}

      <button
        onClick={() => setCollapsed(!collapsed)}
        className={cx("", classNames.collapseButton) ?? 'p-4 border-t border-gray-300'}
      >
        {collapsed ? expandButtonText : collapseButtonText}
      </button>

      {/* Footer Section */}
      {footer && <div className={classNames?.footer ?? 'p-4 border-t border-gray-300'}>{footer}</div>}
    </div>
  );
};