import React from 'react'
import { Box, CircularProgress } from '@mui/material'
import { calcFullscreen } from '../utils'

function Progress () {
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      minHeight={calcFullscreen}
    >
      <CircularProgress />
    </Box>
  )
}

export default Progress
