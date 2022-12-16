import React, { useState, useEffect } from 'react'
import {
  BottomNavigation,
  BottomNavigationAction,
	Paper
} from '@mui/material'
import { Link } from 'react-router-dom'

function Navigation () {
  const [shortcut, setShortcut] = useState(null)

  const updateLocalStorage = () => {
    const localShortcut = window.localStorage.quickShortcut

    if (localShortcut) setShortcut(JSON.parse(localShortcut))
    else setShortcut(null)
  }

  useEffect(() => {
    updateLocalStorage()
  }, [])

  window.addEventListener('storage', () => {
    updateLocalStorage()
  })

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
      >
				<BottomNavigationAction label="Главная" component={Link} to={'/'} />
        <BottomNavigationAction label="ОТП" component={Link} to={'students/otp'} />
        <BottomNavigationAction label="Преподаватели" component={Link} to={'teachers'} />
				{!shortcut
          ? null
          : <BottomNavigationAction
						label={shortcut.group}
            component={Link}
            to={`students/${shortcut.department}/${shortcut.group}`}
          	/>
				}
      </BottomNavigation>
    </Paper>
  )
}

export default Navigation
