import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";
import {Button} from "./components/Button/Button";
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
    removeTask: (todolistID: string, TaskId: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    removeTodolist: (todolistID: string) => void
}

export function Todolist(props: PropsType) {
    //state
    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)
    //handler functions
    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(props.todolistID, title.trim())
            setTitle("")
        } else {
            setError("Title is required!")
        }
    }
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask()
        }
    }
    const onTodoRemoveClickHandler = () => props.removeTodolist(props.todolistID)
    const onAllClickHandler = () => props.changeFilter(props.todolistID, "all")
    const onActiveClickHandler = () => props.changeFilter(props.todolistID, "active")
    const onCompletedClickHandler = () => props.changeFilter(props.todolistID, "completed")

    return (
        <div>
            <h3>
                {props.title}
                <Button name={'X'} callBack={onTodoRemoveClickHandler}/>
            </h3>

            <div>
                <input value={title}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const onRemoveHandler = () => props.removeTask(props.todolistID, t.id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked)
                        }

                        return (
                            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                                <button onClick={onRemoveHandler}>X</button>
                                <input type="checkbox"
                                       onChange={onChangeHandler}
                                       checked={t.isDone}/>
                                <span>{t.title}</span>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""}
                        onClick={onAllClickHandler}>All
                </button>

                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active
                </button>

                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}
