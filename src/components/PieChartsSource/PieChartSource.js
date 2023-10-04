import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';
import { getCountrySectorData } from '../../store/slices/countrySlice';
import PieChartSectorChild from '../PieChartTopics/PieChartSectorChild';
import '../Charts/PieChart/PieChart.css'

export default function PieChartSource() {

    const [sector, setSector] = useState('Retail');

    const dispatch= useDispatch();

    useEffect(()=>{
        dispatch(getCountrySectorData(sector));
    },[sector])


  return (
    <div className='pie-chart-source'>
        <div className="pie-chart-header">
            <h1>Sector Wise Data</h1>
            <select className='select-box' onChange={(event)=>{setSector(event.target.value)}}>
                <option value="Retail">Retail</option>
                <option value="Energy">Energy</option>
                <option value="Government">Government</option>
                <option value="Manufacturing">Manufacturing</option>
            </select>
        </div>

        <div className="pie-chart-pt">
            <PieChartSectorChild/>
        </div>
      
      
    </div>
  )
}
