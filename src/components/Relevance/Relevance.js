import React from 'react'
import { useSelector } from 'react-redux'
import { getRelevance } from '../../store/slices/countrySlice'
import BarChart from '../Charts/BarCharts/BarChart'

export default function Relevance() {

    const data = useSelector(getRelevance);

  return (
    <div className="intensity-container">
      <h1>Average Relevance</h1>
      <BarChart data={data}/>
    </div>
  )
}
