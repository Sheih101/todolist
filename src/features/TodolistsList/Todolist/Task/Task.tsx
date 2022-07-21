import React, {ChangeEvent, useCallback} from 'react';
import {EditableSpan} from '../../../../common/components/EditableSpan/EditableSpan';
import {TaskStatuses, TaskType} from '../../../../api/todolists-api';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

type PropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeStatus: (taskId: string, status: TaskStatuses) => void
    updateTaskTitle: (taskId: string, title: string) => void
}

export const Task = React.memo(({task, removeTask, changeStatus, updateTaskTitle}: PropsType) => {
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const isDone = e.currentTarget.checked
        changeStatus(task.id, isDone ? TaskStatuses.Completed : TaskStatuses.New)
    }, [task.id])
    const updateTaskTitleHandler = useCallback((title: string) => {
        updateTaskTitle(task.id, title)
    }, [task.id])
    const onClickHandler = useCallback(() => {
        removeTask(task.id)
    }, [task.id])

    return (
        <div>
            <Checkbox onChange={onChangeHandler} checked={task.status === TaskStatuses.Completed}/>
            <EditableSpan value={task.title} callback={updateTaskTitleHandler}/>
            <IconButton onClick={onClickHandler}>
                <CloseIcon/>
            </IconButton>
        </div>
    )
})
