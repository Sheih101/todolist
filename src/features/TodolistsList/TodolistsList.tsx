import React, {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../common/hooks';
import {addTodolistTC, setTodolistsTC} from './todolists-reducer';
import {AddItemForm} from '../../common/components/AddItemForm/AddItemForm';
import {Todolist} from './Todolist/Todolist';
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

export const TodolistsList = () => {
    const todolists = useAppSelector(state => state.todolists)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setTodolistsTC())
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [])

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

