import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './components/Todolist';
import {v1} from 'uuid';
import {UniversalInput} from './components/UniversalInput';
import {ButtonAppBar} from './components/ButtonAppBar';
import {Container, Grid, Paper} from '@mui/material';
import {
    addTodolistAC,
    changeFilterAC,
    removeTodolistAC,
    todolistsReducer,
    updateTodolistTitleAC
} from './state/todolists-reducer';
import {addTaskAC, changeCheckboxAC, removeTaskAC, tasksReducer, updateTaskTitleAC} from './state/tasks-reducer';

export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export function AppWithReducer() {
    //state
    const todolistID1 = v1();
    const todolistID2 = v1();
    const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])
    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'HTML&CSS2', isDone: true},
            {id: v1(), title: 'JS2', isDone: true},
            {id: v1(), title: 'ReactJS2', isDone: false},
            {id: v1(), title: 'Rest API2', isDone: false},
            {id: v1(), title: 'GraphQL2', isDone: false},
        ]
    })
    //functions
    const addTask = (todolistID: string, title: string) => {
        dispatchToTasks(addTaskAC(todolistID, title))
    }
    const removeTask = (todolistID: string, taskID: string) => {
        dispatchToTasks(removeTaskAC(todolistID, taskID))
    }
    const updateTaskTitle = (todolistID: string, taskID: string, title: string) => {
        dispatchToTasks(updateTaskTitleAC(todolistID, taskID, title))
    }
    const changeCheckbox = (todolistID: string, taskID: string, isDone: boolean) => {
        dispatchToTasks(changeCheckboxAC(todolistID, taskID, isDone))
    }

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }
    const removeTodolist = (todolistID: string) => {
        dispatchToTodolists(removeTodolistAC(todolistID))
        dispatchToTasks(removeTodolistAC(todolistID))
    }
    const updateTodolistTitle = (todolistID: string, title: string) => {
        dispatchToTodolists(updateTodolistTitleAC(todolistID, title))
    }
    const changeFilter = (todolistID: string, value: FilterValuesType) => {
        dispatchToTodolists(changeFilterAC(todolistID, value))
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '10px'}} justifyContent="center">
                    <UniversalInput callBack={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(tl => {

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
                                        key={tl.id}
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