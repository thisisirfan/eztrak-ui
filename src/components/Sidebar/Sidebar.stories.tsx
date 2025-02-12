import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { Sidebar } from './Sidebar';
import { ISidebarProps } from './ISidebarProps';

import { FaHome, FaUser, FaCog, FaChevronLeft, FaChevronRight, FaDoorOpen, FaDashcube, FaAddressCard, Fa500Px, FaDocker, FaHeart } from 'react-icons/fa';

export default {
  title: 'Sidebar',
  component: Sidebar,
} as Meta;

const Template: StoryFn<ISidebarProps> = (args) => (
  
  <Router>
    <Sidebar {...args} />
  </Router>
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
      name: 'Export',
      component: () => <div onClick={()=>alert('hello world')}>Export</div>,
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
        { name: 'Profile', link: '/user/profile', icon: <FaAddressCard /> },
        { name: 'Settings', link: '/user/settings', icon: <Fa500Px /> },
      ],
    },
    {
      name: 'Reports',
      icon: <FaDocker />,
      link: '/reports',
      subItems: [
        { name: 'Monthly', link: '/reports/monthly' },
        { name: 'Annual', link: '/reports/annual' },
      ],
    },
    {
      name: 'Help',
      icon: <FaHeart />,
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