import Alert from '@mui/material/Alert'
import React from 'react'

const LockedAlert = () => {
  return (
    <div>
        <Alert severity="info" className="mb-6">
        Loan Application fields are locked. Changes to your loan cannot be made
        because your loan has been fully approved by Underwriting.
      </Alert>
    </div>
  )
}

export default LockedAlert