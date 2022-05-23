import {TodolistsType} from '../App';

type ActionsType = AddTodolistType | RemoveTodolistType | UpdateTodolistTitleType

export const todolistsReducer = (state: Array<TodolistsType>, action: ActionsType) => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            const newTodolist = {
                id: action.payload.newTodolistID,
                title: action.payload.newTodolistTitle,
                filter: "all"
            }
            return [...state, newTodolist]
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(f => f.id !== action.payload.todolistID)
        }
        case 'UPDATE-TODOLIST-TITLE': {
            return state.map(m => m.id === action.payload.todolistID ? {
                ...m,
                title: action.payload.newTodolistTitle
            } : m)
        }
        default:
            return state
    }
}

type AddTodolistType = ReturnType<typeof addTodolist>
export const addTodolist = (newTodolistID: string, newTodolistTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {newTodolistID, newTodolistTitle}
    } as const
}

type RemoveTodolistType = ReturnType<typeof removeTodolist>
export const removeTodolist = (todolistID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {todolistID}
    } as const
}

type UpdateTodolistTitleType = ReturnType<typeof updateTodolistTitle>
export const updateTodolistTitle = (todolistID: string, newTodolistTitle: string) => {
    return {
        type: 'UPDATE-TODOLIST-TITLE',
        payload: {todolistID, newTodolistTitle}
    } as const
}