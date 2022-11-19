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
import { Link, useLocation } from 'react-router-dom'
import {
  DarkModeRounded,
  LightModeRounded
} from '@mui/icons-material'
import PropTypes from 'prop-types'

function Header ({ colorModeContext }) {
  const theme = useTheme()
  const colorMode = useContext(colorModeContext)

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
            <Box sx={{ flex: 1 }}>
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
    </>
  )
}

Header.propTypes = {
  colorModeContext: PropTypes.object
}

export default Header
