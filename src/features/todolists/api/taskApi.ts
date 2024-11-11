import {GetTasksResponse, Task, UpdateTaskModel} from "./tasksApi.types";
import {instance} from "common/instance/instance";
import {ChangeEvent} from "react";
import {BaseResponse} from "common/types/types";
import {TaskStatus} from "common/enums/enums";

export const taskApi = {
    getTask:(todolistId:string) => {
       return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    createTask: (args: { title: string, todolistId: string }) => {
        const {title, todolistId} = args;
        return instance.post<BaseResponse<{ item: Task }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    removeTask(args: { taskId: string, todolistId: string }) {
        const {taskId, todolistId} = args;
        return instance.delete<BaseResponse>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    changeTaskStatus(args: { e: ChangeEvent<HTMLInputElement>, task: Task, todolistId: string }) {
        const {e, todolistId, task} = args;
        const model: UpdateTaskModel = {
            title: task.title,
            description: task.description,
            status: e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
        }
        return instance.put<BaseResponse<{ item: Task }>>(`todo-lists/${todolistId}/tasks/${task.id}`, model)
    },
    changeTaskTitle(args: { title: string, task: Task }) {
        const {title, task} = args;
        return instance.put<BaseResponse<{ item: Task }>>(`todo-lists/${task.todoListId}/tasks/${task.id}`, {title})
    }
}