import {FilterValuesType, TodolistType} from '../App';
import {v1} from 'uuid';

type ActionsType = AddTodolistType | RemoveTodolistType | UpdateTodolistTitleType | ChangeFilterType

export const todolistsReducer = (state: Array<TodolistType>, action: ActionsType) => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            const newTodolist = {
                id: action.todolistID,
                title: action.newTodolistTitle,
                filter: 'all'
            }
            return [newTodolist, ...state]
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

export type AddTodolistType = ReturnType<typeof addTodolist>
export const addTodolist = (newTodolistTitle: string) => {
    return {type: 'ADD-TODOLIST', todolistID: v1(), newTodolistTitle} as const
}

export type RemoveTodolistType = ReturnType<typeof removeTodolist>
export const removeTodolist = (todolistID: string) => {
    return {type: 'REMOVE-TODOLIST', todolistID} as const
}

type UpdateTodolistTitleType = ReturnType<typeof updateTodolistTitle>
export const updateTodolistTitle = (todolistID: string, newTodolistTitle: string) => {
    return {type: 'UPDATE-TODOLIST-TITLE', todolistID, newTodolistTitle} as const
}

type ChangeFilterType = ReturnType<typeof changeFilter>
export const changeFilter = (todolistID: string, newFilter: FilterValuesType) => {
    return {type: 'CHANGE-FILTER', todolistID, newFilter} as const
}