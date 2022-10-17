import React, { useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
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
      minHeight={calcFullscreen}
    >
      <Typography
        sx={{
          zIndex: -999,
          userSelect: 'none',
          msUserSelect: 'none',
          WebkitUserSelect: 'none',
          fontWeight: 'bold',
          fontSize: {
            xs: '20vw',
            xl: '16vw'
          }
        }}
      >YMK</Typography>
      <Box>
        <Button component={Link} to={'/groups/otp'}>
          ОТП
        </Button>
        <Button disabled={true}>
          ОСГП
        </Button>
        <Button disabled={true}>
          ОЕНП
        </Button>
      </Box>
      <Button
        component={Link}
        to={shortcut ? `/schedule/${shortcut.department}/${shortcut.group}` : ''}
        disabled={!shortcut}
      >
        {!shortcut
          ? 'Найдите сердечко ❤'
          : shortcut.group}
      </Button>
    </Box>
  )
}

export default HomePage
