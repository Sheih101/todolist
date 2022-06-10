import {TasksStateType} from '../App';
import {addTask, changeCheckbox, removeTask, tasksReducer, updateTaskTitle} from './tasks-reducer';
import {addTodolist, removeTodolist} from './todolists-reducer';

let startState: TasksStateType
beforeEach(() => {
    startState = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }
})

test('correct task should be added from correct array', () => {

    const endState = tasksReducer(startState, addTask('todolistId1', 'new'))

    expect(endState['todolistId1'].length).toBe(4)
    expect(endState['todolistId2'].length).toBe(3);
    expect(endState['todolistId2'][0].id).toBeDefined();
    expect(endState['todolistId1'][0].title).toBe('new')
    expect(endState['todolistId2'][0].isDone).toBe(false);

})

test('correct task should be removed from correct array', () => {

    const endState = tasksReducer(startState, removeTask('todolistId2', '2'))

    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '3', title: 'tea', isDone: false}
        ]
    })
})

test('correct task should be updated from correct array', () => {

    const endState = tasksReducer(startState, updateTaskTitle('todolistId1', '3', 'React-Redux'))

    expect(endState['todolistId1'][2].title).toBe('React-Redux')
    expect(endState['todolistId2'][2].title).toBe('tea')
})

test('status of specified task should be changed', () => {

    const endState = tasksReducer(startState, changeCheckbox('todolistId2', '2', false))

    expect(endState['todolistId2'][1].isDone).toBe(false);
    expect(endState['todolistId1'][1].isDone).toBe(true);
})

test('new array should be added when new todolist is added', () => {

    const endState = tasksReducer(startState, addTodolist('new todolist'))

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2');
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {

    const endState = tasksReducer(startState, removeTodolist('todolistId2'))

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).toBeUndefined();
});






