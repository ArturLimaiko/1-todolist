import {
    addTaskAC,
    AddTodolistAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "../tasks-reducer";
import {TasksStateType} from "../../app/AppWithRedux";

let startState: TasksStateType

beforeEach(() => {
    //стартовый стейт для всех тестов
    startState = {
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
})

test('correct tasks should be deleted from correct array', () => {
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

test('new array should be added when new todolist is added', () => {
    //итоговый стейт
    const action = AddTodolistAC('new todolist')
    const endState = tasksReducer(startState, action)

    //возвращает массив ключей объекта.
    //в нашем случае вернет ['todolistId1', 'todolistId2', 'newTodolistId']
    const keys = Object.keys(endState)

    //find ищет первый элемент, удовлетворяющий условию внутри функции-колбэка
    //В этом случае find ищет ключ, который не равен 'todolistId1' и не равен 'todolistId2'.
    //Если в массиве ключей найдется такой ключ (например, 'newTodolistId'), то он будет сохранён в переменной newKey.
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2');
    if (!newKey) {
        throw Error('New key should be added')
    }
    //если не найден, генерируется ошибка с сообщением 'New key should be added'.

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
