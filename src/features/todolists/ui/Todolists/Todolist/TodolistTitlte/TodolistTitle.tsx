import React, { memo, useCallback } from 'react'
import { DomainTodolist, removeTodolistTC, updateTodolistTitleTC } from '../../../../model/todolist-reducer'
import { EditableSpan } from 'common/components/EditableSpan/EditableSpan'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { useAppDispatch } from 'common/hooks'

type Props = { todolist: DomainTodolist }

export const TodolistTitle = memo(({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const updateTodolistTitleHandler = useCallback(
    (title: string) => {
      dispatch(updateTodolistTitleTC({ id: todolist.id, title }))
    },
    [dispatch],
  )

  const removeTodolistTitleHandler = useCallback(() => {
    dispatch(removeTodolistTC(todolist.id))
  }, [dispatch])

  return (
    <h3>
      <EditableSpan oldTitle={todolist.title} onClick={updateTodolistTitleHandler} />
      <IconButton aria-label="delete" size="small" onClick={removeTodolistTitleHandler}>
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </h3>
  )
})
