import {AddTodolistActionType, ClearDataActionType, RemoveTodolistActionType, SetTodolistsActionType} from './todolists-reducer';
import {ResultCode, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../../api/todolists-api';
import {AppThunkType, RootStateType} from '../../app/store';
import {setAppStatus} from '../../app/app-reducer';
import {AxiosError} from 'axios';
import {handleAppError, handleNetworkError} from '../../utils/error-utils';

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'UPDATE-TASK-TITLE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.title
                } : t)
            }
        case 'CHANGE-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    status: action.status
                } : t)
            }
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks}
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST': {
            let stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case 'CLEAR-DATA':
            return {}
        default:
            return state
    }
}


// Action Creators
export const addTask = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const)
export const removeTask = (todolistId: string, taskId: string) =>
    ({type: 'REMOVE-TASK', todolistId, taskId} as const)
export const updateTaskTitle = (todolistId: string, taskId: string, title: string) =>
    ({type: 'UPDATE-TASK-TITLE', todolistId, taskId, title} as const)
export const changeCheckbox = (todolistId: string, taskId: string, status: TaskStatuses) =>
    ({type: 'CHANGE-STATUS', todolistId, taskId, status} as const)
export const setTasks = (todolistId: string, tasks: TaskType[]) =>
    ({type: 'SET-TASKS', todolistId, tasks} as const)


// Thunk Creators
export const addTaskTC = (todolistId: string, title: string): AppThunkType => (dispatch) => {
    dispatch(setAppStatus('loading'))
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === ResultCode.success) {
                const newTask = res.data.data.item
                dispatch(addTask(newTask))
                dispatch(setAppStatus('succeeded'))
            } else {
                handleAppError(dispatch, res.data)
            }
        })
        .catch((error: AxiosError) => {
            handleNetworkError(dispatch, error.message)
        })
}
export const removeTaskTC = (todolistId: string, taskId: string): AppThunkType => (dispatch) => {
    dispatch(setAppStatus('loading'))
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(res => {
            if (res.data.resultCode === ResultCode.success) {
                dispatch(removeTask(todolistId, taskId))
                dispatch(setAppStatus('succeeded'))
            } else {
                handleAppError(dispatch, res.data)
            }
        })
        .catch((error: AxiosError) => {
            handleNetworkError(dispatch, error.message)
        })
}
export const updateTaskTitleTC = (todolistId: string, taskId: string, title: string): AppThunkType =>
    (dispatch, getState: () => RootStateType) => {
        const changedTask = getState().tasks[todolistId].find(t => t.id === taskId)
        if (changedTask) {
            const model: UpdateTaskModelType = {
                title,
                status: changedTask.status,
                deadline: changedTask.deadline,
                description: changedTask.description,
                priority: changedTask.priority,
                startDate: changedTask.startDate
            }
            dispatch(setAppStatus('loading'))
            todolistsAPI.updateTask(todolistId, taskId, model)
                .then(res => {
                    if (res.data.resultCode === ResultCode.success) {
                        dispatch(updateTaskTitle(todolistId, taskId, title,))
                        dispatch(setAppStatus('succeeded'))
                    } else {
                        handleAppError(dispatch, res.data)
                    }
                })
                .catch((error: AxiosError) => {
                    handleNetworkError(dispatch, error.message)
                })
        }
    }
export const changeStatusTC = (todolistId: string, taskId: string, status: TaskStatuses): AppThunkType =>
    (dispatch, getState: () => RootStateType) => {
        const changedTask = getState().tasks[todolistId].find(t => t.id === taskId)
        if (changedTask) {
            const model: UpdateTaskModelType = {
                title: changedTask.title,
                status,
                deadline: changedTask.deadline,
                description: changedTask.description,
                priority: changedTask.priority,
                startDate: changedTask.startDate
            }
            dispatch(setAppStatus('loading'))
            todolistsAPI.updateTask(todolistId, taskId, model)
                .then(res => {
                    if (res.data.resultCode === ResultCode.success) {
                        dispatch(changeCheckbox(todolistId, taskId, status))
                        dispatch(setAppStatus('succeeded'))
                    } else {
                        handleAppError(dispatch, res.data)
                    }
                })
                .catch((error: AxiosError) => {
                    handleNetworkError(dispatch, error.message)
                })
        }
    }
export const setTasksTC = (todolistId: string): AppThunkType => (dispatch) => {
    dispatch(setAppStatus('loading'))
    todolistsAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setTasks(todolistId, res.data.items))
            dispatch(setAppStatus('succeeded'))
        })
        .catch((error: AxiosError) => {
            handleNetworkError(dispatch, error.message)
        })

}


// Types
type TasksStateType = { [key: string]: TaskType[] }

export type TasksActionsType =
    | AddTaskActionType
    | RemoveTaskActionType
    | UpdateTaskTitleActionType
    | ChangeCheckboxActionType
    | SetTasksActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ClearDataActionType

type AddTaskActionType = ReturnType<typeof addTask>
type RemoveTaskActionType = ReturnType<typeof removeTask>
type UpdateTaskTitleActionType = ReturnType<typeof updateTaskTitle>
type ChangeCheckboxActionType = ReturnType<typeof changeCheckbox>
type SetTasksActionType = ReturnType<typeof setTasks>



