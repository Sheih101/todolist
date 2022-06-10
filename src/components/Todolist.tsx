import React, {ChangeEvent} from 'react';
import {FilterValuesType, TodolistType} from '../App';
import {EditableSpan} from './EditableSpan';
import {UniversalInput} from './UniversalInput';
import {Button, Checkbox, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {pink} from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../state/store';
import {addTask, changeCheckbox, removeTask, updateTaskTitle} from '../state/tasks-reducer';
import {changeFilter, removeTodolist, updateTodolistTitle} from '../state/todolists-reducer';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type PropsType = {
    todolist: TodolistType
}

export function Todolist({todolist}: PropsType) {
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state =>
        state.tasks[todolist.id].filter(t =>
            todolist.filter === 'all' ? t : todolist.filter === 'completed' ? t.isDone : !t.isDone))
    // двойной тернарный оператор ( если бы мы использовали if else:
    // if (todolist.filter === 'all') {
    // return t
    // } else if (todolist.filter === 'completed') {
    // return t.isDone
    // } else {
    // return !t.isDone
    // }

    const addTaskHandler = (title: string) => {
        dispatch(addTask(todolist.id, title))
    }
    const removeTaskHandler = (taskID: string) => {
        dispatch(removeTask(todolist.id, taskID))
    }
    const updateTaskTitleHandler = (taskID: string, title: string) => {
        dispatch(updateTaskTitle(todolist.id, taskID, title))
    }
    const changeCheckboxHandler = (taskID: string, e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeCheckbox(todolist.id, taskID, e.currentTarget.checked))
    }
    const removeTodolistHandler = () => {
        dispatch(removeTodolist(todolist.id))
    }
    const changeFilterHandler = (filterValue: FilterValuesType) => {
        dispatch(changeFilter(todolist.id, filterValue))
    }
    const updateTodolistTitleHandler = (title: string) => {
        dispatch(updateTodolistTitle(todolist.id, title))
    }

    return (
        <div>
            <h3>
                <EditableSpan title={todolist.title} callBack={(title) => updateTodolistTitleHandler(title)}/>
                <IconButton aria-label={'delete'}>
                    <Delete onClick={removeTodolistHandler}/>
                </IconButton>
            </h3>
            <UniversalInput callBack={addTaskHandler}/>
            <ul>
                {tasks.map((t, i) => {
                    return (
                        <li key={`${t.id}-${i}`} className={`${t.isDone ? 'is-done' : ''} list-element`}>
                            <Checkbox defaultChecked
                                      onChange={(e) => changeCheckboxHandler(t.id, e)}
                                      checked={t.isDone}
                                      sx={{
                                          color: pink[800],
                                          '&.Mui-checked': {
                                              color: pink[600],
                                          }
                                      }}
                            />
                            <EditableSpan title={t.title} callBack={(title) => updateTaskTitleHandler(t.id, title)}/>
                            <IconButton aria-label={'delete'}>
                                <CloseIcon onClick={() => removeTaskHandler(t.id)} style={{}}/>
                            </IconButton>
                        </li>
                    )
                })}
            </ul>
            <div>
                <Button variant={todolist.filter === 'all' ? 'outlined' : 'contained'}
                        color={'success'}
                        onClick={() => changeFilterHandler('all')}
                        size={'small'}>All
                </Button>
                <Button variant={todolist.filter === 'active' ? 'outlined' : 'contained'}
                        color={'error'}
                        onClick={() => changeFilterHandler('active')}
                        size={'small'}>Active
                </Button>
                <Button variant={todolist.filter === 'completed' ? 'outlined' : 'contained'}
                        color={'secondary'}
                        onClick={() => changeFilterHandler('completed')}
                        size={'small'}>Completed
                </Button>
            </div>
        </div>
    )
}
