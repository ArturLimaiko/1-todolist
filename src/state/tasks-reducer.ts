import {v1} from "uuid";
import {removeTodolistACType} from "./todolist-reducer";
import {TasksStateType} from "../AppWithRedux";

export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export type AddTaskACType = ReturnType<typeof addTaskAC>
export type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export type AddTodolistACType = ReturnType<typeof AddTodolistAC>

//все типы action
export type ActionsType =
    RemoveTaskACType
    | AddTaskACType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | AddTodolistACType
    | removeTodolistACType

//инициализационное состояние что бы  при первом запуске редакс его видел ,значение которое вернется из нашего reducer'a.
const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            //если таска не равна => добавь ( иначе удалит)
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(f => f.id !== action.taskId)
            }
        case 'ADD-TASK': {
            const newTask = {id: v1(), title: action.title, isDone: false}
            return {
                ...state,
                [action.todolistId]: [...state[action.todolistId], newTask]
            }
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)
            }
        }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, title: action.newTitle} : t)
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todolistId]: []
                //создали пустой тудулист
            }
        case 'REMOVE-TODOLIST': {
            // let copyState = {...state}
            // delete copyState[action.todolistId]
            // return copyState
            const {[action.todolistId]: [], ...rest} = state
            return rest
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', taskId, todolistId} as const
}

export const addTaskAC = (todolistId: string, title: string) => {
    return {type: 'ADD-TASK', todolistId, title} as const
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {type: 'CHANGE-TASK-STATUS', todolistId, taskId, isDone} as const
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string) => {
    return {type: 'CHANGE-TASK-TITLE', todolistId, taskId, newTitle} as const
}

export const AddTodolistAC = (title: string) => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()} as const
}