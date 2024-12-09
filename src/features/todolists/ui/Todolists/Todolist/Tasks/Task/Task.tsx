import React, { ChangeEvent } from 'react'
import Checkbox from '@mui/material/Checkbox'
import { EditableSpan } from 'common/components/EditableSpan/EditableSpan'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import ListItem from '@mui/material/ListItem'
import { removeTaskTC, updateTaskTC } from '../../../../../model/tasks-reducer'
import { getListItemSx } from './Task.style'
import { DomainTodolist } from '../../../../../model/todolist-reducer'
import { TaskStatus } from 'common/enums'
import { useAppDispatch } from 'common/hooks'
import { DomainTask } from '../../../../../api/tasksApi.types'

type Props = { task: DomainTask; todolist: DomainTodolist }

export const Task = ({ task, todolist }: Props) => {
  const dispatch = useAppDispatch()

  const updateTaskTitleHandler = (title: string) => {
    const newTask = { ...task, title }
    dispatch(updateTaskTC({ todolistId: todolist.id, taskId: task.id, domainModel: newTask }))
  }

  const removeTaskHandler = () => {
    dispatch(removeTaskTC({ taskId: task.id, todolistId: todolist.id }))
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    const newTask = { ...task, status }
    dispatch(updateTaskTC({ todolistId: todolist.id, taskId: task.id, domainModel: newTask }))
  }

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
}
