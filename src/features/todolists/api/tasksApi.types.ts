import {TaskStatus} from "common/enums/enums";

export type Task = {
    description: string
    title: string
    status: TaskStatus
    priority: TaskStatus
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type GetTasksResponse = {
    error: string | null
    items: Task[]
    totalCount: number
}

export type UpdateTaskModel = {
    title: string
    description: string
    status: TaskStatus
    priority: TaskStatus
    startDate: string
    deadline: string
}
