export type Todolist = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}


export type Response<D = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: D
}
