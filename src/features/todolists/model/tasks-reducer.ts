import { removeTodolistActionType } from './todolist-reducer'
import { taskApi } from '../api/taskApi'
import { RootState } from 'app/store'
import { DomainTask, UpdateTaskDomainModel } from '../api/tasksApi.types'
import { Dispatch } from 'redux'
import { Todolist } from '../api/todolistsApi.types'

export type TasksStateType = {
  [key: string]: DomainTask[]
}

//инициализационное состояние что бы  при первом запуске редакс его видел ,значение которое вернется из нашего reducer'a.
const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
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
        [action.payload.todolistId]: state[action.payload.todolistId].filter((f) => f.id !== action.payload.taskId),
      }
    case 'ADD-TASK': {
      const newTask = action.payload.task
      return {
        ...state,
        [newTask.todoListId]: [newTask, ...state[newTask.todoListId]],
      }
    }
    case 'UPDATE-TASK': {
      const task = action.payload.task
      return {
        ...state,
        [task.todoListId]: state[task.todoListId].map((t) => (t.id === task.id ? { ...t, ...task } : t)), // Заменяем найденную задачу новой версией ( текущие данные задачи + обновления)
      }
    }

    case 'ADD-TODOLIST':
      return {
        ...state,
        [action.args.todolist.id]: [],
        //создали пустой тудулист
      }
    case 'REMOVE-TODOLIST': {
      const {
        [action.args.id]: [],
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

export const removeTaskAC = (payload: { todolistId: string; taskId: string }) => {
  return { type: 'REMOVE-TASK', payload } as const
}

export const addTaskAC = (payload: { task: DomainTask }) => {
  return { type: 'ADD-TASK', payload } as const
}

export const updateTaskAC = (payload: { task: DomainTask }) => {
  return {
    type: 'UPDATE-TASK',
    payload,
  } as const
}

export const AddTodolistAC = (args: { todolist: Todolist }) => {
  return { type: 'ADD-TODOLIST', args } as const
}

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type updateTaskActionType = ReturnType<typeof updateTaskAC>
export type AddTodolistActionType = ReturnType<typeof AddTodolistAC>
export type SetTasksActionType = ReturnType<typeof setTasksAC>

//все типы action
export type TasksActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | updateTaskActionType
  | AddTodolistActionType
  | removeTodolistActionType
  | SetTasksActionType

//Thunk
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  taskApi.getTask(todolistId).then((res) => {
    const tasks = res.data.items
    dispatch(setTasksAC({ todolistId, tasks }))
  })
}

export const removeTaskTC = (args: { todolistId: string; taskId: string }) => (dispatch: Dispatch) => {
  taskApi.removeTask(args).then(() => {
    dispatch(removeTaskAC(args))
  })
}

export const addTaskTC = (args: { todolistId: string; title: string }) => (dispatch: Dispatch) => {
  taskApi.createTask(args).then((res) => {
    const newTask = res.data.data.item
    dispatch(addTaskAC({ task: newTask }))
  })
}

export const updateTaskTC =
  (args: {
    taskId: string
    todolistId: string
    domainModel: UpdateTaskDomainModel //Объект с данными, которые нужно изменить (например, status или title)
  }) =>
  (dispatch: Dispatch, getState: () => RootState) => {
    const state = getState() // используем getState(), чтобы получить все данные из Redux Store.
    const task = state.tasks[args.todolistId]?.find((t) => t.id === args.taskId)
    //В конкретном тудулисте (args.todolistId) ищем задачу по ID (args.taskId).
    //?Опциональная цепочка - Если state.tasks[args.todolistId]? вернул undefined (то есть массив задач для указанного тудулиста отсутствует),
    //то вызов метода .find(...) не произойдет, и весь результат выражения станет undefined.
    //Это защищает от ошибки Cannot read properties of undefined.

    if (!task) {
      console.error(`Task with ID ${args.taskId} not found in todolist ${args.todolistId}`)
      return // Если задача не найдена, выходим из функции
    }

    // Создание полной модели для обновления, объединяю текущие данные задачи с обновлениями
    const updatedModel: UpdateTaskDomainModel = {
      ...task,
      ...args.domainModel, //содержит обновления (например, новый статус или название).
    }

    taskApi.updateTask({ taskId: args.taskId, todolistId: args.todolistId, model: updatedModel }).then((res) => {
      const updatedTask = res.data.data.item
      dispatch(updateTaskAC({ task: updatedTask })) //С помощью dispatch вызываем changeTaskAC, чтобы обновить задачу в Redux Store.
    })
  }
