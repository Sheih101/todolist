import React from 'react';
import {FilterValuesType, TodolistType} from '../App';
import {EditableSpan} from './EditableSpan';
import {UniversalInput} from './UniversalInput';
import {Button, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {Task} from './Task';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../state/store';
import {addTask, changeCheckbox, removeTask, updateTaskTitle} from '../state/tasks-reducer';
import {changeFilter, removeTodolist, updateTodolistTitle} from '../state/todolists-reducer';

export type TaskType = {
    taskID: string
    title: string
    isDone: boolean
}
type PropsType = {
    todolist: TodolistType
}

export const Todolist: React.FC<PropsType> = React.memo(({todolist}: PropsType) => {

    const dispatch = useDispatch()
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todolist.todolistID])

    let tasksForTodolist = tasks
    if (todolist.filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }
    if (todolist.filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }

    const addTaskHandler = (title: string) => {
        dispatch(addTask(todolist.todolistID, title))
    }
    const removeTaskHandler = (taskID: string) => {
        dispatch(removeTask(todolist.todolistID, taskID))
    }
    const updateTaskTitleHandler = (taskID: string, title: string) => {
        dispatch(updateTaskTitle(todolist.todolistID, taskID, title))
    }
    const changeCheckboxHandler = (taskID: string, isDone: boolean) => {
        dispatch(changeCheckbox(todolist.todolistID, taskID, isDone))
    }
    const removeTodolistHandler = () => {
        dispatch(removeTodolist(todolist.todolistID))
    }
    const changeFilterHandler = (filterValue: FilterValuesType) => {
        dispatch(changeFilter(todolist.todolistID, filterValue))
    }
    const updateTodolistTitleHandler = (title: string) => {
        dispatch(updateTodolistTitle(todolist.todolistID, title))
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
                {tasksForTodolist.map(t =>
                    <Task key={t.taskID}
                          task={t} //task
                          removeTask={removeTaskHandler}
                          changeCheckbox={changeCheckboxHandler}
                          updateTaskTitle={updateTaskTitleHandler}
                    />)}
            </div>
            <div>
                <Button variant={todolist.filter === 'all' ? 'outlined' : 'contained'}
                        color={'success'}
                        onClick={() => changeFilterHandler('all')}
                        size={'small'}
                        style={{margin: '5px'}}
                >All
                </Button>
                <Button variant={todolist.filter === 'active' ? 'outlined' : 'contained'}
                        color={'error'}
                        onClick={() => changeFilterHandler('active')}
                        size={'small'}
                        style={{margin: '5px'}}
                >Active
                </Button>
                <Button variant={todolist.filter === 'completed' ? 'outlined' : 'contained'}
                        color={'secondary'}
                        onClick={() => changeFilterHandler('completed')}
                        size={'small'}
                        style={{margin: '5px'}}
                >Completed
                </Button>
            </div>
        </div>
    )
})
