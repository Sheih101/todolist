import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';

export type FilterValuesType = "all" | "completed" | "active";

export function App() {
    //state
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Redux", isDone: false}
    ])
    let [filter, setFilter] = useState<FilterValuesType>("all")
    //callBack functions
    const removeTask = (id: number) => {
        let removedTasks = tasks.filter(t => t.id !== id)
        setTasks(removedTasks)
    }
    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }
    //tasks for render
    let tasksForTodolist = tasks
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />

        </div>
    );
}
