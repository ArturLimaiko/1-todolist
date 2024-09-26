import {v1} from "uuid";
import {FilterValuesType, TodoListType} from "../App";

const todolistId_1 = v1()
const todolistId_2 = v1()

export const initialState: TodoListType[] = [
    {id: todolistId_1, title: 'Whats to learn ?', filter: 'all'},
    {id: todolistId_2, title: 'What to bye ?', filter: 'active'},
]

export type removeTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    payload: {
        id: string
    }
}

export type addTodolistActionType = {
    type: 'ADD-TODOLIST'
    payload: {
        title: string
    }
}

export type changeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    payload: {
        todolistId: string,
        updatedTitle: string
    }
}

export type changeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    payload: {
        filter: FilterValuesType,
        todolistId: string
    }
}

type ActionsType =
    | removeTodolistActionType
    | addTodolistActionType
    | changeTodolistTitleActionType
    | changeTodolistFilterActionType

export const todolistReducer = (state = initialState, action: ActionsType): TodoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            //до этого мы еще удаляли и таски так сказать подчищали а сейчас нужно ли это?
            // delete tasks[todolistId]
            return state.filter(t => t.id !== action.payload.id);
        case 'ADD-TODOLIST' :
            const id = v1()
            const newTodoList: TodoListType = {id, title: action.payload.title, filter: 'all'}
            return [...state, newTodoList]
        case 'CHANGE-TODOLIST-TITLE' :
            return state.map(t => t.id === action.payload.todolistId ? {...t, title: action.payload.updatedTitle} : t)
        case 'CHANGE-TODOLIST-FILTER' :
            const todolistId = action.payload.todolistId
            return state.map(f => f.id === todolistId ? {...f, filter: action.payload.filter} : f)

        default:
            return state
    }
}

export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id
        },
    } as const
}

export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title
        },
    } as const
}

export const changeTodolistTitleAC = (todolistId: string, updatedTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todolistId,
            updatedTitle
        },
    } as const
}

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todolistId,
            filter
        },
    } as const
}