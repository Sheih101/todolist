import {v1} from 'uuid';
import {addTodolist, changeFilter, removeTodolist, todolistsReducer, updateTodolistTitle} from './todolists-reducer';
import {FilterValuesType, TodolistType} from '../App';

test('correct todolist should be added', () => {

    const todolistID1 = v1()
    const todolistID2 = v1()
    const newTodolistTitle = 'New title'
    const startState: Array<TodolistType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]
    const newTodolistID = v1()

    const endState = todolistsReducer(startState, addTodolist(newTodolistID, newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
})

test('correct todolist should be removed', () => {

    const todolistID1 = v1()
    const todolistID2 = v1()
    const startState: Array<TodolistType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    const endState = todolistsReducer(startState, removeTodolist(todolistID1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)
})

test('correct todolist\'s title should be updated', () => {

    const todolistID1 = v1()
    const todolistID2 = v1()
    const newTodolistTitle = 'New title'
    const startState: Array<TodolistType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    const endState = todolistsReducer(startState, updateTodolistTitle(todolistID2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    const todolistID1 = v1()
    const todolistID2 = v1()
    const newFilter: FilterValuesType = 'completed'
    const startState: Array<TodolistType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    const endState = todolistsReducer(startState, changeFilter(todolistID2, newFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})

