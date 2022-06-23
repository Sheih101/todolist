import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Task} from '../components/Task';

export default {
    title: 'TODOLISTS/Task',
    component: Task,
    args: {
        removeTask: action('removeTask'),
        changeCheckbox: action('changeCheckbox'),
        updateTaskTitle: action('updateTaskTitle'),
        todolistID: 'asdas',
    }
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args}/>;

export const TaskIsDoneStories = Template.bind({});
TaskIsDoneStories.args = {
    task: {taskID: 'qqwe', isDone: true, title: 'JS'},
};

export const TaskIsNotDoneStories = Template.bind({});
TaskIsNotDoneStories.args = {
    task: {taskID: 'qqwe', isDone: false, title: 'HTML'},
};
