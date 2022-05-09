import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "../App";
import {EditableSpan} from "./EditableSpan";
import {Button} from "./Button";
import {Input} from "./Input";

//types
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type PropsType = {
    tasks: Array<TaskType>
    title: string
    todolistID: string
    filter: FilterValuesType
    addTask: (todolistID: string, title: string) => void
    removeTask: (todolistID: string, taskId: string) => void
    updateTask: (todolistID: string, title: string, taskId: string) => void
    changeCheckbox: (todolistID: string, taskId: string, isDone: boolean) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    removeTodolist: (todolistID: string) => void
    updateTodolist: (todolistID: string, title: string) => void
}

export function Todolist(props: PropsType) {

    const addTaskHandler = (title: string) => {
        props.addTask(props.todolistID, title)
    }
    const removeTaskHandler = (taskID: string) => {
        props.removeTask(props.todolistID, taskID)
    }
    const checkboxHandler = (taskID: string, e: ChangeEvent<HTMLInputElement>) => {
        props.changeCheckbox(props.todolistID, taskID, e.currentTarget.checked)
    }
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistID)
    }
    const changeFilterHandler = (filterValue: FilterValuesType) => {
        props.changeFilter(props.todolistID, filterValue)
    }
    const editTaskHandler = (title: string, taskID: string) => {
        props.updateTask(props.todolistID, title, taskID)
    }
    const editTodolistHandler = (title: string) => {
        props.updateTodolist(props.todolistID, title)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} callBack={(title) => editTodolistHandler(title)}/>
                <Button name={'X'} callBack={removeTodolistHandler}/>
            </h3>
            <Input callBack={addTaskHandler}/>
            <ul>
                {
                    props.tasks.map(t => {
                        return (
                            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                                <Button name={'X'} callBack={() => removeTaskHandler(t.id)}/>
                                <input type="checkbox"
                                       onChange={(e) => checkboxHandler(t.id, e)}
                                       checked={t.isDone}/>
                                <EditableSpan title={t.title}
                                              callBack={(title) => editTaskHandler(title, t.id)}/>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <Button name={'all'}
                        callBack={() => changeFilterHandler('all')}
                        className={props.filter === "all" ? "active-filter" : ""}/>
                <Button name={'active'}
                        callBack={() => changeFilterHandler('active')}
                        className={props.filter === "active" ? "active-filter" : ""}/>
                <Button name={'completed'}
                        callBack={() => changeFilterHandler('completed')}
                        className={props.filter === "completed" ? "active-filter" : ""}/>
            </div>
        </div>
    )
}
