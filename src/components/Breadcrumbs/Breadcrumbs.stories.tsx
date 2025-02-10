import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Breadcrumbs } from "./Breadcrumbs";
import { Route, BreadcrumbsProps } from "./types";

export default {
  title: "Components/Breadcrumbs",
  component: Breadcrumbs,
  argTypes: {
    containerClassName: { control: "text" },
    linkClassName: { control: "text" },
    separatorClassName: { control: "text" },
    activeClassName: { control: "text" },
    customTitles: { control: "object" },
  },
} as Meta;

const Template: StoryFn<BreadcrumbsProps> = (args) => (
  <Router>
    <Breadcrumbs {...args} />
  </Router>
);

const routes: Route[] = [
  { path: "dashboard", title: "Dashboard" },
  { path: "settings", title: "Settings", children: [{ path: "profile", title: "Profile" }] },
];

export const Default = Template.bind({});
Default.args = {
  routes,
  containerClassName: "flex flex-row gap-2 items-center text-sm text-secondary",
  linkClassName: "",
  separatorClassName: "",
  activeClassName: "font-bold whitespace-pre",
  customTitles: { "profile": "User Profile" },
};
