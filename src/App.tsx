import React, {useEffect} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';
import {UniversalInput} from './components/UniversalInput';
import {Container, Grid, Paper} from '@mui/material';
import {addTodolistTC, setTodolistsTC} from './state/todolists-reducer';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import {useAppDispatch, useAppSelector} from './hooks';

export const App = () => {

    const todolists = useAppSelector(state => state.todolists)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setTodolistsTC())
    }, [])

    const addTodolistHandler = (title: string) => {
        dispatch(addTodolistTC(title))
    }

    return (
        <div className="App">
            <AppBar position="static" style={{backgroundColor: '#121212'}}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Todolist
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid style={{padding: '10px'}}>
                    <UniversalInput callBack={addTodolistHandler}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(tl => {
                        return (
                            <Grid key={tl.id} item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist todolist={tl}/>
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    )
}