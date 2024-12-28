import { Todolist } from '../api/todolistsApi.types'
import { todolistsApi } from '../api/todolistsApi'
import { AppDispatch } from 'app/store'

export type FilterValuesType = 'all' | 'active' | 'completed'

export type DomainTodolist = Todolist & {
  filter: FilterValuesType
}

//инициализационное состояние что бы  при первом запуске редакс его видел ,значение которое вернется из нашего reducer'a.
const initialState: DomainTodolist[] = []

export const todolistReducer = (
  state: DomainTodolist[] = initialState,
  action: TodolistsActionsType,
): DomainTodolist[] => {
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
      return state.map((t) => (t.id === action.todolistId ? { ...t, title: action.updatedTitle } : t))
    case 'CHANGE-TODOLIST-FILTER':
      const todolistId = action.todolistId
      return state.map((f) => (f.id === todolistId ? { ...f, filter: action.filter } : f))

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

export const changeTodolistTitleAC = (todolistId: string, updatedTitle: string) => {
  return { type: 'CHANGE-TODOLIST-TITLE', todolistId, updatedTitle } as const
}

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
  return { type: 'CHANGE-TODOLIST-FILTER', todolistId, filter } as const
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

//Thunk
export const fetchTodolistsTC = (dispatch: AppDispatch) => {
  // внутри санки можно делать побочные эффекты (запросы на сервер)
  todolistsApi.getTodolists().then((res) => {
    // и диспатчить экшены (action) или другие санки (thunk)
    dispatch(setTodolistsAC(res.data))
  })
}

export const addTodolistTC = (title: string) => (dispatch: AppDispatch) => {
  todolistsApi.createTodolist(title).then((res) => {
    const newTodoTitle = res.data.data.item
    dispatch(addTodolistAC({ todolist: newTodoTitle }))
  })
}

export const removeTodolistTC = (id: string) => (dispatch: AppDispatch) => {
  todolistsApi.removeTodolist(id).then(() => {
    dispatch(removeTodolistAC(id))
  })
}
