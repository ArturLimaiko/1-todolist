import React, { ChangeEvent, memo, useCallback } from 'react'
import Checkbox from '@mui/material/Checkbox'
import { EditableSpan } from 'common/components/EditableSpan/EditableSpan'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import ListItem from '@mui/material/ListItem'
import { useDispatch } from 'react-redux'
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from '../../../../../model/tasks-reducer'
import { getListItemSx } from './Task.style'
import { DomainTodolist } from '../../../../../model/todolist-reducer'
import { DomainTask } from '../../../../../api/tasksApi.types'
import { TaskStatus } from 'common/enums'

type Props = { task: DomainTask; todolist: DomainTodolist }

export const Task = memo(({ task, todolist }: Props) => {
  const dispatch = useDispatch()

  const updateTaskTitleHandler = useCallback(
    (newTitle: string) => {
      dispatch(changeTaskTitleAC(todolist.id, task.id, newTitle))
    },
    [dispatch, todolist.id, task.id],
  )

  const removeTaskHandler = useCallback(() => {
    dispatch(removeTaskAC(todolist.id, task.id))
  }, [dispatch, todolist.id, task.id])

  const changeTaskStatusHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newStatusValue = e.currentTarget.checked
      dispatch(changeTaskStatusAC(todolist.id, task.id, newStatusValue))
    },
    [dispatch, todolist.id, task.id],
  )

  return (
    <ListItem key={task.id} sx={getListItemSx(task.status === TaskStatus.Completed)}>
      <div>
        <Checkbox
          color="default"
          size="small"
          checked={task.status === TaskStatus.Completed}
          onChange={changeTaskStatusHandler}
        />
        <EditableSpan oldTitle={task.title} onClick={updateTaskTitleHandler} />
      </div>
      <IconButton aria-label="delete" size="small" onClick={removeTaskHandler}>
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </ListItem>
  )
})
