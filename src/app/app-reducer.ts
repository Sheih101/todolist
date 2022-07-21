const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as null | string
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setAppStatus = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppError = (error: null | string) => ({type: 'APP/SET-ERROR', error} as const)


// Types
type InitialStateType = typeof initialState
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppActionsType =
    | SetAppStatusActionType
    | SetAppErrorActionType

export type SetAppStatusActionType = ReturnType<typeof setAppStatus>
export type SetAppErrorActionType = ReturnType<typeof setAppError>