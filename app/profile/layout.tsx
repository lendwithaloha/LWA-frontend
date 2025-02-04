'use client'
import Navbar from '@/components/dashboard/NavBar'
import React, { ReactNode } from 'react'

const layout = ({children}:{children:ReactNode}) => {
  return (
    <div>
      <Navbar />
      {
        children
      }
    </div>
  )
}

export default layout
