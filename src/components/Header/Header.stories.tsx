
import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Header } from './Header';
import { HeaderProps } from './Header.types';
import './Header.scss';

export default {
    title: 'Header',
    component: Header,
} as Meta;

const Template: StoryFn<HeaderProps> = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
    title: 'Header',
    className: 'bg-blue-500 text-white p-4',
    containerClass: '',
    breadcrumbs: 'Home / Dashboard',
    children: <>
        <div className={` flex flex-row justify-start items-center gap-2`}>
            {<span>Project</span>}
            {<span>New Project</span>}
        </div>
        <button
            onClick={() => { }}
            className={` py-2 flex justify-between items-center gap-2`}
        >
            Add
        </button>
    </>
};

export const Custom = Template.bind({});
Custom.args = {
    title: 'Custom Header',
    className: 'bg-green-500 text-black',
    containerClass: 'p-4',
    breadcrumbs: 'Home / Custom Page',
};