import React from 'react'
import PieChart from '../Charts/PieChart/PieChart'
import { sectorData } from '../../store/slices/countrySlice'
import { useSelector } from 'react-redux'

export default function PieChartSectorChild() {
  
  const data= useSelector(sectorData)
  console.log("Sector Component Changed!!")
  console.log("Sector")
  return (
    <div>
      <PieChart key={'1001'} data={data} colorSchemeB />
    </div>
  )
}
