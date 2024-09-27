import {TasksStateType} from "../App";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasksReducer";

test('correct tasks should be deleted from correct array', () => {
    //стартовый стейт
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: 'NextJs', isDone: false},
            {id: '2', title: 'StoryBook', isDone: true},
            {id: '3', title: 'TS', isDone: true},
        ]
    }

    //итоговый стейт
    const action = removeTaskAC('2', 'todolistId2')
    const endState = tasksReducer(startState, action)

    // проверка  что наши действия в стейте соответствуют ожиданию -
    // в нужном массиве удалится нужная таска
    expect(endState).toEqual({
            'todolistId1': [
                {id: '1', title: 'HTML&CSS', isDone: true},
                {id: '2', title: 'JS', isDone: true},
                {id: '3', title: 'ReactJS', isDone: false},
            ],
            'todolistId2': [
                {id: '1', title: 'NextJs', isDone: false},
                {id: '3', title: 'TS', isDone: true},
            ]
        }
    )
})

test('correct tasks should be added from correct array', () => {
    //стартовый стейт
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: 'NextJs', isDone: false},
            {id: '2', title: 'StoryBook', isDone: true},
            {id: '3', title: 'TS', isDone: true},
        ]
    }

    //итоговый стейт
    const action = addTaskAC('todolistId1', 'JQuery')
    const endState = tasksReducer(startState, action)

    // проверка  что наши действия в стейте соответствуют ожиданию -
    // в нужном массиве добавится нужная таска
    expect(endState['todolistId1'].length).toBe(4)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId1'][3].id).toBeDefined()
    expect(endState['todolistId1'][3].title).toBe('JQuery')
    expect(endState['todolistId1'][3].isDone).toBe(false)
})

test('status of specified task should be  changed', () => {
    //стартовый стейт
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: 'NextJs', isDone: false},
            {id: '2', title: 'StoryBook', isDone: true},
            {id: '3', title: 'TS', isDone: true},
        ]
    }

    //итоговый стейт
    const action = changeTaskStatusAC('todolistId2', '1', true)
    const endState = tasksReducer(startState, action)

    // проверка  что наши действия в стейте соответствуют ожиданию -
    // в нужном массиве добавится нужная таска
    expect(endState['todolistId2'][0].isDone).toBeTruthy()
    expect(endState['todolistId2'][1].isDone).toBe(true)
    expect(endState['todolistId2'][1].isDone).toEqual(true)
    expect(endState['todolistId2'][2].isDone).toEqual(true)
})

test('title of specified task should be changed', () => {
    //стартовый стейт
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: 'NextJs', isDone: false},
            {id: '2', title: 'StoryBook', isDone: true},
            {id: '3', title: 'TS', isDone: true},
        ]
    }

    //итоговый стейт
    const action = changeTaskTitleAC('todolistId2', '3', 'TypeScript')
    const endState = tasksReducer(startState, action)

    // проверка  что наши действия в стейте соответствуют ожиданию -
    // в нужном массиве добавится нужная таска
    expect(endState['todolistId2'][2].title).toBe('TypeScript')
    expect(endState['todolistId2'][2]).toEqual({id: '3', title: 'TypeScript', isDone: true})
})
