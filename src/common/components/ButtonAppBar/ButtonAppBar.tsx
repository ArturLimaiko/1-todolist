import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { MenuButton } from 'common/components'
import { useTheme } from '@mui/material'
import Switch from '@mui/material/Switch'

export type ButtonAppBarType = {
  onChange: () => void
}

export default function ButtonAppBar({ onChange }: ButtonAppBarType) {
  const theme = useTheme()

  return (
    <Box sx={{ flexGrow: 1, paddingBottom: '80px' }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todolist App
          </Typography>
          <MenuButton color="inherit" background={theme.palette.primary.light}>
            Login
          </MenuButton>
          <Switch color={'default'} onChange={onChange} /> Dark / Light
        </Toolbar>
      </AppBar>
    </Box>
  )
}
