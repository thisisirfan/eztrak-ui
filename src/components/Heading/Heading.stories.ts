import { title } from 'process';
import { Heading } from './Heading';

export default {
  title: 'Components/Heading',
  component: Heading,
};

export const Default = {
  args: {
    level: 1,
    children: 'Default Heading',
    title: 'Heading Title',
    description: 'Default description',
    color: 'black',
  },
};

export const H1 = {
  args: {
    level: 1,
    children: 'Heading Level 1',
    title: 'Heading Title',
    description: 'description Level 1',
    color: 'red',
  },
};

export const H2 = {
  args: {
    level: 2,
    children: 'Heading Level 2',
    description: 'description Level 2',
    color: 'blue',
  },
};

export const H3 = {
  args: {
    level: 3,
    children: 'Heading Level 3',
    description: 'description Level 3',
    color: 'green',
  },
};

export const H4 = {
  args: {
    level: 4,
    children: 'Heading Level 4',
    description: 'description Level 4',
    color: 'purple',
  },
};

export const H5 = {
  args: {
    level: 5,
    children: 'Heading Level 5',
    description: 'description Level 5',
    color: 'orange',
  },
};

export const H6 = {
  args: {
    level: 6,
    children: 'Heading Level 6',
    description: 'description Level 6',
    color: 'brown',
  },
};
