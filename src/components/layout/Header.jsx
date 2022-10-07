import React from 'react'
import {
  AppBar,
  Box,
  Container,
  Toolbar,
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
import { Link } from 'react-router-dom'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import PropTypes from 'prop-types'

const navItems = [
  {
    name: 'Главная',
    link: '/',
    disabled: false
  },
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
  const theme = useTheme()
  const colorMode = React.useContext(colorModeContext)
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        ЯМК
      </Typography>

      <List>
        <Divider />

        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding={true}>
            <ListItemButton
              component={Link}
              to={item.link}
              disabled={item.disabled}
              sx={{ textAlign: 'center' }}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}

        <Divider />

        <ListItem disablePadding={true}>
          <ListItemButton onClick={colorMode.toggleColorMode}>
            <ListItemIcon>
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </ListItemIcon>
            <ListItemText primary={theme.palette.mode === 'dark' ? 'Выключить темную тему' : 'Включить темную тему'} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )

  return (
    <>
      <AppBar
        position={'sticky'}
        sx={{
          borderBottomRightRadius: '6px',
          borderBottomLeftRadius: '6px'
        }}
      >
        <Container>
          <Toolbar disableGutters={true}>
            <IconButton
              color={'inherit'}
              aria-label={'Open drawer'}
              edge={'start'}
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant={'h6'}
              component="div"
              sx={{ flexGrow: 1 }}
            >
              ЯМК
            </Typography>

            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  component={Link}
                  to={item.link}
                  disabled={item.disabled}
                  sx={{ color: '#fff' }}
                >
                  {item.name}
                </Button>
              ))}
              <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
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
          sx={{ '& .MuiDrawer-paper': { width: 300 } }}
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
