import React, {useEffect, useState} from 'react';
import {todolistApi} from '../api/todolist-api';

export default {
    title: 'API'
}

export const GetTodolists = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistApi.getTodolists()
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}


export const CreateTodolist = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const title = 'New title!!'

        todolistApi.createTodo(title)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}


export const DeleteTodolist = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = '658aef4a-ac88-403a-9cb7-1758ba3e9520'

        todolistApi.deleteTodo(todolistId)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}


export const UpdateTodolist = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = 'ae67bb16-aef5-49b3-91b5-409fe218fa4a'
        const title = 'Updated Todo'

        todolistApi.updateTodoTitle({todolistId, title})
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
