import React, { useCallback } from 'react'
import Box from '@mui/material/Box'
import { FilterValuesType, DomainTodolist } from 'app/AppWithRedux'
import { changeTodolistFilterAC } from '../../../../model/todolist-reducer'
import { FilterButtonContainerSx } from './FilterTasksButton.styles'
import { useAppDispatch } from 'common/hooks'
import { ButtonWithMemo } from '../../../button'

type Props = { todolist: DomainTodolist }

export const FilterTasksButtons = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const dispatch = useAppDispatch()
  //filter
  const changeFilterTasksHandler = useCallback(
    (filter: FilterValuesType) => {
      dispatch(changeTodolistFilterAC(id, filter))
    },
    [dispatch, id],
  )

  return (
    <>
      <Box sx={FilterButtonContainerSx}>
        <ButtonWithMemo
          variant={filter === 'all' ? 'contained' : 'outlined'}
          onClick={() => changeFilterTasksHandler('all')}
          color="success"
        >
          {' '}
          all
        </ButtonWithMemo>
        <ButtonWithMemo
          variant={filter === 'active' ? 'contained' : 'outlined'}
          onClick={() => changeFilterTasksHandler('active')}
          color="secondary"
        >
          {' '}
          active
        </ButtonWithMemo>
        <ButtonWithMemo
          variant={filter === 'completed' ? 'contained' : 'outlined'}
          onClick={() => changeFilterTasksHandler('completed')}
          color="error"
        >
          {' '}
          completed
        </ButtonWithMemo>
      </Box>
    </>
  )
}
