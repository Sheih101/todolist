import axios, {AxiosResponse} from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '58c96973-e4a2-4bd0-91c0-b77f47cf280e'
    },
})

export const todolistsAPI = {
    getTodolists: () => {
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolist: (title: string) => {
        return instance.post <{ title: string }, AxiosResponse<ResponseType<{ item: TodolistType }>>>('todo-lists', {title})
    },
    deleteTodolist: (id: string) => {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTodolistTitle: (id: string, title: string) => {
        return instance.put<{ title: string }, AxiosResponse<ResponseType>>(`todo-lists/${id}`, {title})
    },
    getTasks: (id: string) => {
        return instance.get<GetTasksResponse>(`todo-lists/${id}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
    },
    createTask(id: string, title: string) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${id}/tasks`, {title});
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<UpdateTaskModelType, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    },
}

export const authAPI = {
    login: (data: LoginParamsType) => {
        return instance.post<LoginParamsType, AxiosResponse<ResponseType<{ userId: number }>>>('auth/login', data)
    },
    me: () => {
        return instance.get<ResponseType<MeResponseType>>('auth/me')
    },
    logout: () => {
        return instance.delete<ResponseType>('auth/login')
    }
}


// Types
export type MeResponseType = {
    id: number,
    email: string,
    login: string
}
export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: string
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: D
}
export type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

export enum ResultCode {
    success = 0,
    error = 1,
    captcha = 10
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    High = 2,
    Urgently = 3,
    Later = 4
}



