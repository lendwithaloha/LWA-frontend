'use client'
import React, { ReactNode } from 'react'

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className=''>
      <div>
        {
          children
        }
      </div>
    </div>
  )
}

export default layout
