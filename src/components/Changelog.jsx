import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import PropTypes from 'prop-types'

function Changelog ({ v, children }) {
  return (
    <Card variant="outlined" sx={{ maxWidth: 600, mb: '8px' }}>
      <CardContent sx={{ '&:last-child': { pb: '16px' } }}>
        <Typography variant="h5" component="div">
          Version {v}
        </Typography>
        <Typography variant="body2">
          {children}
        </Typography>
      </CardContent>
    </Card>
  )
}

Changelog.propTypes = {
  v: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
}

export default Changelog