import React, {useCallback, useEffect} from 'react';
import {EditableSpan} from '../../../common/components/EditableSpan/EditableSpan';
import {AddItemForm} from '../../../common/components/AddItemForm/AddItemForm';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import {Task} from './Task/Task';
import {addTaskTC, changeStatusTC, removeTaskTC, setTasksTC, updateTaskTitleTC} from '../tasks-reducer';
import {changeFilter, FilterValuesType, removeTodolistTC, TodolistDomainType, updateTodolistTitleTC} from '../todolists-reducer';
import {TaskStatuses} from '../../../api/todolists-api';
import {useAppDispatch, useAppSelector} from '../../../common/hooks';

export const Todolist = React.memo(({todolist}: { todolist: TodolistDomainType }) => {
    const tasks = useAppSelector(state => state.tasks[todolist.id])
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setTasksTC(todolist.id))
    }, [])

    let tasksForTodolist = tasks
    if (todolist.filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (todolist.filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    const addTask = useCallback((title: string) => {
        dispatch(addTaskTC(todolist.id, title))
    }, [todolist.id])
    const removeTask = useCallback((taskId: string) => {
        dispatch(removeTaskTC(todolist.id, taskId))
    }, [todolist.id])
    const updateTaskTitle = useCallback((taskId: string, title: string) => {
        dispatch(updateTaskTitleTC(todolist.id, taskId, title))
    }, [todolist.id])
    const changeStatus = useCallback((taskId: string, status: TaskStatuses) => {
        dispatch(changeStatusTC(todolist.id, taskId, status))
    }, [todolist.id])
    const removeTodolist = useCallback(() => {
        dispatch(removeTodolistTC(todolist.id))
    }, [todolist.id])
    const updateTodolistTitle = useCallback((title: string) => {
        dispatch(updateTodolistTitleTC(todolist.id, title))
    }, [todolist.id])
    const changeFilterHandler = useCallback((filterValue: FilterValuesType) => {
        dispatch(changeFilter(todolist.id, filterValue))
    }, [todolist.id])

    return (
        <div>
            <h3>
                <EditableSpan value={todolist.title} callback={updateTodolistTitle}/>
                <IconButton onClick={removeTodolist} disabled={todolist.entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} disabled={todolist.entityStatus === 'loading'}/>
            <div>
                {
                    tasksForTodolist.map(task =>
                        <Task key={task.id}
                              task={task}
                              removeTask={removeTask}
                              changeStatus={changeStatus}
                              updateTaskTitle={updateTaskTitle}
                        />)
                }
            </div>
            <div style={{paddingTop: '5px'}}>
                <Button variant={todolist.filter === 'all' ? 'contained' : 'outlined'}
                        onClick={() => changeFilterHandler('all')}
                        color={'primary'}
                        size={'small'}
                        style={{margin: '5px'}}>All
                </Button>
                <Button variant={todolist.filter === 'active' ? 'contained' : 'outlined'}
                        onClick={() => changeFilterHandler('active')}
                        color={'error'}
                        size={'small'}
                        style={{margin: '5px'}}>Active
                </Button>
                <Button variant={todolist.filter === 'completed' ? 'contained' : 'outlined'}
                        onClick={() => changeFilterHandler('completed')}
                        color={'success'}
                        size={'small'}
                        style={{margin: '5px'}}>Completed
                </Button>
            </div>
        </div>
    )
})
