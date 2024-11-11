import {Response} from "./todolistsApi.types";
import {GetTasksResponse, Task, UpdateTaskModel} from "./tasksApi.types";
import {instance} from "../../../common/instance/instance";
import {ChangeEvent} from "react";

export const taskApi = {
    getTask:(todolistId:string) => {
       return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    createTask: (args: { title: string, todolistId: string }) => {
        const {title, todolistId} = args;
        return instance.post<Response<{ item: Task }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    removeTask(args: { taskId: string, todolistId: string }) {
        const {taskId, todolistId} = args;
        return instance.delete<Response>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    changeTaskStatus(args: { e: ChangeEvent<HTMLInputElement>, task: Task, todolistId: string }) {
        const {e, todolistId, task} = args;
        const model: UpdateTaskModel = {
            title: task.title,
            description: task.description,
            status: e.currentTarget.checked ? 2 : 0,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
        }
        return instance.put<Response<{ item: Task }>>(`todo-lists/${todolistId}/tasks/${task.id}`, model)
    },
    changeTaskTitle(args: { title: string, task: Task }) {
        const {title, task} = args;
        return instance.put<Response<{ item: Task }>>(`todo-lists/${task.todoListId}/tasks/${task.id}`, {title})
    }
}