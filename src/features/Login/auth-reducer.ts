import {setAppStatus} from '../../app/app-reducer'
import {AppThunkType} from '../../app/store';
import {authAPI, LoginParamsType, ResultCode} from '../../api/todolists-api';
import {handleAppError, handleNetworkError} from '../../utils/error-utils';
import {AxiosError} from 'axios';
import {clearData, ClearDataActionType} from '../TodolistsList/todolists-reducer';

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}


// Action creators
export const setIsLoggedIn = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)


// Thunk Creators
export const logInTC = (data: LoginParamsType): AppThunkType => (dispatch) => {
    dispatch(setAppStatus('loading'))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === ResultCode.success) {
                dispatch(setIsLoggedIn(true))
                dispatch(setAppStatus('succeeded'))
            } else {
                handleAppError(dispatch, res.data)
            }
        })
        .catch((error: AxiosError) => {
            handleNetworkError(dispatch, error.message)
        })
}
export const logOutTC = (): AppThunkType => (dispatch) => {
    dispatch(setAppStatus('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === ResultCode.success) {
                dispatch(setIsLoggedIn(false))
                dispatch(setAppStatus('succeeded'))
                dispatch(clearData())
            } else {
                handleAppError(dispatch, res.data)
            }
        })
        .catch((error: AxiosError) => {
            handleNetworkError(dispatch, error.message)
        })
}


// Types
export type AuthActionsType = SetIsLoggedInType | ClearDataActionType
type SetIsLoggedInType = ReturnType<typeof setIsLoggedIn>