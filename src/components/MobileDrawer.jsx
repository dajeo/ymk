import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material'
import { Link } from 'react-router-dom'
import React from 'react'

function MobileDrawer () {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography
        variant={'h6'}
        component={Link}
        to={'/'}
        sx={{
          py: 2,
          fontWeight: 'bold',
          textDecoration: 'none',
          color: 'inherit',
          display: 'block'
        }}
      >
        YMK
      </Typography>

      <Divider />

      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to={'students/otp'}>
            <ListItemText primary={'ОТП'} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to={'teachers'}>
            <ListItemText primary={'Преподаватели'} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )
}

export default MobileDrawer
