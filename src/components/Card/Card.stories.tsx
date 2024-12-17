
import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import {Card} from './Card';
import { CardProps } from './Card.types';

export default {
  title: 'Components/Card',
  component: Card,
} as Meta;

const Template: StoryFn<CardProps> = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Card Title',
  content: 'This is the card content.',
  icon: <span>🔥</span>,
  onClick: () => alert('Card clicked!'),
  containerClassName: '',
  iconClassName: '',
  titleClassName: '',
  contentClassName: '',
};