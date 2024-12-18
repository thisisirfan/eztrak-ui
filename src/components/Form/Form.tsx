import React, { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import cx from 'clsx';


export const Form: FC<any> = ({ onClick, disabled, className, children, ...rest }) => (
  <button
    type="button"
    className={cx('button', className, { 'button--dsiabled': disabled })}
    onClick={onClick}
    disabled={disabled}
    {...rest}
  >
    {children}
  </button>
);
