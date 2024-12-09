import React, { memo, useCallback } from 'react'
import { AddItemForm } from 'common/components'
import { DomainTodolist } from 'app/AppWithRedux'
import { addTaskAC } from '../../../model/tasks-reducer'
import { FilterTasksButtons } from './FilterTasksButtons/FilterTasksButtons'
import { TodolistTitle } from './TodolistTitlte/TodolistTitle'
import { useAppDispatch } from 'common/hooks'
import { Tasks } from './Tasks/Tasks'

type Props = { todolist: DomainTodolist }

export const TodolistWithRedux = memo(({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  //addTask
  const addTaskHandler = useCallback(
    (title: string) => {
      dispatch(addTaskAC(todolist.id, title))
    },
    [dispatch],
  )

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskHandler} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </div>
  )
})
