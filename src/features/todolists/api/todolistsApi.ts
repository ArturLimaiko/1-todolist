import {Response, Todolist} from "./todolistsApi.types";
import {instance} from "../../../common/instance/instance";

export const todolistsApi = {
    getTodolists: () => {
        return instance.get<Todolist[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<Response<{ item: Todolist }>>('todo-lists', {title})
    },
    removeTodolist(id: string) {
        return instance.delete<Response>(`todo-lists/${id}`)
    },
    updateTodolist(args :{ id:string,title:string}) {
        const {id,title} = args//в объекте порядок уже не важен
        return instance.put<Response>(`todo-lists/${id}`, {title})
    }
}