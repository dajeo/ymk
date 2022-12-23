import React from 'react'
import { Container as MuiContainer } from '@mui/material'
import PropTypes from 'prop-types'

function Container ({ children }) {
  return (
    <MuiContainer disableGutters maxWidth={'xl'} sx={{ pl: '4px', pr: '4px', mb: '56px' }}>
      {children}
    </MuiContainer>
  )
}

Container.propTypes = {
  children: PropTypes.array
}

export default Container
