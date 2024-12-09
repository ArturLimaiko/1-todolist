import { v1 } from 'uuid'
import { removeTodolistActionType } from './todolist-reducer'
import { taskApi } from '../api/taskApi'
import { AppDispatch } from 'app/state'
import { TaskPriority, TaskStatus } from 'common/enums'
import { DomainTask } from '../api/tasksApi.types'

export type TasksStateType = {
  [key: string]: DomainTask[]
}

//инициализационное состояние что бы  при первом запуске редакс его видел ,значение которое вернется из нашего reducer'a.
const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case 'SET-TASKS': {
      const stateCopy = { ...state }
      stateCopy[action.payload.todolistId] = action.payload.tasks
      return stateCopy
    }
    case 'REMOVE-TASK':
      //если таска не равна => добавь ( иначе удалит)
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter((f) => f.id !== action.taskId),
      }
    case 'ADD-TASK': {
      const newTask: DomainTask = {
        title: action.title,
        todoListId: action.todolistId,
        startDate: '',
        priority: TaskPriority.Low,
        description: '',
        deadline: '',
        status: TaskStatus.New,
        addedDate: '',
        order: 0,
        id: v1(),
      }

      return {
        ...state,
        [action.todolistId]: [...state[action.todolistId], newTask],
      }
    }
    case 'CHANGE-TASK-STATUS': {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((t) =>
          t.id === action.taskId ? { ...t, isDone: action.isDone } : t,
        ),
      }
    }
    case 'CHANGE-TASK-TITLE':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((t) =>
          t.id === action.taskId ? { ...t, title: action.newTitle } : t,
        ),
      }
    case 'ADD-TODOLIST':
      return {
        ...state,
        [action.todolistId]: [],
        //создали пустой тудулист
      }
    case 'REMOVE-TODOLIST': {
      const {
        [action.todolistId]: [],
        ...rest
      } = state
      return rest
    }
    default:
      return state
  }
}

// Action creators
export const setTasksAC = (payload: { todolistId: string; tasks: DomainTask[] }) => {
  return {
    type: 'SET-TASKS',
    payload,
  } as const
}

export const removeTaskAC = (todolistId: string, taskId: string) => {
  return { type: 'REMOVE-TASK', todolistId, taskId } as const
}

export const addTaskAC = (todolistId: string, title: string) => {
  return { type: 'ADD-TASK', todolistId, title } as const
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
  return { type: 'CHANGE-TASK-STATUS', todolistId, taskId, isDone } as const
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string) => {
  return { type: 'CHANGE-TASK-TITLE', todolistId, taskId, newTitle } as const
}

export const AddTodolistAC = (title: string) => {
  return { type: 'ADD-TODOLIST', title, todolistId: v1() } as const
}

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type AddTodolistActionType = ReturnType<typeof AddTodolistAC>
export type SetTasksActionType = ReturnType<typeof setTasksAC>

//все типы action
export type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | removeTodolistActionType
  | SetTasksActionType

//Thunk
export const fetchTasksTC = (todolistId: string) => (dispatch: AppDispatch) => {
  taskApi.getTask(todolistId).then((res) => {
    const tasks = res.data.items
    dispatch(setTasksAC({ todolistId, tasks }))
  })
}
