
import React from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { Sidebar, ISidebarProps } from './Sidebar';

type Story = StoryObj<typeof Sidebar>;

export default {
  title: 'Sidebar',
  component: Sidebar,
} as Meta;

const Template: StoryFn<ISidebarProps> = (args:any) => <Sidebar {...args}></Sidebar>;

export const Default = Template.bind({});
Default.args = {
  children: <ul>
    <li>Home</li>
    <li>About</li>
    <li>Contact</li>
  </ul>,
};

export const WithCustomClass = Template.bind({});
WithCustomClass.args = {
  className: 'custom-class',
  children: 'Sidebar with custom class',
};