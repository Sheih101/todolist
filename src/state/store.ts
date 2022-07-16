import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import {TasksActionsType, tasksReducer} from './tasks-reducer';
import {TodolistsActionsType, todolistsReducer} from './todolists-reducer';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>
export type AppActionsType = TodolistsActionsType | TasksActionsType
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActionsType>


