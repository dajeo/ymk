import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material'
import { Link } from 'react-router-dom'
import React from 'react'
import PropTypes from 'prop-types'

function MobileDrawer ({ handleDrawerToggle, navItems, colorMode, iconTheme, textTheme }) {
  return (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
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

      <List disablePadding={true}>
        <Divider />

        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding={true}>
            <ListItemButton
              component={Link}
              to={item.link}
              disabled={item.disabled}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}

        <Divider />

        <ListItem disablePadding={true}>
          <ListItemButton onClick={colorMode.toggleColorMode}>
            <ListItemIcon>
              {iconTheme}
            </ListItemIcon>
            <ListItemText primary={textTheme} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )
}

MobileDrawer.propTypes = {
  handleDrawerToggle: PropTypes.func,
  navItems: PropTypes.array,
  colorMode: PropTypes.object,
  iconTheme: PropTypes.object,
  textTheme: PropTypes.string
}

export default MobileDrawer
