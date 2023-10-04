import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getAllYearData } from '../../store/slices/countrySlice';
import BarChart from '../Charts/BarCharts/BarChart';
import './YearData.css'

export default function YearData() {

    const [currentSort, setSort]= useState('sector');
    const [currentYear, setCurrentYear]= useState(0);
    const [loading, setLoading] = useState(true);
    const data= useSelector(getAllYearData);

    const [filteredData, setFilteredData]= useState({})

    useEffect(()=>{
        setLoading(true)
        const filterData= data[currentYear][currentSort];
        const filterDataObjects= Object.keys(filterData).map((key)=>{
            return {label:key, value:filterData[key]}
        })
        setFilteredData(filterDataObjects)
        setLoading(false)
    },[currentSort,currentYear])

    

  return (
    <div className='year-sort-container-main'>
        <div className="year-sort-header">
            <h1>Year Wise Data</h1>
            <div className="year-sort-box">
                <select className='select-box' onChange={(event)=>setSort(event.target.value)}>
                    <option value={'sector'}>Sector</option>
                    <option value={'topic'}>Topic</option>
                    <option value={'country'}>Country</option>
                    <option value={'pestle'}>Pestle</option>
                </select>

                <select className='select-box' onChange={(event)=>setCurrentYear(event.target.value)}>
                    {
                        data.map(({endyear},index)=>{
                            return <option value={index}>{endyear}</option>
                        })
                    }

                </select>
            </div>
        </div>
        {true?
            <div className="year-sort-chart-container">
                { !loading?<BarChart data={filteredData} />:<>Loading...</>}
            </div>

            :

            <div className="loading-box">
                Loading
            </div>
        }   
    </div>
  )
}
