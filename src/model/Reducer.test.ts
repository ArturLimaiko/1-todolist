import {v1} from "uuid";
import {TodoListType} from "../App";
import {todolistReducer} from "./Reducer";

test('correct todolist should be remover', () => {

    const todolistId_1 = v1()
    const todolistId_2 = v1()

    //стартовый стейт
    const startState: TodoListType[] = [
        {id: todolistId_1, title: 'Whats to learn ?', filter: 'all'},
        {id: todolistId_2, title: 'What to bye ?', filter: 'all'},
    ]

    //какое то действие
    const action = {
        type: 'REMOVE-TODOLIST',
        payload: {
            id: todolistId_1,
        }
    } as const

    //итоговый стейт
    const endState = todolistReducer(startState, action)

    // проверка  что наши действия в стейте соответствуют ожиданию -
    // в массиве останется один тудулист
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId_2)
})

test('correct todolist should be added', () => {

    const todolistId_1 = v1()
    const todolistId_2 = v1()

    //стартовый стейт
    const startState: TodoListType[] = [
        {id: todolistId_1, title: 'Whats to learn ?', filter: 'all'},
        {id: todolistId_2, title: 'What to bye ?', filter: 'all'},
    ]

    //какое то действие
    const action = {
        type: 'ADD-TODOLIST',
        payload: {
            title: 'New Todo',
        }
    } as const

    //итоговый стейт
    const endState = todolistReducer(startState, action)

    // проверка  что наши действия в стейте соответствуют ожиданию -
    // в массиве останется один тудулист
    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(action.payload.title)
})

test('correct todolist should change its name', () => {

    const todolistId_1 = v1()
    const todolistId_2 = v1()

    //стартовый стейт
    const startState: TodoListType[] = [
        {id: todolistId_1, title: 'Whats to learn ?', filter: 'all'},
        {id: todolistId_2, title: 'What to bye ?', filter: 'all'},
    ]

    //какое то действие
    const action = {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todolistId: todolistId_2,
            updatedTitle: 'New Title Todo'
        }
    } as const

    //итоговый стейт
    const endState = todolistReducer(startState, action)

    // проверка  что наши действия в стейте соответствуют ожиданию -
    // в массиве останется один тудулист
    expect(endState[1].title).toBe(action.payload.updatedTitle)
    expect(endState[0].title).toBe('Whats to learn ?')
})

test('correct filter of todolist should be  changed', () => {

    const todolistId_1 = v1()
    const todolistId_2 = v1()

    //стартовый стейт
    const startState: TodoListType[] = [
        {id: todolistId_1, title: 'Whats to learn ?', filter: 'all'},
        {id: todolistId_2, title: 'What to bye ?', filter: 'all'},
    ]

    //какое то действие
    const action = {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            filter: 'active',
            todolistId: todolistId_1
        }
    } as const

    //итоговый стейт
    const endState = todolistReducer(startState, action)

    // проверка  что наши действия в стейте соответствуют ожиданию -
    // в массиве останется один тудулист
    expect(endState[0].filter).toBe(action.payload.filter)
    expect(endState[1].filter).toBe('all')
})