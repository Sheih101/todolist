import {Dispatch} from 'redux';
import {AppActionsType, setAppError, setAppStatus} from '../app/app-reducer';
import {ResponseType} from '../api/todolists-api';

export const handleNetworkError = (dispatch: Dispatch<AppActionsType>, message: string) => {
    dispatch(setAppError(message))
    dispatch(setAppStatus('failed'))
}

export const handleAppError = <T>(dispatch: Dispatch<AppActionsType>, data: ResponseType<T>) => {
    dispatch(setAppError(data.messages.length ? data.messages[0] : 'Some error occured'))
    dispatch(setAppStatus('failed'))
}