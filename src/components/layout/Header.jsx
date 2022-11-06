import React, { useState, useEffect, useContext } from 'react'
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  useTheme
} from '@mui/material'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import { Link, useLocation } from 'react-router-dom'
import {
  DarkModeRounded,
  LightModeRounded
} from '@mui/icons-material'
import PropTypes from 'prop-types'
import MobileDrawer from '../MobileDrawer'

const navItems = [
  {
    name: 'ОТП',
    link: 'students/otp',
    disabled: false
  },
  {
    name: 'ОСГП',
    link: '/',
    disabled: true
  },
  {
    name: 'ОЕНП',
    link: '/',
    disabled: true
  },
  {
    name: 'Преподаватели',
    link: '/teachers',
    disabled: false
  }
]

function Header ({ colorModeContext }) {
  const theme = useTheme()
  const colorMode = useContext(colorModeContext)
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

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
          <Toolbar disableGutters variant={'dense'}>
            <IconButton
              color={'inherit'}
              edge={'start'}
              onClick={handleDrawerToggle}
              sx={{ mr: 1, display: { sm: 'none' } }}
            >
              <MenuRoundedIcon />
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
                  key={item.name}
                  color={'inherit'}
                  component={Link}
                  to={item.link}
                  disabled={item.disabled}
                  sx={{ color: '#fff' }}
                >
                  {item.name}
                </Button>
              ))}

              <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color={'inherit'}>
                {theme.palette.mode === 'dark' ? <LightModeRounded /> : <DarkModeRounded />}
              </IconButton>
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
          <MobileDrawer
            handleDrawerToggle={handleDrawerToggle}
            navItems={navItems}
            colorMode={colorMode}
            theme={theme}
          />
        </Drawer>
      </Box>
    </>
  )
}

Header.propTypes = {
  colorModeContext: PropTypes.object
}

export default Header
