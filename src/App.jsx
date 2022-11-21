import React, { useMemo, useState, createContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider
} from '@mui/material'
import Header from './components/layout/Header'
import HomePage from './pages/Home'
import GroupsPage from './pages/Groups'
import SchedulePage from './pages/Schedule'
import TeachersPage from './pages/Teachers'
import TeacherSchedulePage from './pages/TeacherSchedule'
import { calcFullscreen } from './utils'

function App () {
  const colorScheme = window.matchMedia('(prefers-color-scheme: dark)')
  const [mode, setMode] = useState(colorScheme.matches ? 'dark' : 'light')
  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode])

  colorScheme.addEventListener('change', event => setMode(event.matches ? 'dark' : 'light'));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Header />

        <Container disableGutters maxWidth={'xl'} sx={{ pl: '4px', pr: '4px', height: calcFullscreen() }}>
          <Routes>
            <Route path={'/'} element={<HomePage />} />
            <Route path={'/teachers'} element={<TeachersPage />} />
            <Route path={'/teachers/:teacher'} element={<TeacherSchedulePage />} />
            <Route path={'/students/:department'} element={<GroupsPage />} />
            <Route path={'/students/:department/:group'} element={<SchedulePage />} />
            <Route path={'*'} element={
              <h1 style={{ textAlign: 'center' }}>Page not found</h1>
            } />
          </Routes>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
