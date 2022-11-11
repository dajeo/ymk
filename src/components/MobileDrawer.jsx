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
import PropTypes from 'prop-types'

function MobileDrawer ({ handleDrawerToggle, navItems }) {
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

      <List disablePadding>
        <Divider />

        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              component={Link}
              to={item.link}
              disabled={item.disabled}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

MobileDrawer.propTypes = {
  handleDrawerToggle: PropTypes.func,
  navItems: PropTypes.array
}

export default MobileDrawer
