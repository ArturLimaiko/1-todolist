import {v1} from "uuid";
import {TodoListType} from "../App";

const todolistId_1 = v1()
const todolistId_2 = v1()

export const initialState: TodoListType[] = [
    {id: todolistId_1, title: 'Whats to learn ?', filter: 'all'},
    {id: todolistId_2, title: 'What to bye ?', filter: 'active'},
]

export type ActionType = {
    type: string
    payload: any
}

export const todolistReducer = (state = initialState, action: ActionType): TodoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter( t => t.id !== action.payload.id) ;
                //до этого мы еще удаляли и таски так сказать подчищали а сейчас нужно ли это?
                // delete tasks[todolistId]
        case'bbb' :
            return state
        case'zzz' :
            return state
        case'aaa' :
            return state

        default:
            return state
    }
}