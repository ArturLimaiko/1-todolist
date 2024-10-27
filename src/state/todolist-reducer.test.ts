import {v1} from "uuid";
import {TodoListType} from "../components/AppWithRedux";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./todolist-reducer";

let startState: TodoListType[]
let todolistId_1: string
let todolistId_2: string

//инициализируется перед каждый тестом с этими данными
beforeEach(() => {
    todolistId_1 = v1()
    todolistId_2 = v1()

    //стартовый стейт для всех тестов
    startState = [
        {id: todolistId_1, title: 'Whats to learn ?', filter: 'all'},
        {id: todolistId_2, title: 'What to bye ?', filter: 'all'},
    ]
})

test('correct todolist should be removed', () => {

    //итоговый стейт
    const endState = todolistReducer(startState, removeTodolistAC(todolistId_2))

    // проверка  что наши действия в стейте соответствуют ожиданию -
    // в массиве останется один тудулист
    expect(endState.length).toBe(1)
    expect(endState[1]).toBe(undefined)
    expect(endState[0].id).toBe(todolistId_1)
})

test('correct todolist should be added', () => {
    //стартовый стейт
    //из бефорич

    //итоговый стейт
    const endState = todolistReducer(startState, addTodolistAC('New Todo'))

    // проверка  что наши действия в стейте соответствуют ожиданию -
    // в массиве останется один тудулист
    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('New Todo')
})

test('correct todolist should change its name', () => {
    //итоговый стейт
    const endState = todolistReducer(startState, changeTodolistTitleAC(todolistId_2, 'New Title'))

    // проверка  что наши действия в стейте соответствуют ожиданию -
    // в массиве останется один тудулист
    expect(endState[1].title).toBe('New Title')
    expect(endState[0].title).toBe('Whats to learn ?')
})

test('correct filter of todolist should be  changed', () => {
    //итоговый стейт
    const endState = todolistReducer(startState, changeTodolistFilterAC(todolistId_1, 'active'))

    // проверка  что наши действия в стейте соответствуют ожиданию -
    // в массиве останется один тудулист
    expect(endState[0].filter).toBe('active')
    expect(endState[1].filter).toBe('all')
})