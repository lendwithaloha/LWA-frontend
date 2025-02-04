
import React from 'react'
import { ScheduleTable } from '@/components/dashboard/realEstateSchedule/RealEstateTable';



function page() {
  const scheduleRows = [
    {
      id: 1,
      propertyAddress: "123 Main St, NY",
      city: "New York", // New field
      state: "NY", // New field
      zipCode: "10001", // New field
      propertyType: "Condo", // New field
      vesting: "Joint Tenancy",
      percentageOwned: "50%",
      investmentStrategy: "Buy & Hold", // New field
      acquisitionDate: "2020-05-01",
      purchasePrice: "$500,000",
      acquisitionPrice: "$500,000", // Same as purchasePrice
      currentAsIsValue: "$550,000",
      budgetCompleted: "Yes", // New field
      currentMarketValue: "$600,000", // New field
      loanBalance: "$200,000", // New field
      marketRents: "$2,500/month",
      rentalIncome: "$2,500/month", // Same as marketRents
      status: "Active", // New field
      contractPrice: "$600,000", // New field
      coe: "2020-06-01", // New field
    },
    {
      id: 2,
      propertyAddress: "456 Elm St, CA",
      city: "Los Angeles", // New field
      state: "CA", // New field
      zipCode: "90001", // New field
      propertyType: "Single Family", // New field
      vesting: "Tenancy in Common",
      percentageOwned: "30%",
      investmentStrategy: "Fix & Flip", // New field
      acquisitionDate: "2019-08-15",
      purchasePrice: "$750,000",
      acquisitionPrice: "$750,000", // Same as purchasePrice
      currentAsIsValue: "$800,000",
      budgetCompleted: "No", // New field
      currentMarketValue: "$850,000", // New field
      loanBalance: "$300,000", // New field
      marketRents: "$3,000/month",
      rentalIncome: "$3,000/month", // Same as marketRents
      status: "Closed", // New field
      contractPrice: "$850,000", // New field
      coe: "2019-09-15", // New field
    }
  ];

  return (
    <ScheduleTable scheduleRows={scheduleRows} />
  )
}

export default page