import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '1451deec-1a0d-4254-8a34-9b0f35d44ecf'
    },
})

export const todolistApi = {
    getTodolists: () => {
        return instance.get<TodoType[]>('todo-lists')
    },
    createTodo: (title: string) => {
        return instance.post<BaseResponseType<{ item: TodoType }>>('todo-lists', {title})
    },
    deleteTodo: (todolistId: string) => {
        return instance.delete<BaseResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodoTitle: (payload: { todolistId: string, title: string }) => {
        return instance.put<BaseResponseType>(`todo-lists/${payload.todolistId}`, {title: payload.title})
    },
}


//Types

type TodoType = {
    id: string
    addedDate: string
    order: string
    title: string
}
type BaseResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    fieldErrors: string[]
    data: T
}

