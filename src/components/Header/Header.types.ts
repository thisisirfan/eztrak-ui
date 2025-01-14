
import React from 'react';

export interface HeaderProps {
    title?: string;
    children?: React.ReactNode;
    breadcrumbs?: React.ReactNode;
    className?: string;
    containerClass?: string;
    titleStyle?: string;
    breadcrumbsStyle?: string;
}