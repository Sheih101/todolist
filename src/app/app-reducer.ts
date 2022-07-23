import {authAPI, ResultCode} from '../api/todolists-api';
import {AppThunkType} from './store';
import {setIsLoggedIn} from '../features/Login/auth-reducer';
import {handleAppError, handleNetworkError} from '../utils/error-utils';

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as null | string,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

export const setAppStatus = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppError = (error: null | string) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppIsInitialized = (isInitialized: boolean) => ({type: 'APP/SET-IS-INITIALIZED', isInitialized} as const)


export const initializeAppTC = (): AppThunkType => (dispatch) => {
    dispatch(setAppStatus('loading'))
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === ResultCode.success) {
                dispatch(setIsLoggedIn(true))
                dispatch(setAppStatus('succeeded'))
            } else {
                handleAppError(dispatch, res.data)
            }
        })
        .catch(error => {
            handleNetworkError(dispatch, error)
        })
        .finally(() => {
            dispatch(setAppIsInitialized(true))
        })
}

// Types
type InitialStateType = typeof initialState
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppActionsType =
    | SetAppStatusActionType
    | SetAppErrorActionType
    | SetAppIsInitializedActionType

export type SetAppStatusActionType = ReturnType<typeof setAppStatus>
export type SetAppErrorActionType = ReturnType<typeof setAppError>
export type SetAppIsInitializedActionType = ReturnType<typeof setAppIsInitialized>