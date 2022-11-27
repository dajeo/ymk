import { Typography } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'

function Title ({ title }) {
  return (
    <Typography variant={'h4'}>
      {title}
    </Typography>
  )
}

Title.propTypes = {
  title: PropTypes.string
}

export default Title