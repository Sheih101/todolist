import {v1} from 'uuid';
import {FilterValuesType, TodolistType} from '../App';

type ActionsType =
    AddTodolistType
    | RemoveTodolistType
    | UpdateTodolistTitleType
    | ChangeFilterType

const initialState: Array<TodolistType> = []

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            return [{id: action.todolistID, title: action.newTodolistTitle, filter: 'all'}, ...state]
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(f => f.id !== action.todolistID)
        }
        case 'UPDATE-TODOLIST-TITLE': {
            return state.map(m => m.id === action.todolistID ? {
                ...m,
                title: action.newTodolistTitle
            } : m)
        }
        case 'CHANGE-FILTER': {
            return state.map(m => m.id === action.todolistID ? {...m, filter: action.newFilter} : m)
        }
        default:
            return state
    }
}

export type AddTodolistType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (newTodolistTitle: string) => {
    return {type: 'ADD-TODOLIST', todolistID: v1(), newTodolistTitle} as const
}

export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistID: string) => {
    return {type: 'REMOVE-TODOLIST', todolistID} as const
}

type UpdateTodolistTitleType = ReturnType<typeof updateTodolistTitleAC>
export const updateTodolistTitleAC = (todolistID: string, newTodolistTitle: string) => {
    return {type: 'UPDATE-TODOLIST-TITLE', todolistID, newTodolistTitle} as const
}

type ChangeFilterType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todolistID: string, newFilter: FilterValuesType) => {
    return {type: 'CHANGE-FILTER', todolistID, newFilter} as const
}