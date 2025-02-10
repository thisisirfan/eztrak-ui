import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Popover from './Popover';
import { PopoverProps } from './types';

export default {
  title: 'Components/Popover',
  component: Popover,
  argTypes: {
    position: {
      control: {
        type: 'select',
        options: ['top', 'right', 'bottom', 'left'],
      },
    },
  },
} as Meta;

const Template: StoryFn<PopoverProps> = (args) => <Popover {...args} />;

export const Default = Template.bind({});
Default.args = {
  trigger: <button>Click me</button>,
  title: 'Popover Title',
  children: <div>Popover content goes here.</div>,
  position: 'top',
  width: 'w-64',
  className: '',
  closebtn: true,
};