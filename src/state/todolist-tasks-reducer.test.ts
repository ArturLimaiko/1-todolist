import {TasksStateType, TodoListType} from "../app/AppWithRedux";
import {tasksReducer} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC, todolistReducer} from "./todolist-reducer";

test('ids should be equals', () => {
    //стартовый стейт
    const startTasksState: TasksStateType = {}
    const startTodolistsState: TodoListType[] = []

    const action = addTodolistAC('new todolist')

    //итоговый стейт
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodolists).toBe(action.todolistId)
})

test('property with todolist should be deleted', () => {
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
    const action = removeTodolistAC('todolistId2')
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
