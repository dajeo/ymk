import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import GroupsPage from './pages/GroupsPage'
import SchedulePage from './pages/SchedulePage'
import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material'

const ColorModeContext = React.createContext({ toggleColorMode: () => {} })

function App () {
  const [mode, setMode] = React.useState('light')
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      }
    }),
    []
  )

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: { mode }
      }),
    [mode]
  )

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Header colorModeContext={ColorModeContext} />

          <div style={{ padding: '8px' }}>
            <Container>
              <Routes>
                <Route path={'/'} element={<HomePage />} />
                <Route path={'/groups/:department'} element={<GroupsPage />} />
                <Route path={'/schedule/:department/:group'} element={<SchedulePage />} />
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
