import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from './todolists-reducer';
import {TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../api/todolists-api';
import {AppThunk, RootState} from './store';

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(f => f.id !== action.taskId)}
        case 'UPDATE-TASK-TITLE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(m => m.id === action.taskId ? {
                    ...m,
                    title: action.title
                } : m)
            }
        case 'CHANGE-CHECKBOX':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(m => m.id === action.taskId ? {
                    ...m,
                    status: action.status
                } : m)
            }
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks}
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST': {
            let stateCopy = {...state}
            delete stateCopy[action.todolistId]
            return stateCopy
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        default:
            return state
    }
}


// Action Creators
export const addTask = (task: TaskType) => {
    return {type: 'ADD-TASK', task} as const
}
export const removeTask = (todolistId: string, taskId: string) => {
    return {type: 'REMOVE-TASK', todolistId, taskId} as const
}
export const updateTaskTitle = (todolistId: string, taskId: string, title: string) => {
    return {type: 'UPDATE-TASK-TITLE', todolistId, taskId, title} as const
}
export const changeCheckbox = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return {type: 'CHANGE-CHECKBOX', todolistId, taskId, status} as const
}
export const setTasks = (todolistId: string, tasks: TaskType[]) => {
    return {type: 'SET-TASKS', todolistId, tasks} as const
}


// Thunk Creators
export const addTaskTC = (todolistId: string, title: string): AppThunk => (dispatch) => {
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
            const newTask = res.data.data.item
            dispatch(addTask(newTask))
        })
}
export const removeTaskTC = (todolistId: string, taskId: string): AppThunk => (dispatch) => {
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(() => dispatch(removeTask(todolistId, taskId)))
}
export const updateTaskTitleTC = (todolistId: string, taskId: string, title: string): AppThunk => {
    return (
        (dispatch, getState: () => RootState) => {
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
                todolistsAPI.updateTask(todolistId, taskId, model)
                    .then(() => dispatch(updateTaskTitle(todolistId, taskId, title,)))
            }
        }
    )
}
export const changeCheckboxTC = (todolistId: string, taskId: string, status: TaskStatuses): AppThunk => {
    return (
        (dispatch, getState: () => RootState) => {
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
                todolistsAPI.updateTask(todolistId, taskId, model)
                    .then(() => dispatch(changeCheckbox(todolistId, taskId, status)))
            }
        }
    )
}
export const setTasksTC = (todolistId: string): AppThunk => (dispatch) => {
    todolistsAPI.getTasks(todolistId)
        .then(res => dispatch(setTasks(todolistId, res.data.items)))
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

type AddTaskActionType = ReturnType<typeof addTask>
type RemoveTaskActionType = ReturnType<typeof removeTask>
type UpdateTaskTitleActionType = ReturnType<typeof updateTaskTitle>
type ChangeCheckboxActionType = ReturnType<typeof changeCheckbox>
type SetTasksActionType = ReturnType<typeof setTasks>



