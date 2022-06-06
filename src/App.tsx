import React from 'react';
import './App.css';
import {TaskType, Todolist} from './components/Todolist';
import {UniversalInput} from './components/UniversalInput';
import {ButtonAppBar} from './components/ButtonAppBar';
import {Container, Grid, Paper} from '@mui/material';
import {addTodolistAC} from './state/todolists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';

export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export function App() {
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const dispatch = useDispatch()
    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    }
    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '10px'}} justifyContent="center">
                    <UniversalInput callBack={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map((tl, i) => {
                        return (
                            <Grid key={`${tl.id}-${i}`} item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist todolist={tl}/>
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}