import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Route, BreadcrumbsProps } from "./types";

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  routes = [],
  containerClassName = "flex flex-row gap-2 items-center text-sm text-secondary",
  linkClassName = "",
  separatorClassName = "",
  activeClassName = "font-bold whitespace-pre",
}) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const findRoute = (pathname: string, routes: Route[], parentPath = ""): Route | null => {
    for (const route of routes) {
      const fullPath = `${parentPath}/${route.path}`.replace(/\/+/g, "/");
      if (fullPath === pathname) {
        return route;
      }
      if (route.children) {
        const childRoute = findRoute(pathname, route.children, fullPath);
        if (childRoute) {
          return childRoute;
        }
      }
    }
    return null;
  };

  const getTitle = (pathname: string): string => {
    const match = findRoute(pathname, routes);
    return match && match.title ? match.title : pathname;
  };

  return (
    <div className={containerClassName}>
      <Link to="/" className={linkClassName}>Home</Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        const title = getTitle(to);
        return isLast ? (
          <React.Fragment key={to}>
            <span className={separatorClassName}>/</span>
            <span key={to} className={activeClassName}>
              {title}
            </span>
          </React.Fragment>
        ) : (
          <React.Fragment key={to}>
            <span className={separatorClassName}>/</span>
            <Link to={to} className={linkClassName}>{title}</Link>
          </React.Fragment>
        );
      })}
    </div>
  );
};