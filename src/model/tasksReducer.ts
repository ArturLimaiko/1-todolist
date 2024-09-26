// import {TaskStateType} from "../App";
//
// export let initialTaskState: TaskStateType = {}
//
// export const taskReducer = (state: initialTaskState, action: TaskReducerACType):TaskStateType=> {
//     switch (action.type) {
//         case 'REMOVE-TASK':
//             // setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
//             return {
//                 ...state, [action.todolistId]: state[action.todolistId]
//                     .filter(t => t.id !== action.taskID)
//             }
//         default:
//             return state
//     }
// }
//
// type TaskReducerACType = RemoveTaskAC
//
//
// type RemoveTaskAC = ReturnType<typeof removeTaskAC>
// export const removeTaskAC = (taskId: string, todolistId: string) => {
//     return {type: 'REMOVE-TASK', taskId, todolistId}
// }