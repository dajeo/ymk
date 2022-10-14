import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { calcFullscreen } from '../utils'
import { Link } from 'react-router-dom'

function HomePage () {
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
        <Button
          component={Link}
          to={'/groups/otp'}
        >
          ОТП
        </Button>
        <Button disabled={true}>
          ОСГП
        </Button>
        <Button disabled={true}>
          ОЕНП
        </Button>
      </Box>
    </Box>
  )
}

export default HomePage
