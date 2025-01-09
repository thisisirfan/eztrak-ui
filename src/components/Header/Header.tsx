import React from 'react';
import { HeaderProps } from './Header.types';

export const Header: React.FC<HeaderProps> = ({
    title = "Header",
    className = "bg-blue-500  text-white",
    containerClass = "",
    breadcrumbs = "",
    children
}) => {
    return (
        <div className={`p-2 flex flex-col gap-2 ${className}`}>
            <h1 className="text-4xl h-fit font-bold">{title}</h1>
            <div
                className={`flex flex-row justify-between items-center ${containerClass}`}
            >
                {breadcrumbs && <div className="breadcrumbs-wraper">{breadcrumbs}</div>}
                {children}
            </div>
        </div>
    );
};