import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import {pink} from '@mui/material/colors';
import {EditableSpan} from './EditableSpan';
import CloseIcon from '@mui/icons-material/Close';
import {TaskType} from './Todolist';

type PropsType = {
    task: TaskType
    todolistID: string
    removeTask: (todolistID: string, taskId: string) => void
    changeCheckbox: (todolistID: string, taskID: string, isDone: boolean) => void
    updateTaskTitle: (todolistID: string, taskID: string, title: string) => void
}

export const Task = React.memo(({task, ...props}: PropsType) => {

    const taskClassName = `${task.isDone ? 'is-done' : ''} list-element`

    const removeTaskHandler = useCallback(() => {
        props.removeTask(props.todolistID, task.taskID)
    }, [props.removeTask, props.todolistID])
    const changeCheckboxHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.changeCheckbox(props.todolistID, task.taskID, e.currentTarget.checked)
    }, [props.changeCheckbox, props.todolistID])
    const updateTaskTitleHandler = useCallback((title: string) => {
        props.updateTaskTitle(props.todolistID, task.taskID, title)
    }, [props.updateTaskTitle, props.todolistID])

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
