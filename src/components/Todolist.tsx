import React, {useCallback} from 'react';
import {FilterValuesType} from '../App';
import {EditableSpan} from './EditableSpan';
import {UniversalInput} from './UniversalInput';
import {Button, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {Task} from './Task';

export type TaskType = {
    title: string
    taskID: string
    isDone: boolean
}
type PropsType = {
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

export const Todolist: React.FC<PropsType> = React.memo((props: PropsType) => {
    const addTaskHandler = useCallback((title: string) => {
        props.addTask(props.todolistID, title)
    }, [props.addTask, props.todolistID])

    const changeFilterHandler = useCallback((filterValue: FilterValuesType) => {
        props.changeFilter(props.todolistID, filterValue)
    }, [props.changeFilter, props.todolistID])

    const removeTodolistHandler = useCallback(() => {
        props.removeTodolist(props.todolistID)
    }, [props.removeTodolist, props.todolistID])

    const updateTodolistTitleHandler = useCallback((title: string) => {
        props.updateTodolistTitle(props.todolistID, title)
    }, [props.updateTodolistTitle, props.todolistID])

    let tasksForTodolist = props.tasks
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.isDone)
    }
    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => !t.isDone)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} callBack={updateTodolistTitleHandler}/>
                <IconButton aria-label={'delete'} onClick={removeTodolistHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <UniversalInput callBack={addTaskHandler}/>
            <div>
                {tasksForTodolist.map(t =>
                    <Task key={t.taskID}
                          task={t} //task
                          todolistID={props.todolistID}
                          removeTask={props.removeTask}
                          changeCheckbox={props.changeCheckbox}
                          updateTaskTitle={props.updateTaskTitle}
                    />)}
            </div>
            <div>
                <Button variant={props.filter === 'all' ? 'outlined' : 'contained'}
                        color={'success'}
                        onClick={() => changeFilterHandler('all')}
                        size={'small'}
                        style={{margin: '5px'}}
                >All
                </Button>
                <Button variant={props.filter === 'active' ? 'outlined' : 'contained'}
                        color={'error'}
                        onClick={() => changeFilterHandler('active')}
                        size={'small'}
                        style={{margin: '5px'}}
                >Active
                </Button>
                <Button variant={props.filter === 'completed' ? 'outlined' : 'contained'}
                        color={'secondary'}
                        onClick={() => changeFilterHandler('completed')}
                        size={'small'}
                        style={{margin: '5px'}}
                >Completed
                </Button>
            </div>
        </div>
    )
})
