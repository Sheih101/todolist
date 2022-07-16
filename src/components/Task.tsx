import React, {ChangeEvent} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import {EditableSpan} from './EditableSpan';
import CloseIcon from '@mui/icons-material/Close';
import {TaskStatuses, TaskType} from '../api/todolists-api';

type PropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeCheckbox: (taskId: string, status: TaskStatuses) => void
    updateTaskTitle: (taskId: string, title: string) => void
}

export const Task = React.memo(({task, removeTask, changeCheckbox, updateTaskTitle}: PropsType) => {

    const removeTaskHandler = () => {
        removeTask(task.id)
    }
    const changeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const isDone = e.currentTarget.checked
        changeCheckbox(task.id, isDone ? TaskStatuses.Completed : TaskStatuses.New)
    }
    const updateTaskTitleHandler = (title: string) => {
        updateTaskTitle(task.id, title)
    }

    return (
        <div className={task.status === TaskStatuses.Completed ? 'is-done' : ''}>
            <Checkbox onChange={changeCheckboxHandler} checked={task.status === TaskStatuses.Completed}/>
            <EditableSpan title={task.title} callBack={updateTaskTitleHandler}/>
            <IconButton onClick={removeTaskHandler}>
                <CloseIcon/>
            </IconButton>
        </div>
    )
})
