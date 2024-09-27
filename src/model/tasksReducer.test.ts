import {TasksStateType} from "../App";
import {removeTaskAC, tasksReducer} from "./tasksReducer";

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
