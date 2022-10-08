import React from 'react'
import { Tooltip, Typography } from '@mui/material'

function Footer () {
  return (
    <Tooltip title={'Developed by Danil'}>
      <Typography
        color={'text.secondary'}
        sx={{ textAlign: 'center', marginBottom: 1 }}
      >
        © {new Date().getFullYear()} {window.location.hostname}
      </Typography>
    </Tooltip>
  )
}

export default Footer
