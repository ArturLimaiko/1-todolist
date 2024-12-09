import React, { memo, useEffect, useMemo } from 'react'
import List from '@mui/material/List'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { tasksSelectors } from '../../../../model'
import { Task } from './Task'
import { TaskStatus } from 'common/enums'

import { useAppDispatch } from 'common/hooks'
import { fetchTasksTC } from '../../../../model/tasks-reducer'
import { DomainTodolist } from '../../../../model/todolist-reducer'

type Props = { todolist: DomainTodolist }

export const Tasks = memo(({ todolist }: Props) => {
  let tasks = useAppSelector(tasksSelectors)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTasksTC(todolist.id))
  }, [])

  const allTodolistTasks = tasks[todolist.id]
  let tasksForTodolist = allTodolistTasks

  let filteredTasks = useMemo(() => {
    //фильтрация тасок
    if (todolist.filter === 'active') {
      tasksForTodolist = allTodolistTasks.filter((task) => task.status === TaskStatus.New)
    }
    if (todolist.filter === 'completed') {
      tasksForTodolist = allTodolistTasks.filter((task) => task.status === TaskStatus.Completed)
    }
    return tasks
  }, [tasks, todolist.filter])

  return (
    <>
      {tasksForTodolist?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasksForTodolist?.map((task) => {
            return <Task key={task.id} todolist={todolist} task={task} />
          })}
        </List>
      )}
    </>
  )
})
