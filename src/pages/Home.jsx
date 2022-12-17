import React from 'react'
import { Box, Typography } from '@mui/material'

function HomePage () {
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      flexDirection={'column'}
      sx={{ height: 'calc(100vh - 56px)' }}
    >
      <Typography variant={'h1'} sx={{ fontWeight: 'bold' }}>
        YMK
      </Typography>
      <Typography variant={'body2'}>
        Developed by Danil
      </Typography>
    </Box>
  )
}

export default HomePage
