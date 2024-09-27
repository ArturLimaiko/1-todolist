import {TasksStateType} from "../App";

export type RemoveTaskACType = ReturnType<typeof removeTaskAC>

//все типы action
export type ActionsType = RemoveTaskACType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            // setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)}// если таска не равна => добавь ( иначе удалит)
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(f => f.id !== action.taskId)
            }
        }
        default: throw new Error('Unknown action type')
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', taskId, todolistId} as const
}