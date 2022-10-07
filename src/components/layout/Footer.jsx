import React from 'react'
import { Typography } from '@mui/material'

function Footer () {
  return (
    <Typography
      color={'text.secondary'}
      sx={{ textAlign: 'center', marginBottom: 1 }}
    >
      © {new Date().getFullYear()} {window.location.hostname}
    </Typography>
  )
}

export default Footer
