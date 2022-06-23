import {AppRootStateType} from './store';
import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, legacy_createStore as createStore} from 'redux'
import {v1} from 'uuid'
import {tasksReducer} from './tasks-reducer';
import {todolistsReducer} from './todolists-reducer';


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all'}
    ],
    tasks: {
        ['todolistId1']: [
            {taskID: v1(), title: 'HTML&CSS', isDone: true},
            {taskID: v1(), title: 'JS', isDone: true}
        ],
        ['todolistId2']: [
            {taskID: v1(), title: 'Milk', isDone: true},
            {taskID: v1(), title: 'React Book', isDone: true}
        ]
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType)

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return (
        <Provider
            store={storyBookStore}>{storyFn()}
        </Provider>
    )
}

