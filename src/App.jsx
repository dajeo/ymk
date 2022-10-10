import React, { useMemo, useState, createContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HomePage from './pages/Home'
import GroupsPage from './pages/Groups'
import SchedulePage from './pages/Schedule'
import ScrollToTop from './components/ScrollToTop'

const ColorModeContext = createContext({ toggleColorMode: () => {} })

function App () {
  const currentTheme = window.localStorage.getItem('theme')
  const [mode, setMode] = useState(currentTheme === 'dark' ? 'dark' : 'light')

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      }
    }),
    []
  )

  const theme = useMemo(
    () => {
      window.localStorage.setItem('theme', mode)

      return createTheme({
        palette: { mode }
      })
    },
    [mode]
  )

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <ScrollToTop />
          <Header colorModeContext={ColorModeContext} />

          <div style={{ paddingTop: '8px', paddingBottom: '8px' }}>
            <Container>
              <Routes>
                <Route path={'/'} element={<HomePage />} />
                <Route path={'/groups/:department'} element={<GroupsPage />} />
                <Route path={'/schedule/:department/:group'} element={<SchedulePage />} />
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
