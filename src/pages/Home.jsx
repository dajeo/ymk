import React from 'react'
import { Box, Typography } from '@mui/material'

function HomePage () {
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      sx={{ height: 'calc(100vh - 56px)' }}
    >
      <Typography
        sx={{
          fontWeight: 'bold',
          fontSize: '16vw'
        }}
      >YMK</Typography>
    </Box>
  )
}

export default HomePage
