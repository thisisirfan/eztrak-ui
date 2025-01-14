import React from 'react';
import { HeaderProps } from './Header.types';

export const Header: React.FC<HeaderProps> = ({
    title = "Header",
    className = "flex-col",
    containerClass = "",
    breadcrumbs = "",
    children
}) => {
    return (
        <div className={`p-2 flex gap-2 ${className}`}>
            <div className='title-wrapper'>
                <h1 className="text-4xl h-fit font-bold">{title}</h1>
                {breadcrumbs && <div className="breadcrumbs-wraper">{breadcrumbs}</div>}
            </div>
            <div
                className={`flex flex-row justify-between items-center ${containerClass}`}
            >
                {children}
            </div>
        </div>
    );
};