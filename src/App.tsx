import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './components/Todolist';
import {v1} from "uuid";
import {Input} from "./components/Input";

export type FilterValuesType = "all" | "completed" | "active";
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export function App() {
    //state
    const todolistID1 = v1();
    const todolistID2 = v1();
    const [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });
    //functions
    const addTask = (todolistID: string, title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }
    const removeTask = (todolistID: string, id: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(f => f.id !== id)})
    }
    const updateTask = (todolistID: string, title: string, taskID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(m => m.id === taskID ? {...m, title} : m)})
    }
    const changeCheckbox = (todolistID: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(m => m.id === taskId ? {...m, isDone} : m)})
    }
    const changeFilter = (todolistID: string, value: FilterValuesType) => {
        setTodolists(todolists.map(m => m.id === todolistID ? {...m, filter: value} : m))
    }
    const addTodolist = (title: string) => {
        const newTodolistID = v1()
        const newTodolist: TodolistsType = {id: newTodolistID, title, filter: "all"}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolistID]: []})
    }
    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(f => f.id !== todolistID))
        delete tasks[todolistID]
    }
    const updateTodolist = (todolistID: string, title: string) => {
        setTodolists(todolists.map(m => m.id === todolistID ? {...m, title} : m))
    }

    return (
        <div className="App">
            <Input callBack={addTodolist}/>
            {
                todolists.map(tl => {

                    let tasksForTodolist = tasks[tl.id]
                    if (tl.filter === "completed") {
                        tasksForTodolist = tasks[tl.id].filter(t => t.isDone)
                    }
                    if (tl.filter === "active") {
                        tasksForTodolist = tasks[tl.id].filter(t => !t.isDone)
                    }

                    return (
                        <Todolist
                            key={tl.id}
                            todolistID={tl.id}
                            tasks={tasksForTodolist}
                            title={tl.title}
                            filter={tl.filter}
                            addTask={addTask}
                            removeTask={removeTask}
                            updateTask={updateTask}
                            changeCheckbox={changeCheckbox}
                            changeFilter={changeFilter}
                            removeTodolist={removeTodolist}
                            updateTodolist={updateTodolist}/>
                    )
                })
            }
        </div>
    );
}