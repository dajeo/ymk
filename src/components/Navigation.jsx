import React, { useState, useEffect } from 'react'
import {
  BottomNavigation,
  BottomNavigationAction,
	Paper
} from '@mui/material'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import ReorderRoundedIcon from '@mui/icons-material/ReorderRounded'
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
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
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
      <BottomNavigation showLabels>
				<BottomNavigationAction label="Главная" icon={<HomeRoundedIcon />} component={Link} to={'/'} />
        <BottomNavigationAction label="ОТП" icon={<ReorderRoundedIcon />} component={Link} to={'students/otp'} />
        <BottomNavigationAction label="Преподаватели" icon={<PeopleRoundedIcon />} component={Link} to={'teachers'} />
				{!shortcut
          ? null
          : <BottomNavigationAction
              label={shortcut.group}
              icon={<DashboardRoundedIcon />}
              component={Link}
              to={`students/${shortcut.department}/${shortcut.group}`}
          	/>
				}
      </BottomNavigation>
    </Paper>
  )
}

export default Navigation
