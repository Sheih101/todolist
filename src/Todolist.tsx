import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import {EditableSpan} from "./components/EditableSpan";
import {Button} from "./components/Button";
import {Input} from "./components/Input";
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
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    removeTodolist: (todolistID: string) => void
    updateTodolist: (todolistID: string, title: string) => void
}

export function Todolist(props: PropsType) {

    const addTask = (title: string) => {
        props.addTask(props.todolistID, title)
    }
    const onRemoveTaskHandler = (taskID: string) => props.removeTask(props.todolistID, taskID)
    const onChangeHandler = (taskID: string, e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.todolistID, taskID, e.currentTarget.checked)
    }
    const onTodoRemoveClickHandler = () => props.removeTodolist(props.todolistID)
    const callBackForEditableSpan = (title: string, taskID: string) => {
        props.updateTask(props.todolistID, title, taskID)
    }
    const callBackForEditableSpanForHeader = (title: string) => {
        props.updateTodolist(props.todolistID, title)
    }
    const onAllClickHandler = () => props.changeFilter(props.todolistID, "all")
    const onActiveClickHandler = () => props.changeFilter(props.todolistID, "active")
    const onCompletedClickHandler = () => props.changeFilter(props.todolistID, "completed")

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} callBack={(title) => callBackForEditableSpanForHeader(title)}/>
                <button onClick={onTodoRemoveClickHandler}>X</button>
            </h3>
            <div>
                <Input addItem={addTask}/>
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        return (
                            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                                <Button name={'X'} callBack={() => onRemoveTaskHandler(t.id)}/>
                                <input type="checkbox"
                                       onChange={(e) => onChangeHandler(t.id, e)}
                                       checked={t.isDone}
                                />
                                <EditableSpan title={t.title}
                                              callBack={(title) => callBackForEditableSpan(title, t.id)}/>
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
