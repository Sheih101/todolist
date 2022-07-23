import React, {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../common/hooks';
import {addTodolistTC, setTodolistsTC} from './todolists-reducer';
import {AddItemForm} from '../../common/components/AddItemForm/AddItemForm';
import {Todolist} from './Todolist/Todolist';
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import {Navigate} from 'react-router-dom';

export const TodolistsList = () => {
    const todolists = useAppSelector(state => state.todolists)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(setTodolistsTC())
        }
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [])

    if (!isLoggedIn) {
        return <Navigate to="login"/>
    }
    return (
        <div>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {
                    todolists.map(tl => {
                        return (
                            <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist todolist={tl}/>
                                </Paper>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </div>
    )
}

