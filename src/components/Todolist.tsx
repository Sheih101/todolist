import React, {useEffect} from 'react';
import {EditableSpan} from './EditableSpan';
import {UniversalInput} from './UniversalInput';
import {Button, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {Task} from './Task';
import {addTaskTC, changeCheckboxTC, removeTaskTC, setTasksTC, updateTaskTitleTC} from '../state/tasks-reducer';
import {
    changeFilter,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType,
    updateTodolistTitleTC
} from '../state/todolists-reducer';
import {TaskStatuses} from '../api/todolists-api';
import {useAppDispatch, useAppSelector} from '../hooks';

export const Todolist = React.memo(({todolist}: { todolist: TodolistDomainType }) => {

    const tasks = useAppSelector(state => state.tasks[todolist.id])
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setTasksTC(todolist.id))
    }, [])

    let tasksForTodolist = tasks
    if (todolist.filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (todolist.filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    const addTaskHandler = (title: string) => {
        dispatch(addTaskTC(todolist.id, title))
    }
    const removeTaskHandler = (taskId: string) => {
        dispatch(removeTaskTC(todolist.id, taskId))
    }
    const updateTaskTitleHandler = (taskId: string, title: string) => {
        dispatch(updateTaskTitleTC(todolist.id, taskId, title))
    }
    const changeCheckboxHandler = (taskId: string, status: TaskStatuses) => {
        dispatch(changeCheckboxTC(todolist.id, taskId, status))
    }
    const removeTodolistHandler = () => {
        dispatch(removeTodolistTC(todolist.id))
    }
    const changeFilterHandler = (filterValue: FilterValuesType) => {
        dispatch(changeFilter(todolist.id, filterValue))
    }
    const updateTodolistTitleHandler = (title: string) => {
        dispatch(updateTodolistTitleTC(todolist.id, title))
    }

    return (
        <div>
            <h3>
                <EditableSpan title={todolist.title} callBack={updateTodolistTitleHandler}/>
                <IconButton aria-label={'delete'} onClick={removeTodolistHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <UniversalInput callBack={addTaskHandler}/>
            <div>
                {
                    tasksForTodolist.map(task =>
                        <Task key={task.id}
                              task={task}
                              removeTask={removeTaskHandler}
                              changeCheckbox={changeCheckboxHandler}
                              updateTaskTitle={updateTaskTitleHandler}
                        />)
                }
            </div>
            <div style={{paddingTop: '5px'}}>
                <Button variant={todolist.filter === 'all' ? 'contained' : 'outlined'}
                        onClick={() => changeFilterHandler('all')}
                        color={'primary'}
                        size={'small'}
                        style={{margin: '5px'}}>All
                </Button>
                <Button variant={todolist.filter === 'active' ? 'contained' : 'outlined'}
                        onClick={() => changeFilterHandler('active')}
                        color={'primary'}
                        size={'small'}
                        style={{margin: '5px'}}>Active
                </Button>
                <Button variant={todolist.filter === 'completed' ? 'contained' : 'outlined'}
                        onClick={() => changeFilterHandler('completed')}
                        color={'primary'}
                        size={'small'}
                        style={{margin: '5px'}}>Completed
                </Button>
            </div>
        </div>
    )
})
