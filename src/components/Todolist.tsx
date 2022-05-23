import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "../App";
import {EditableSpan} from "./EditableSpan";
import {UniversalInput} from "./UniversalInput";
import {Button, Checkbox, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {pink} from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';

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
    updateTodolistTitle: (todolistID: string, title: string) => void
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
        props.updateTodolistTitle(props.todolistID, title)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} callBack={(title) => editTodolistHandler(title)}/>
                <IconButton aria-label={'delete'}>
                    <Delete onClick={removeTodolistHandler}/>
                </IconButton>
            </h3>
            <UniversalInput callBack={addTaskHandler}/>
            <ul>
                {props.tasks.map(t => {
                    return (
                        <li key={t.id} className={`${t.isDone ? "is-done" : ""} list-element`}>
                            <Checkbox defaultChecked
                                      onChange={(e) => checkboxHandler(t.id, e)}
                                      checked={t.isDone}
                                      sx={{
                                          color: pink[800],
                                          '&.Mui-checked': {
                                              color: pink[600],
                                          }
                                      }}
                            />
                            <EditableSpan title={t.title} callBack={(title) => editTaskHandler(title, t.id)}/>
                            <IconButton aria-label={'delete'}>
                                <CloseIcon onClick={() => removeTaskHandler(t.id)} style={{}}/>
                            </IconButton>
                        </li>
                    )
                })}
            </ul>
            <div>
                <Button variant={props.filter === "all" ? "outlined" : "contained"}
                        color={'success'}
                        onClick={() => changeFilterHandler('all')}
                        size={'small'}>All
                </Button>
                <Button variant={props.filter === "active" ? "outlined" : "contained"}
                        color={'error'}
                        onClick={() => changeFilterHandler('active')}
                        size={'small'}>Active
                </Button>
                <Button variant={props.filter === "completed" ? "outlined" : "contained"}
                        color={'secondary'}
                        onClick={() => changeFilterHandler('completed')}
                        size={'small'}>Completed
                </Button>
            </div>
        </div>
    )
}
