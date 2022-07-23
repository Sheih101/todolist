import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import {TasksActionsType, tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {TodolistsActionsType, todolistsReducer} from '../features/TodolistsList/todolists-reducer';
import {AppActionsType, appReducer} from './app-reducer';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AuthActionsType, authReducer} from '../features/Login/auth-reducer';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootStateType = ReturnType<typeof rootReducer>
export type RootActionsType = TodolistsActionsType | TasksActionsType | AppActionsType | AuthActionsType

export type AppDispatchType = ThunkDispatch<RootStateType, unknown, RootActionsType>
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, RootActionsType>


