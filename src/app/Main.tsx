import React, { useCallback } from 'react'
import Grid from '@mui/material/Grid2'
import { AddItemForm } from 'common/components/AddItemForm/AddItemForm'
import { addTodolistAC } from '../state/todolist-reducer'
import { Todolists } from '../features/todolists/ui/Todolists/Todolists'
import { useAppDispatch } from 'common/hooks/useAppDispatch'

export const Main = () => {
  //присваиваем переменной метод useDispatch()-хук, прокинем его в каждую функцию
  //а он дальше сам разберется куда прокидывать
  const dispatch = useAppDispatch()

  const addTodoList = useCallback(
    (title: string) => {
      dispatch(addTodolistAC(title))
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
