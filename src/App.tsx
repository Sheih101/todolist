import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './components/Todolist';
import {UniversalInput} from './components/UniversalInput';
import {ButtonAppBar} from './components/ButtonAppBar';
import {Container, Grid, Paper} from '@mui/material';
import {addTodolistAC, changeFilterAC, removeTodolistAC, updateTodolistTitleAC} from './state/todolists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {addTaskAC, changeCheckboxAC, removeTaskAC, updateTaskTitleAC} from './state/tasks-reducer';

export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const App = React.memo(() => {

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const addTask = useCallback((todolistID: string, title: string) => {
        dispatch(addTaskAC(todolistID, title))
    }, [])
    const removeTask = useCallback((todolistID: string, taskID: string) => {
        dispatch(removeTaskAC(todolistID, taskID))
    }, [])
    const updateTaskTitle = useCallback((todolistID: string, taskID: string, title: string) => {
        dispatch(updateTaskTitleAC(todolistID, taskID, title))
    }, [])
    const changeCheckbox = useCallback((todolistID: string, taskID: string, isDone: boolean) => {
        dispatch(changeCheckboxAC(todolistID, taskID, isDone))
    }, [])
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [])
    const removeTodolist = useCallback((todolistID: string) => {
        dispatch(removeTodolistAC(todolistID))
    }, [])
    const updateTodolistTitle = useCallback((todolistID: string, title: string) => {
        dispatch(updateTodolistTitleAC(todolistID, title))
    }, [])
    const changeFilter = useCallback((todolistID: string, value: FilterValuesType) => {
        dispatch(changeFilterAC(todolistID, value))
    }, [])

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '10px'}} justifyContent="center">
                    <UniversalInput callBack={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(tl => {
                        let tasksForTodolist = tasks[tl.id]
                        return (
                            <Grid key={tl.id} item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist todolistID={tl.id}
                                              tasks={tasksForTodolist}
                                              title={tl.title}
                                              filter={tl.filter}
                                              addTask={addTask}
                                              removeTask={removeTask}
                                              updateTaskTitle={updateTaskTitle}
                                              changeCheckbox={changeCheckbox}
                                              changeFilter={changeFilter}
                                              removeTodolist={removeTodolist}
                                              updateTodolistTitle={updateTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
})