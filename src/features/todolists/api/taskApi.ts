import { instance } from 'common/instance/instance'
import { BaseResponse } from 'common/types/types'
import { DomainTask, GetTasksResponse, UpdateTaskDomainModel } from './tasksApi.types'

export const taskApi = {
  getTask: (todolistId: string) => {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
  },
  createTask: (args: { title: string; todolistId: string }) => {
    const { title, todolistId } = args
    return instance.post<BaseResponse<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks`, { title })
  },
  removeTask(args: { taskId: string; todolistId: string }) {
    const { taskId, todolistId } = args
    return instance.delete<BaseResponse>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask(payload: { todolistId: string; taskId: string; model: UpdateTaskDomainModel }) {
    const { taskId, todolistId, model } = payload
    return instance.put<BaseResponse<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
}
