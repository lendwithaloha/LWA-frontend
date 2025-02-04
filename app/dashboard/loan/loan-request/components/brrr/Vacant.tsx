import { Typography } from '@mui/material'
import React from 'react'
import CommaSeparatedTextField from '../common/AmountField'

const Vacant = () => {
  return (
    <div>
        <Typography>What is current market rent for the property?</Typography>
        <CommaSeparatedTextField/>
    </div>
  )
}

export default Vacant