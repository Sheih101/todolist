import React, {useState} from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Task} from '../components/Task';
import {TaskType} from '../components/Todolist';

export default {
    title: 'TODOLISTS/TaskWithLocalState',
    component: Task,
    args: {
        removeTask: action('removeTask'),
        changeCheckbox: action('changeCheckbox'),
        updateTaskTitle: action('updateTaskTitle'),
        todolistID: 'asdas',
    }
} as ComponentMeta<typeof Task>;

const TaskWithLocalState = () => {

    const [task, setTask] = useState<TaskType>({taskID: 'qqwe', title: 'JS', isDone: false})

    const changeCheckbox = () => setTask({...task, isDone: !task.isDone})
    const updateTaskTitle = (todolistID: string, taskID: string, title: string) => {
        setTask({...task, title})
    }

    return (
        <Task task={task}
              todolistID={'sadxzc'}
              removeTask={action('removeTask')}
              changeCheckbox={changeCheckbox}
              updateTaskTitle={updateTaskTitle}
        />
    )
}

const Template: ComponentStory<typeof TaskWithLocalState> = () => <TaskWithLocalState/>;

export const TaskWithLocalStateStories = Template.bind({});
TaskWithLocalStateStories.args = {};
