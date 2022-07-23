import React, {useEffect} from 'react';
import {TodolistsList} from '../features/TodolistsList/TodolistsList';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {useAppDispatch, useAppSelector} from '../common/hooks';
import {ErrorSnackbar} from '../common/components/ErrorSnackbar/ErrorSnackbar';
import {Login} from '../features/Login/Login';
import {Navigate, Route, Routes} from 'react-router-dom';
import {initializeAppTC} from './app-reducer';
import {CircularProgress} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {logoutTC} from '../features/Login/auth-reducer';

export const App = () => {
    const status = useAppSelector(state => state.app.status)
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return (
            <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
                <CircularProgress/>
            </div>
        )
    }

    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="large"
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
                    {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                </Toolbar>
            </AppBar>
            {status === 'loading' && <LinearProgress color={'secondary'}/>}
            <Container fixed>
                <Routes>
                    <Route path="/" element={<TodolistsList/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="404" element={<h1 style={{textAlign: 'center'}}>404: PAGE NOT FOUND</h1>}/>
                    <Route path="*" element={<Navigate to="404"/>}/>
                </Routes>
            </Container>
            <ErrorSnackbar/>
        </div>
    )
}