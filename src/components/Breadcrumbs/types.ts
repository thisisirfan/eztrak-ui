export interface Route {
    path: string;
    title?: string;
    children?: Route[];
}

export interface BreadcrumbsProps {
    routes?: Route[];
    containerClassName?: string;
    linkClassName?: string;
    separatorClassName?: string;
    activeClassName?: string;
    customTitles?: { [key: string]: string };
}