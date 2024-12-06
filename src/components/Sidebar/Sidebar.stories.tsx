import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import { Sidebar, ISidebarProps } from './Sidebar';
import { FaHome, FaUser, FaCog, FaChevronLeft, FaChevronRight, FaDoorOpen, FaDashcube } from 'react-icons/fa';

export default {
  title: 'Sidebar',
  component: Sidebar,
} as Meta;

const Template: StoryFn<ISidebarProps> = (args) => (
  <MemoryRouter>
    <Sidebar {...args} />
  </MemoryRouter>
);

export const Default = Template.bind({});
Default.args = {
  logoUrl: 'https://via.placeholder.com/300x150',
  logoAltText: 'Eztrak',
  items: [
    {
      name: 'Dashboard',
      icon: <FaDashcube />,
      link: '/dashboard',
    },
    {
      name: 'Home',
      icon: <FaHome />,
      link: '/home',
    },
    {
      name: 'User',
      icon: <FaUser />,
      link: '/user',
      subItems: [
        { name: 'Profile', link: '/user/profile' },
        { name: 'Settings', link: '/user/settings' },
      ],
    },
    {
      name: 'Settings',
      icon: <FaCog />,
      link: '/settings',
    },
    {
      name: 'Reports',
      icon: <FaUser />,
      link: '/reports',
      subItems: [
        { name: 'Monthly', link: '/reports/monthly' },
        { name: 'Annual', link: '/reports/annual' },
      ],
    },
    {
      name: 'Help',
      icon: <FaCog />,
      link: '/help',
    },
    {
      name: 'Logout',
      icon: <FaDoorOpen />,
      link: '/logout',
    }
  ],
  collapseButtonText: <FaChevronLeft />,
  expandButtonText: <FaChevronRight />,
  location: { pathname: '/home' },
  footer: <p>&copy; Eztrak 2024 All rights reserved.</p>,
};