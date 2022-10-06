import React from 'react'
import { Typography } from '@mui/material'

function Footer () {
  return (
    <Typography sx={{ textAlign: 'center', marginBottom: 1, opacity: '1' }} color={'text.secondary'}>
      © {new Date().getFullYear()} ymk.krabi.space
    </Typography>
  )
}

export default Footer
