import React from 'react';
import './App.css';
import {TaskType, Todolist} from './components/Todolist';
import {UniversalInput} from './components/UniversalInput';
import {ButtonAppBar} from './components/ButtonAppBar';
import {Container, Grid, Paper} from '@mui/material';
import {addTodolist} from './state/todolists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';

export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodolistType = {
    todolistID: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const App = () => {

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)

    const addTodolistHandler = (title: string) => {
        dispatch(addTodolist(title))
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid style={{padding: '10px'}}>
                    <UniversalInput callBack={addTodolistHandler}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(todo => {
                        return (
                            <Grid key={todo.todolistID} item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist todolist={todo}/>
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}