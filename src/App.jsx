import React, { useMemo, useState, createContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider
} from '@mui/material'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HomePage from './pages/Home'
import GroupsPage from './pages/Groups'
import SchedulePage from './pages/Schedule'
import TeachersPage from './pages/Teachers'
import ScrollToTop from './components/ScrollToTop'

const ColorModeContext = createContext({ toggleColorMode: () => {} })

function App () {
  const currentTheme = window.localStorage.theme
  const [mode, setMode] = useState(currentTheme === 'dark' ? 'dark' : 'light')

  const colorMode = useMemo(() => ({
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
    }
  }), []
  )

  const theme = useMemo(() => {
    window.localStorage.theme = mode

    return createTheme({
      palette: { mode }
    })
  }, [mode]
  )

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <ScrollToTop />
          <Header colorModeContext={ColorModeContext} />

          <div>
            <Container disableGutters maxWidth={'xl'} sx={{ pl: '4px', pr: '4px' }}>
              <Routes>
                <Route path={'/'} element={<HomePage />} />
                <Route path={'/teachers'} element={<TeachersPage />} />
                <Route path={'/students/:department'} element={<GroupsPage />} />
                <Route path={'/students/:department/:group'} element={<SchedulePage />} />
                <Route path={'*'} element={
                  <h1 style={{ textAlign: 'center' }}>
                    Page not found
                  </h1>
                } />
              </Routes>
            </Container>
          </div>

          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
