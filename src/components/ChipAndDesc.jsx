import { Chip, Tooltip } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'

function ChipAndDesc ({ label, description }) {
  return (
    <Tooltip title={description}>
      <Chip label={label} />
    </Tooltip>
  )
}

ChipAndDesc.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string
}

export default ChipAndDesc
