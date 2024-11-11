export type Task = {
    description: string
    title: string
    status: number
    priority: number
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
    status: number
    priority: number
    startDate: string
    deadline: string
}
