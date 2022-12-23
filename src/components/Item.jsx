import React from 'react'
import PropTypes from 'prop-types'

function Item ({ children }) {
  return (
    <span style={{ display: 'list-item', listStylePosition: 'inside' }}>
        {children}
    </span>
  )
}

Item.propTypes = {
  children: PropTypes.string
}

export default Item
