import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCountryTopicData } from '../../store/slices/countrySlice';
import PieChartTopicChild from '../PieChartsSource/PieChartTopicChild';
import '../Charts/PieChart/PieChart.css'

export default function PieChartTopics() {

    const [topic, setTopic] = useState('oil');
  
    const dispatch= useDispatch();

    useEffect(()=>{
        dispatch(getCountryTopicData(topic));
    },[topic])


  return (
    <div className='pie-chart-source'>
        <div className="pie-chart-header">
            <h1>Topic Wise Data</h1>
            <select className='select-box' onChange={(event)=>{setTopic(event.target.value)}}>
                <option value="oil">Oil</option>
                <option value="gas">Gas</option>
                <option value="economy">Economy</option>
                <option value="growth">Growth</option>
            </select>
        </div>

        <div className="pie-chart-pt">
            <PieChartTopicChild/>
        </div>
      
    </div>
  )
}