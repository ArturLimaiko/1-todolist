import React from 'react'
import { changeThemeAC } from '../../../state/changeTheme-reducer'
import { getTheme } from 'common/theme'
import ButtonAppBar from '../ButtonAppBar/ButtonAppBar'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid2'
import { useAppDispatch } from 'common/hooks'
import { useAppSelector } from 'common/hooks'
import { selectThemeMode } from 'app/appSelectors'

export const Header = () => {
  let changeTheme = useAppSelector(selectThemeMode)
  const theme = getTheme(changeTheme)

  //присваиваем переменной метод useDispatch()-хук, прокинем его в каждую функцию
  //а он дальше сам разберется куда прокидывать
  const dispatch = useAppDispatch()

  const changeModeHandler = () => {
    dispatch(changeThemeAC(changeTheme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <Container fixed>
      <Grid>
        <ButtonAppBar onChange={changeModeHandler} />
      </Grid>
    </Container>
  )
}
