import {v1} from 'uuid';
import {FilterValuesType, TodolistType} from '../App';
import {
    addTodolist,
    changeFilter,
    removeTodolist,
    todolistsReducer,
    updateTodolistTitle
} from './todolists-reducer';

let todolistID1: string
let todolistID2: string
let startState: Array<TodolistType>

beforeEach(() => {
    todolistID1 = v1()
    todolistID2 = v1()
    startState = [
        {todolistID: todolistID1, title: 'What to learn', filter: 'all'},
        {todolistID: todolistID2, title: 'What to buy', filter: 'all'},
    ]
})

test('correct todolist should be added', () => {

    const newTodolistTitle = 'New title'
    const endState = todolistsReducer(startState, addTodolist(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
})

test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, removeTodolist(todolistID1))

    expect(endState.length).toBe(1)
    expect(endState[0].todolistID).toBe(todolistID2)
})

test('correct todolist\'s title should be updated', () => {

    const newTodolistTitle = 'New title'

    const endState = todolistsReducer(startState, updateTodolistTitle(todolistID2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    const newFilter: FilterValuesType = 'completed'

    const endState = todolistsReducer(startState, changeFilter(todolistID2, newFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})

