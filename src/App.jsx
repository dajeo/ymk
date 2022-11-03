import React, { useMemo, useState, createContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {
  Button,
  Container,
  createTheme,
  CssBaseline,
  Dialog, DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
  const [open, setOpen] = useState(!window.localStorage.newDomainDialog)
  const [mode, setMode] = useState(currentTheme === 'dark' ? 'dark' : 'light')

  const handleClose = (event, reason) => {
    if (reason && reason === 'backdropClick') return

    setOpen(false)
    window.localStorage.newDomainDialog = 0
  }

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

          <div style={{ paddingTop: '8px', paddingBottom: '8px' }}>
            <Container maxWidth={'xl'}>
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

              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {'Сайт переехал на новый домен'}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Вы будете автоматически перенаправлены на https://ymk.ink/
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>ОК</Button>
                </DialogActions>
              </Dialog>
            </Container>
          </div>

          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
