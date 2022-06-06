import React from 'react';
import './App.css';
import {TaskType, Todolist} from './components/Todolist';
import {UniversalInput} from './components/UniversalInput';
import {ButtonAppBar} from './components/ButtonAppBar';
import {Container, Grid, Paper} from '@mui/material';
import {addTodolistAC, changeFilterAC, removeTodolistAC, updateTodolistTitleAC} from './state/todolists-reducer';
import {addTaskAC, changeCheckboxAC, removeTaskAC, updateTaskTitleAC} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';

export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export function App() {
    // const todolistID1 = v1();
    // const todolistID2 = v1();
    // const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
    //     {id: todolistID1, title: 'What to learn', filter: 'all'},
    //     {id: todolistID2, title: 'What to buy', filter: 'all'},
    // ])
    // const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
    //     [todolistID1]: [
    //         {id: v1(), title: 'HTML&CSS', isDone: true},
    //         {id: v1(), title: 'JS', isDone: true},
    //         {id: v1(), title: 'ReactJS', isDone: false},
    //         {id: v1(), title: 'Rest API', isDone: false},
    //         {id: v1(), title: 'GraphQL', isDone: false},
    //     ],
    //     [todolistID2]: [
    //         {id: v1(), title: 'HTML&CSS2', isDone: true},
    //         {id: v1(), title: 'JS2', isDone: true},
    //         {id: v1(), title: 'ReactJS2', isDone: false},
    //         {id: v1(), title: 'Rest API2', isDone: false},
    //         {id: v1(), title: 'GraphQL2', isDone: false},
    //     ]
    // })

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const addTask = (todolistID: string, title: string) => {
        dispatch(addTaskAC(todolistID, title))
    }
    const removeTask = (todolistID: string, taskID: string) => {
        dispatch(removeTaskAC(todolistID, taskID))
    }
    const updateTaskTitle = (todolistID: string, taskID: string, title: string) => {
        dispatch(updateTaskTitleAC(todolistID, taskID, title))
    }
    const changeCheckbox = (todolistID: string, taskID: string, isDone: boolean) => {
        dispatch(changeCheckboxAC(todolistID, taskID, isDone))
    }

    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    }
    const removeTodolist = (todolistID: string) => {
        dispatch(removeTodolistAC(todolistID))
    }
    const updateTodolistTitle = (todolistID: string, title: string) => {
        dispatch(updateTodolistTitleAC(todolistID, title))
    }
    const changeFilter = (todolistID: string, value: FilterValuesType) => {
        dispatch(changeFilterAC(todolistID, value))
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '10px'}} justifyContent="center">
                    <UniversalInput callBack={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map((tl, i) => {
                        let tasksForTodolist = tasks[tl.id]
                        if (tl.filter === 'completed') {
                            tasksForTodolist = tasks[tl.id].filter(t => t.isDone)
                        }
                        if (tl.filter === 'active') {
                            tasksForTodolist = tasks[tl.id].filter(t => !t.isDone)
                        }
                        return (
                            <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        key={`${tl.id}-${i}`}
                                        todolistID={tl.id}
                                        tasks={tasksForTodolist}
                                        title={tl.title}
                                        filter={tl.filter}
                                        addTask={addTask}
                                        removeTask={removeTask}
                                        updateTaskTitle={updateTaskTitle}
                                        changeCheckbox={changeCheckbox}
                                        changeFilter={changeFilter}
                                        removeTodolist={removeTodolist}
                                        updateTodolistTitle={updateTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}