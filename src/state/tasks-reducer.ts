import {v1} from 'uuid';
import {AddTodolistType, RemoveTodolistType} from './todolists-reducer';
import {TasksStateType} from '../App';

type ActionsType =
    AddTaskType
    | RemoveTaskType
    | UpdateTaskTitleType
    | ChangeCheckboxType
    | AddTodolistType
    | RemoveTodolistType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'ADD-TASK': {
            const newTask = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            return {
                ...state,
                [action.todolistID]: [newTask, ...state[action.todolistID]]
            }
        }
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(f => f.id !== action.taskID)
            }
        }
        case 'UPDATE-TASK-TITLE': {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(m => m.id === action.taskID ? {
                    ...m,
                    title: action.newTaskTitle
                } : m)
            }
        }
        case 'CHANGE-CHECKBOX': {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(m => m.id === action.taskID ? {
                    ...m,
                    isDone: action.isDone
                } : m)
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistID]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.todolistID]
            return copyState
        }
        default:
            return state
    }
}

type AddTaskType = ReturnType<typeof addTask>
export const addTask = (todolistID: string, title: string) => {
    return {type: 'ADD-TASK', todolistID, title} as const
}

type RemoveTaskType = ReturnType<typeof removeTask>
export const removeTask = (todolistID: string, taskID: string) => {
    return {type: 'REMOVE-TASK', todolistID, taskID} as const
}

type UpdateTaskTitleType = ReturnType<typeof updateTaskTitle>
export const updateTaskTitle = (todolistID: string, taskID: string, newTaskTitle: string) => {
    return {type: 'UPDATE-TASK-TITLE', todolistID, taskID, newTaskTitle} as const
}

type ChangeCheckboxType = ReturnType<typeof changeCheckbox>
export const changeCheckbox = (todolistID: string, taskID: string, isDone: boolean) => {
    return {type: 'CHANGE-CHECKBOX', todolistID, taskID, isDone} as const
}