import React, {useCallback} from 'react';
import {FilterValuesType} from '../App';
import {EditableSpan} from './EditableSpan';
import {UniversalInput} from './UniversalInput';
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
    todolistID: string
    tasks: Array<TaskType>
    title: string
    filter: FilterValuesType
    addTask: (todolistID: string, title: string) => void
    removeTask: (todolistID: string, taskId: string) => void
    updateTaskTitle: (todolistID: string, taskID: string, title: string) => void
    changeCheckbox: (todolistID: string, taskID: string, isDone: boolean) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    removeTodolist: (todolistID: string) => void
    updateTodolistTitle: (todolistID: string, title: string) => void
}

export const Todolist = React.memo((props: PropsType) => {

    console.log('Todolist')

    const addTaskHandler = useCallback((title: string) => {
        props.addTask(props.todolistID, title)
    }, [props.addTask, props.todolistID])
    const removeTaskHandler = (taskID: string) => {
        props.removeTask(props.todolistID, taskID)
    }
    const changeCheckboxHandler = (taskID: string, isDone: boolean) => {
        props.changeCheckbox(props.todolistID, taskID, isDone)
    }
    const changeFilterHandler = (filterValue: FilterValuesType) => {
        props.changeFilter(props.todolistID, filterValue)
    }
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistID)
    }
    const updateTaskTitleHandler = (taskID: string, title: string) => {
        props.updateTaskTitle(props.todolistID, taskID, title)
    }
    const updateTodolistTitleHandler = (title: string) => {
        props.updateTodolistTitle(props.todolistID, title)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} callBack={(title) => updateTodolistTitleHandler(title)}/>
                <IconButton aria-label={'delete'} onClick={removeTodolistHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <UniversalInput callBack={addTaskHandler}/>
            <ul>
                {props.tasks.map((t, i) => {
                    return (
                        <li key={`${t.id}-${i}`} className={`${t.isDone ? 'is-done' : ''} list-element`}>
                            <Checkbox onChange={(e) => changeCheckboxHandler(t.id, e.currentTarget.checked)}
                                      checked={t.isDone}
                                      sx={{
                                          color: pink[800],
                                          '&.Mui-checked': {
                                              color: pink[600],
                                          }
                                      }}
                            />
                            <EditableSpan title={t.title} callBack={(title) => updateTaskTitleHandler(t.id, title)}/>
                            <IconButton aria-label={'delete'} onClick={() => removeTaskHandler(t.id)}>
                                <CloseIcon/>
                            </IconButton>
                        </li>
                    )
                })}
            </ul>
            <div>
                <Button variant={props.filter === 'all' ? 'outlined' : 'contained'}
                        color={'success'}
                        onClick={() => changeFilterHandler('all')}
                        size={'small'}
                >All
                </Button>
                <Button variant={props.filter === 'active' ? 'outlined' : 'contained'}
                        color={'error'}
                        onClick={() => changeFilterHandler('active')}
                        size={'small'}
                >Active
                </Button>
                <Button variant={props.filter === 'completed' ? 'outlined' : 'contained'}
                        color={'secondary'}
                        onClick={() => changeFilterHandler('completed')}
                        size={'small'}
                >Completed
                </Button>
            </div>
        </div>
    )
})
