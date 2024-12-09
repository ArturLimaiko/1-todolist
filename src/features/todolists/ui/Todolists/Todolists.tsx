import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid2'
import { Paper } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { TodolistWithRedux } from './Todolist/TodolistWithRedux'
import { todolistsSelectors } from '../../model'
import { todolistsApi } from '../../api/todolistsApi'
import { setTodolistsAC } from '../../../../state/todolist-reducer'

export const Todolists = () => {
  let todolists = useAppSelector(todolistsSelectors)

  const dispatch = useAppDispatch()

  useEffect(() => {
    todolistsApi.getTodolists().then((res) => {
      dispatch(setTodolistsAC(res.data))
    })
  }, [])

  return (
    //по скольку возвращаю массив элементов а это не допустимо то оборачиваю в React.Fragment - будет восприниматься JSX как один целый компонент
    <React.Fragment>
      {todolists.map((t) => {
        return (
          <Grid sx={{ p: '30px' }} key={t.id}>
            <Paper elevation={5} sx={{ p: '30px' }}>
              <TodolistWithRedux todolist={t} />
            </Paper>
          </Grid>
        )
      })}
    </React.Fragment>
  )
}
