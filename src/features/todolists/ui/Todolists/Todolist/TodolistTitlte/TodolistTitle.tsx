import React, { memo, useCallback } from 'react'
import { changeTodolistTitleAC, DomainTodolist, removeTodolistTC } from '../../../../model/todolist-reducer'
import { EditableSpan } from 'common/components/EditableSpan/EditableSpan'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { useAppDispatch } from 'common/hooks'

type Props = { todolist: DomainTodolist }

export const TodolistTitle = memo(({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const updateTodolistTitleHandler = useCallback(
    (updateTitle: string) => {
      dispatch(changeTodolistTitleAC(todolist.id, updateTitle))
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
