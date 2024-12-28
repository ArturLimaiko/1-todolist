import React, { useCallback } from 'react'
import Grid from '@mui/material/Grid2'
import { useAppDispatch } from 'common/hooks'
import { addTodolistTC } from '../features/todolists/model/todolist-reducer'
import { AddItemForm } from 'common/components'
import { Todolists } from '../features/todolists/ui/Todolists/Todolists'

export const Main = () => {
  //присваиваем переменной метод useDispatch()-хук, прокинем его в каждую функцию
  //а он дальше сам разберется куда прокидывать
  const dispatch = useAppDispatch()

  const addTodoList = useCallback(
    (title: string) => {
      dispatch(addTodolistTC(title))
    },
    [dispatch],
  )

  return (
    <>
      <Grid container sx={{ padding: '30px' }}>
        <AddItemForm addItem={addTodoList} />
      </Grid>
      <Grid container spacing={2}>
        <Todolists />
      </Grid>
    </>
  )
}
