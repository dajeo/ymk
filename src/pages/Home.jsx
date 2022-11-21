import React, { useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
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
        {!shortcut
          ? null
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
