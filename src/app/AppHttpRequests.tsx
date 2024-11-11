import Checkbox from '@mui/material/Checkbox'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Todolist } from '../features/todolists/api/todolistsApi.types'
import { Task } from '../features/todolists/api/tasksApi.types'
import { taskApi } from '../features/todolists/api/taskApi'
import { EditableSpan } from 'common/components'
import { AddItemForm } from 'common/components'
import { todolistsApi } from '../features/todolists/api/todolistsApi'

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([])
  const [tasks, setTasks] = useState<{ [key: string]: Task[] }>({})

  useEffect(() => {
    todolistsApi.getTodolists().then((res) => {
      const todolist = res.data
      setTodolists(todolist)
      todolist.forEach((tl) => {
        taskApi.getTask(tl.id).then((res) => {
          setTasks((prevTask) => ({ ...prevTask, [tl.id]: res.data.items })) //***
        })
      })
    })
  }, [])

  const createTodolistHandler = (title: string) => {
    todolistsApi.createTodolist(title).then((res) => {
      const newTodo = res.data.data.item
      setTodolists([...todolists, newTodo])
    })
  }

  const removeTodolistHandler = (id: string) => {
    todolistsApi.removeTodolist(id).then(() => {
      setTodolists(todolists.filter((t) => t.id !== id))
    })
  }

  const updateTodolistHandler = (id: string, title: string) => {
    todolistsApi.updateTodolist({ title, id }).then(() => {
      setTodolists(todolists.map((t) => (t.id === id ? { ...t, title } : t)))
    })
  }

  const createTaskHandler = (title: string, todolistId: string) => {
    taskApi.createTask({ title, todolistId }).then((res) => {
      const newTask = res.data.data.item
      setTasks({ ...tasks, [todolistId]: tasks[todolistId] ? [newTask, ...tasks[todolistId]] : [newTask] })
      // setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] })
    })
  }

  const removeTaskHandler = (taskId: string, todolistId: string) => {
    taskApi.removeTask({ todolistId, taskId }).then(() => {
      setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter((t) => t.id !== taskId) })
    })
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: Task, todolistId: string) => {
    taskApi.changeTaskStatus({ e, todolistId, task }).then((res) => {
      const updatedTask = res.data.data.item
      setTasks((prevTasks) => ({
        ...prevTasks,
        [todolistId]: prevTasks[todolistId].map((t) => (t.id === task.id ? updatedTask : t)),
      }))
    })
  }

  const changeTaskTitleHandler = (title: string, task: Task) => {
    taskApi.changeTaskTitle({ title, task }).then((res) => {
      const updateTaskTitle = res.data.data.item
      setTasks((prevTasks) => ({
        ...prevTasks,
        [task.todoListId]: prevTasks[task.todoListId].map((t) => (t.id === task.id ? updateTaskTitle : t)),
      }))
    })
  }

  return (
    <div style={{ margin: '20px' }}>
      <AddItemForm addItem={createTodolistHandler} />

      {/* Todolists */}
      {todolists.map((tl) => {
        return (
          <div key={tl.id} style={todolist}>
            <div>
              <EditableSpan oldTitle={tl.title} onClick={(title: string) => updateTodolistHandler(tl.id, title)} />
              <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
            </div>
            <AddItemForm addItem={(title) => createTaskHandler(title, tl.id)} />

            {/* Tasks */}
            {!!tasks[tl.id] &&
              tasks[tl.id].map((task: Task) => {
                return (
                  <div key={task.id}>
                    <Checkbox checked={task.status === 2} onChange={(e) => changeTaskStatusHandler(e, task, tl.id)} />
                    <EditableSpan onClick={(title) => changeTaskTitleHandler(title, task)} oldTitle={task.title} />
                    <button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
                  </div>
                )
              })}
          </div>
        )
      })}
    </div>
  )
}

// Styles
const todolist: React.CSSProperties = {
  border: '1px solid black',
  margin: '20px 0',
  padding: '10px',
  width: '300px',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
}

//***
//Вместо простого setTasks, нужно использовать функциональный вариант обновления состояния с коллбеком,
//чтобы каждый запрос не зависел от предыдущих значений.
//Используем setTasks(prevTasks => {...}), чтобы гарантировать,
//что обновления состояния tasks всегда основываются на самом последнем значении prevTasks, независимо от порядка выполнения асинхронных запросов.
//Теперь каждый setTasks вызов добавляет новые задачи в нужный тудулист без риска перезаписать уже существующие данные.

//****
//копируем объект тасок , далее обращаемся к конкретному тудулисту через [todolistId]:
//далее пишем новое значение которое у него будет - массив с новой таской которая пришла с сервера [newTask,
//и всеми тасками которые были ранее ...tasks[todolistId]
//Мы можем добавить проверку, чтобы, если tasks[todolistId] равен undefined, он инициализировался как пустой массив. Вот как это можно сделать:
