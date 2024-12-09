import React from 'react'
import { AddItemForm } from 'common/components'
import { addTaskTC } from '../../../model/tasks-reducer'
import { FilterTasksButtons } from './FilterTasksButtons/FilterTasksButtons'
import { TodolistTitle } from './TodolistTitlte/TodolistTitle'
import { useAppDispatch } from 'common/hooks'
import { Tasks } from './Tasks/Tasks'
import { DomainTodolist } from '../../../model/todolist-reducer'

type Props = { todolist: DomainTodolist }

export const TodolistWithRedux = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const addTaskHandler = (title: string) => {
    dispatch(addTaskTC({ title, todolistId: todolist.id }))
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskHandler} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </div>
  )
}
