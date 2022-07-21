import React from 'react';
import {BasicAppBar} from '../common/components/BasicAppBar/BasicAppBar';
import {TodolistsList} from '../features/TodolistsList/TodolistsList';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {useAppSelector} from '../common/hooks';
import {ErrorSnackbar} from '../common/components/ErrorSnackbar/ErrorSnackbar';

export const App = () => {
    const status = useAppSelector(state => state.app.status)

    return (
        <div>
            <BasicAppBar/>
            {status === 'loading' && <LinearProgress color={'secondary'}/>}
            <Container fixed>
                <TodolistsList/>
            </Container>
            <ErrorSnackbar/>
        </div>
    )
}