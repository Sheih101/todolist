import {ResultCode, todolistsAPI, TodolistType} from '../../api/todolists-api';
import {AppThunkType} from '../../app/store';
import {RequestStatusType, setAppStatus} from '../../app/app-reducer';
import {handleAppError, handleNetworkError} from '../../utils/error-utils';
import {AxiosError} from 'axios';
import {setTasksTC} from './tasks-reducer';

const initialState: TodolistDomainType[] = []

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: TodolistsActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            return [action.todolist, ...state]
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'UPDATE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.newFilter} : tl)
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        case 'CLEAR-DATA':
            return []
        default:
            return state
    }
}


// Action Creators
export const addTodolist = (todolist: TodolistDomainType) =>
    ({type: 'ADD-TODOLIST', todolist} as const)
export const removeTodolist = (id: string) =>
    ({type: 'REMOVE-TODOLIST', id} as const)
export const updateTodolistTitle = (id: string, title: string) =>
    ({type: 'UPDATE-TODOLIST-TITLE', id, title} as const)
export const changeFilter = (id: string, newFilter: FilterValuesType) =>
    ({type: 'CHANGE-FILTER', id, newFilter} as const)
export const changeTodolistEntityStatus = (id: string, entityStatus: RequestStatusType) =>
    ({type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, entityStatus} as const)
export const setTodolists = (todolists: TodolistType[]) =>
    ({type: 'SET-TODOLISTS', todolists} as const)
export const clearData = () =>
    ({type: 'CLEAR-DATA'} as const)


//Thunk Creators
export const addTodolistTC = (title: string): AppThunkType => (dispatch) => {
    dispatch(setAppStatus('loading'))
    todolistsAPI.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === ResultCode.success) {
                const todolistFromServer: TodolistType = res.data.data.item
                const newTodolist: TodolistDomainType = {...todolistFromServer, filter: 'all', entityStatus: 'idle'}
                dispatch(addTodolist(newTodolist))
                dispatch(setAppStatus('succeeded'))
            } else {
                handleAppError(dispatch, res.data)
            }
        })
        .catch((error: AxiosError) => {
            handleNetworkError(dispatch, error.message)
        })
}
export const removeTodolistTC = (id: string): AppThunkType => (dispatch) => {
    dispatch(setAppStatus('loading'))
    dispatch(changeTodolistEntityStatus(id, 'loading'))
    todolistsAPI.deleteTodolist(id)
        .then(res => {
            if (res.data.resultCode === ResultCode.success) {
                dispatch(removeTodolist(id))
                dispatch(setAppStatus('succeeded'))
            } else {
                handleAppError(dispatch, res.data)
                dispatch(changeTodolistEntityStatus(id, 'failed'))
            }
        })
        .catch((error: AxiosError) => {
            handleNetworkError(dispatch, error.message)
        })
}
export const updateTodolistTitleTC = (id: string, title: string): AppThunkType => (dispatch) => {
    dispatch(setAppStatus('loading'))
    todolistsAPI.updateTodolistTitle(id, title)
        .then(res => {
            if (res.data.resultCode === ResultCode.success) {
                dispatch(updateTodolistTitle(id, title))
                dispatch(setAppStatus('succeeded'))
            } else {
                handleAppError(dispatch, res.data)
            }
        })
        .catch((error: AxiosError) => {
            handleNetworkError(dispatch, error.message)
        })
}
export const setTodolistsTC = (): AppThunkType => (dispatch) => {
    dispatch(setAppStatus('loading'))
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setTodolists(res.data))
            dispatch(setAppStatus('succeeded'))
            return res.data
        })
        .then(todos => {
            todos.forEach(tl => {
                dispatch(setTasksTC(tl.id))
            })
        })
        .catch((error: AxiosError) => {
            handleNetworkError(dispatch, error.message)
        })
}


// Types
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
export type FilterValuesType = 'all' | 'active' | 'completed'


export type TodolistsActionsType =
    | AddTodolistActionType
    | RemoveTodolistActionType
    | UpdateTodolistTitleActionType
    | ChangeFilterActionType
    | ChangeTodolistEntityStatusActionType
    | SetTodolistsActionType
    | ClearDataActionType

export type AddTodolistActionType = ReturnType<typeof addTodolist>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolist>
export type UpdateTodolistTitleActionType = ReturnType<typeof updateTodolistTitle>
export type ChangeFilterActionType = ReturnType<typeof changeFilter>
export type ChangeTodolistEntityStatusActionType = ReturnType<typeof changeTodolistEntityStatus>
export type SetTodolistsActionType = ReturnType<typeof setTodolists>
export type ClearDataActionType = ReturnType<typeof clearData>




