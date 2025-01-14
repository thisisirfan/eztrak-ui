import React from 'react';
import { HeaderProps } from './Header.types';

export const Header: React.FC<HeaderProps> = ({
    title = "Header",
    className = "p-2 gap-2 flex-col",
    containerClass = "",
    breadcrumbs = "",
    titleStyle = "text-4xl h-fit font-bold",
    breadcrumbsStyle = "text-sm",
    children
}) => {
    return (
        <div className={`flex ${className}`}>
            <div className='title-wrapper'>
                <h1 className={titleStyle}>{title}</h1>
                {breadcrumbs && <div className={`breadcrumbs-wraper ${breadcrumbsStyle}`}>{breadcrumbs}</div>}
            </div>
            <div className={`flex flex-row justify-between items-center ${containerClass}`}>
                {children}
            </div>
        </div>
    );
};