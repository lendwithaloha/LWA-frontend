'use client'
import DeclarationsForm from '@/components/dashboard/profile/Declaration'
import { RootState } from '@/store/store'
import React from 'react'
import { useSelector } from 'react-redux'



function Page() {
  const { formData } = useSelector((state: RootState) => state.profile);

  return <DeclarationsForm formData={formData} />
}

export default Page