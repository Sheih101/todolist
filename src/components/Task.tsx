import React, {ChangeEvent} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import {pink} from '@mui/material/colors';
import {EditableSpan} from './EditableSpan';
import CloseIcon from '@mui/icons-material/Close';
import {TaskType} from './Todolist';

type PropsType = {
    task: TaskType
    removeTask: (taskID: string) => void
    changeCheckbox: (taskID: string, isDone: boolean) => void
    updateTaskTitle: (taskID: string, title: string) => void
}

export const Task = React.memo(({task, removeTask, changeCheckbox, updateTaskTitle}: PropsType) => {
    const taskClassName = `${task.isDone ? 'is-done' : ''} list-element`

    const removeTaskHandler = () => {
        removeTask(task.taskID)
    }
    const changeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeCheckbox(task.taskID, e.currentTarget.checked)
    }
    const updateTaskTitleHandler = (title: string) => {
        updateTaskTitle(task.taskID, title)
    }

    return (
        <div className={taskClassName}>
            <Checkbox onChange={changeCheckboxHandler}
                      checked={task.isDone}
                      sx={{
                          color: pink[800],
                          '&.Mui-checked': {
                              color: pink[600],
                          }
                      }}
            />
            <EditableSpan title={task.title} callBack={updateTaskTitleHandler}/>
            <IconButton aria-label={'delete'} onClick={removeTaskHandler}>
                <CloseIcon/>
            </IconButton>
        </div>
    )
})
