import {v1} from "uuid";
import {FilterValuesType, TodoListType} from "../App";

const todolistId_1 = v1()
const todolistId_2 = v1()

export const initialState: TodoListType[] = [
    {id: todolistId_1, title: 'Whats to learn ?', filter: 'all'},
    {id: todolistId_2, title: 'What to bye ?', filter: 'active'},
]

export type removeTodolistACType = {
    type: 'REMOVE-TODOLIST',
    todolistId: string
}

export type addTodolistACType = {
    type: 'ADD-TODOLIST',
    title: string,
    todolistId: string
}

export type changeTodolistTitleACType = {
    type: 'CHANGE-TODOLIST-TITLE',
    todolistId: string,
    updatedTitle: string
}

export type changeTodolistFilterACType = {
    type: 'CHANGE-TODOLIST-FILTER',
    filter: FilterValuesType,
    todolistId: string
}

export type ActionsType =
    | removeTodolistACType
    | addTodolistACType
    | changeTodolistTitleACType
    | changeTodolistFilterACType

export const todolistReducer = (state = initialState, action: ActionsType): TodoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            //до этого мы еще удаляли и таски так сказать подчищали а сейчас нужно ли это?
            // delete tasks[todolistId]
            return state.filter(t => t.id !== action.todolistId);
        case 'ADD-TODOLIST' :
            const newTodoList: TodoListType = {id: action.todolistId, title: action.title, filter: 'all'}
            return [...state, newTodoList]
        case 'CHANGE-TODOLIST-TITLE' :
            return state.map(t => t.id === action.todolistId ? {...t, title: action.updatedTitle} : t)
        case 'CHANGE-TODOLIST-FILTER' :
            const todolistId = action.todolistId
            return state.map(f => f.id === todolistId ? {...f, filter: action.filter} : f)

        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', todolistId} as const
}

export const addTodolistAC = (title: string) => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()} as const
}

export const changeTodolistTitleAC = (todolistId: string, updatedTitle: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', todolistId, updatedTitle} as const
}

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', todolistId, filter} as const
}