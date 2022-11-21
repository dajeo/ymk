﻿import React, { useEffect, useState } from 'react'
import { Box, Button, Typography, Chip } from '@mui/material'
import { calcFullscreen } from '../utils'
import { Link } from 'react-router-dom'

function HomePage () {
  const [shortcut, setShortcut] = useState(null)

  useEffect(() => {
    const localShortcut = window.localStorage.quickShortcut

    if (localShortcut) setShortcut(JSON.parse(localShortcut))
  }, [])

  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      flexDirection={'column'}
      minHeight={1}
    >
      <Typography
        sx={{
          zIndex: -999,
          userSelect: 'none',
          msUserSelect: 'none',
          MozUserSelect: 'none',
          WebkitUserSelect: 'none',
          fontWeight: 'bold',
          fontSize: {
            xs: '20vw',
            xl: '16vw'
          }
        }}
      >YMK</Typography>
      <Box>
        <Button component={Link} to={'students/otp'}>
          ОТП
        </Button>
        <Button component={Link} to={'teachers'}>
          Преподаватели
        </Button>
      </Box>
      <Box sx={{ mt: 1 }}>
        {!shortcut
          ? <Chip label={'Найдите сердечко ❤'} />
          : <Button
            component={Link}
            to={`students/${shortcut.department}/${shortcut.group}`}
          >
            {shortcut.group}
          </Button>}
      </Box>
    </Box>
  )
}

export default HomePage
