
import React, { HTMLAttributes, FC, ReactNode } from 'react';
import cx from 'clsx';

import './Sidebar.scss';

export interface ISidebarProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const Sidebar: FC<ISidebarProps> = ({ className, children, ...rest }) => {
  const [collapsed, setCollapsed] = React.useState<boolean>(false);

  return (
    <div
      className={cx('sidebar', className)}
      {...rest}
    >
      {children}

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="p-4 bg-gray-300 hover:bg-gray-400 border-t border-gray-300"
      >
        {collapsed ? "➡️" : "⬅️ Collapse"}
      </button>
    </div>
  )
};