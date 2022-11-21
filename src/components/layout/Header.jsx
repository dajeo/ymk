import React from 'react'
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  Button
} from '@mui/material'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function Header () {
  return (
    <>
      <AppBar
        position={'static'}
        sx={{
          borderBottomRightRadius: '8px',
          borderBottomLeftRadius: '8px'
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
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}

export default Header
