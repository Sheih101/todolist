import {todolistsAPI, TodolistType} from '../api/todolists-api';
import {AppThunk} from './store';

const initialState: TodolistDomainType[] = []

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: TodolistsActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            return [action.todolist, ...state]
        case 'REMOVE-TODOLIST':
            return state.filter(f => f.id !== action.todolistId)
        case 'UPDATE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)
        case 'CHANGE-FILTER':
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.newFilter} : tl)
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all'}))
        default:
            return state
    }
}


// Action Creators
export const addTodolist = (todolist: TodolistDomainType) => {
    return {type: 'ADD-TODOLIST', todolist} as const
}
export const removeTodolist = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', todolistId} as const
}
export const updateTodolistTitle = (todolistId: string, title: string) => {
    return {type: 'UPDATE-TODOLIST-TITLE', todolistId, title} as const
}
export const changeFilter = (todolistId: string, newFilter: FilterValuesType) => {
    return {type: 'CHANGE-FILTER', todolistId, newFilter} as const
}
export const setTodolists = (todolists: TodolistType[]) => {
    return {type: 'SET-TODOLISTS', todolists} as const
}


//Thunk Creators
export const addTodolistTC = (title: string): AppThunk => (dispatch) => {
    todolistsAPI.createTodolist(title)
        .then(res => {
            const todolistFromServer: TodolistType = res.data.data.item
            const newTodolist: TodolistDomainType = {...todolistFromServer, filter: 'all'}
            dispatch(addTodolist(newTodolist))
        })
}
export const removeTodolistTC = (todolistId: string): AppThunk => (dispatch) => {
    todolistsAPI.deleteTodolist(todolistId)
        .then(() => dispatch(removeTodolist(todolistId)))
}
export const updateTodolistTitleTC = (todolistId: string, title: string): AppThunk => (dispatch) => {
    todolistsAPI.updateTodolistTitle(todolistId, title)
        .then(() => dispatch(updateTodolistTitle(todolistId, title)))
}
export const setTodolistsTC = (): AppThunk => (dispatch) => {
    todolistsAPI.getTodolists()
        .then(res => dispatch(setTodolists(res.data)))
}


// Types
export type TodolistDomainType = TodolistType & { filter: FilterValuesType }
export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistsActionsType =
    | AddTodolistActionType
    | RemoveTodolistActionType
    | UpdateTodolistTitleActionType
    | ChangeFilterActionType
    | SetTodolistsActionType

export type AddTodolistActionType = ReturnType<typeof addTodolist>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolist>
export type UpdateTodolistTitleActionType = ReturnType<typeof updateTodolistTitle>
export type ChangeFilterActionType = ReturnType<typeof changeFilter>
export type SetTodolistsActionType = ReturnType<typeof setTodolists>




