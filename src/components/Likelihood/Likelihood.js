import React from 'react'
import LineChart from '../Charts/LineCharts/LineChart'
import { useSelector } from 'react-redux'
import { getLikelihood } from '../../store/slices/countrySlice'
import './Likelihood.css'

export default function Likelihood() {

    const data = useSelector(getLikelihood)
  return (
    <div className='chart-container-min'>
        <h1>Average Likelihood</h1>
        <LineChart data={data} />
    </div>
  )
}
