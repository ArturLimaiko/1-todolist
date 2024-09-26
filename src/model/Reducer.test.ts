import {v1} from "uuid";
import {TodoListType} from "../App";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./Reducer";

test('correct todolist should be removed', () => {

    const todolistId_1 = v1()
    const todolistId_2 = v1()

    //стартовый стейт
    const startState: TodoListType[] = [
        {id: todolistId_1, title: 'Whats to learn ?', filter: 'all'},
        {id: todolistId_2, title: 'What to bye ?', filter: 'all'},
    ]

    //итоговый стейт
    const endState = todolistReducer(startState, removeTodolistAC(todolistId_2))

    // проверка  что наши действия в стейте соответствуют ожиданию -
    // в массиве останется один тудулист
    expect(endState.length).toBe(1)
    expect(endState[1]).toBe(undefined)
    expect(endState[0].id).toBe(todolistId_1)
})

test('correct todolist should be added', () => {

    const todolistId_1 = v1()
    const todolistId_2 = v1()

    //стартовый стейт
    const startState: TodoListType[] = [
        {id: todolistId_1, title: 'Whats to learn ?', filter: 'all'},
        {id: todolistId_2, title: 'What to bye ?', filter: 'all'},
    ]

    //итоговый стейт
    const endState = todolistReducer(startState, addTodolistAC('New Todo'))

    // проверка  что наши действия в стейте соответствуют ожиданию -
    // в массиве останется один тудулист
    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('New Todo')
})

test('correct todolist should change its name', () => {

    const todolistId_1 = v1()
    const todolistId_2 = v1()

    //стартовый стейт
    const startState: TodoListType[] = [
        {id: todolistId_1, title: 'Whats to learn ?', filter: 'all'},
        {id: todolistId_2, title: 'What to bye ?', filter: 'all'},
    ]


    //итоговый стейт
    const endState = todolistReducer(startState, changeTodolistTitleAC(todolistId_2, 'New Title'))

    // проверка  что наши действия в стейте соответствуют ожиданию -
    // в массиве останется один тудулист
    expect(endState[1].title).toBe('New Title')
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

    //итоговый стейт
    const endState = todolistReducer(startState, changeTodolistFilterAC(todolistId_1, 'active'))

    // проверка  что наши действия в стейте соответствуют ожиданию -
    // в массиве останется один тудулист
    expect(endState[0].filter).toBe('active')
    expect(endState[1].filter).toBe('all')
})