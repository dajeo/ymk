import React, { useState, useEffect, useContext } from 'react'
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Tooltip,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
  Drawer,
  useTheme,
  ListItemIcon
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { Link, useLocation } from 'react-router-dom'
import {
  DarkModeRounded,
  LightModeRounded
} from '@mui/icons-material'
import PropTypes from 'prop-types'

const navItems = [
  {
    name: 'ОТП',
    link: '/groups/otp',
    disabled: false
  },
  {
    name: 'ОСГП',
    link: '/groups/osgp',
    disabled: true
  },
  {
    name: 'ОЕНП',
    link: '/groups/oenp',
    disabled: true
  }
]

function Header ({ colorModeContext }) {
  function getTheme (theme) {
    if (theme === 'dark') {
      return { text: 'Выключить темную тему', icon: <LightModeRounded /> }
    } else {
      return { text: 'Включить темную тему', icon: <DarkModeRounded /> }
    }
  }

  const theme = useTheme()
  const colorMode = useContext(colorModeContext)
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const initTheme = getTheme(theme.palette.mode)
  const [textTheme, setTextTheme] = useState(initTheme.text)
  const [iconTheme, setIconTheme] = useState(initTheme.icon)

  useEffect(() => {
    const newTheme = getTheme(theme.palette.mode)

    setTextTheme(newTheme.text)
    setIconTheme(newTheme.icon)
  }, [theme.palette.mode])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
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

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <>
      <AppBar
        position={'sticky'}
        sx={{
          borderBottomRightRadius: '6px',
          borderBottomLeftRadius: '6px'
        }}
      >
        <Container maxWidth={'xl'}>
          <Toolbar disableGutters={true} variant={'dense'}>
            <IconButton
              color={'inherit'}
              aria-label={'Open drawer'}
              edge={'start'}
              onClick={handleDrawerToggle}
              sx={{ mr: 1, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <div style={{ flexGrow: 1 }}>
              <Typography
                variant={'h6'}
                component={Link}
                to={'/'}
                sx={{
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  color: 'inherit'
                }}
              >
                YMK
              </Typography>
            </div>

            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItems.map((item) => (
                <Button
                  color={'inherit'}
                  key={item.name}
                  component={Link}
                  to={item.link}
                  disabled={item.disabled}
                  sx={{ color: '#fff', marginRight: 1 }}
                >
                  {item.name}
                </Button>
              ))}

              <Tooltip title={textTheme}>
                <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                  {iconTheme}
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: 300,
              borderTopRightRadius: '6px',
              borderBottomRightRadius: '6px'
            }
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  )
}

Header.propTypes = {
  colorModeContext: PropTypes.object
}

export default Header
