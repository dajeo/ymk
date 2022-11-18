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

function Header ({ colorModeContext }) {
  const theme = useTheme()
  const colorMode = useContext(colorModeContext)
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawer = () => {
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
              onClick={handleDrawer}
              sx={{ mr: 1, display: { sm: 'none' } }}
            >
              <MenuRoundedIcon />
            </IconButton>
            <Box sx={{ flex: 1, textAlign: { xs: 'center', sm: 'left' } }}>
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
            </Box>

            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Button
                color={'inherit'}
                component={Link}
                to={'students/otp'}
              >
                ОТП
              </Button>
              <Button
                color={'inherit'}
                component={Link}
                to={'teachers'}
              >
                Преподаватели
              </Button>
            </Box>

            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color={'inherit'}>
              {theme.palette.mode === 'dark' ? <LightModeRounded /> : <DarkModeRounded />}
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawer}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: 300,
              borderTopRightRadius: '6px',
              borderBottomRightRadius: '6px'
            }
          }}
        >
          <MobileDrawer onClick={handleDrawer} />
        </Drawer>
      </Box>
    </>
  )
}

Header.propTypes = {
  colorModeContext: PropTypes.object
}

export default Header
