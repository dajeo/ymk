import React from 'react'
import { Container as ParentContainer } from '@mui/material'
import PropTypes from 'prop-types'

function Container ({ children }) {
  return (
    <ParentContainer disableGutters maxWidth={'xl'} sx={{ pl: '4px', pr: '4px', mb: '56px' }}>
      {children}
    </ParentContainer>
  )
}

Container.propTypes = {
  children: PropTypes.array
}

export default Container
