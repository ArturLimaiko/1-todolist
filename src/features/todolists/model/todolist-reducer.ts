import { Todolist } from '../api/todolistsApi.types'
import { todolistsApi } from '../api/todolistsApi'
import { AppActionsType } from 'app/store'
import { Dispatch } from 'redux'

//инициализационное состояние что бы  при первом запуске редакс его видел ,значение которое вернется из нашего reducer'a.
const initialState: DomainTodolist[] = []

export const todolistReducer = (state: DomainTodolist[] = initialState, action: AppActionsType): DomainTodolist[] => {
  switch (action.type) {
    case 'SET-TODOLISTS': {
      return action.todolists.map((tl) => ({ ...tl, filter: 'all' }))
    }
    case 'REMOVE-TODOLIST':
      return state.filter((t) => t.id !== action.args.id)

    case 'ADD-TODOLIST':
      const newTodoList: DomainTodolist = {
        id: action.args.todolist.id,
        title: action.args.todolist.title,
        filter: 'all',
        addedDate: '',
        order: 0,
      }
      return [newTodoList, ...state]

    case 'CHANGE-TODOLIST-TITLE':
      return state.map((t) => (t.id === action.args.id ? { ...t, title: action.args.title } : t))
    case 'CHANGE-TODOLIST-FILTER':
      const todolistId = action.args.todolistId
      return state.map((f) => (f.id === todolistId ? { ...f, filter: action.args.filter } : f))

    default:
      return state
  }
}

// Action creators
export const setTodolistsAC = (todolists: Todolist[]) => {
  return { type: 'SET-TODOLISTS', todolists } as const
}

export const removeTodolistAC = (id: string) => {
  return { type: 'REMOVE-TODOLIST', args: { id } } as const
}

export const addTodolistAC = (args: { todolist: Todolist }) => {
  return { type: 'ADD-TODOLIST', args } as const
}

export const changeTodolistTitleAC = (args: { id: string; title: string }) => {
  return { type: 'CHANGE-TODOLIST-TITLE', args } as const
}

export const changeTodolistFilterAC = (args: { todolistId: string; filter: FilterValuesType }) => {
  return { type: 'CHANGE-TODOLIST-FILTER', args } as const
}

//Thunk
export const fetchTodolistsTC = (dispatch: Dispatch<AppActionsType>) => {
  // внутри санки можно делать побочные эффекты (запросы на сервер)
  todolistsApi.getTodolists().then((res) => {
    // и диспатчить экшены (action) или другие санки (thunk)
    dispatch(setTodolistsAC(res.data))
  })
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch<AppActionsType>) => {
  todolistsApi.createTodolist(title).then((res) => {
    const newTodoTitle = res.data.data.item
    dispatch(addTodolistAC({ todolist: newTodoTitle }))
  })
}

export const removeTodolistTC = (id: string) => (dispatch: Dispatch<AppActionsType>) => {
  todolistsApi.removeTodolist(id).then(() => {
    dispatch(removeTodolistAC(id))
  })
}

export const updateTodolistTitleTC = (args: { id: string; title: string }) => (dispatch: Dispatch<AppActionsType>) => {
  todolistsApi.updateTodolist(args).then(() => {
    dispatch(changeTodolistTitleAC(args))
  })
}

// Actions types
export type setTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type removeTodolistActionType = ReturnType<typeof removeTodolistAC>
export type addTodolistActionType = ReturnType<typeof addTodolistAC>
export type changeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type changeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

export type TodolistsActionsType =
  | setTodolistsActionType
  | removeTodolistActionType
  | addTodolistActionType
  | changeTodolistTitleActionType
  | changeTodolistFilterActionType

export type FilterValuesType = 'all' | 'active' | 'completed'
export type DomainTodolist = Todolist & {
  filter: FilterValuesType
}
