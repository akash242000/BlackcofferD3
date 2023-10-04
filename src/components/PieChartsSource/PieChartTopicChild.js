import React from 'react'
import { useSelector } from 'react-redux'
import { topicData } from '../../store/slices/countrySlice'
import PieChart from '../Charts/PieChart/PieChart'

export default function PieChartTopicChild() {

    const data = useSelector(topicData)
    console.log("Topic Component Changed!!")
  return (
    <div>
      <PieChart key={'1002'} data={data} />
    </div>
  )
}
