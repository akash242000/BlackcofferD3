import * as d3 from "d3";
import React, { useEffect, useRef } from 'react'
import useMeasure from 'react-use-measure'
import './Intensity.css'
import LineChart from "../Charts/LineCharts/LineChart";
import BarChart from "../Charts/BarCharts/BarChart";
import { useSelector } from "react-redux";
import { getIntensity } from "../../store/slices/countrySlice";


export default function Intensity() {

    const data= useSelector(getIntensity)

  return (
    <div className="intensity-container">
      <h1>Average Intensity</h1>
      <BarChart data={data}/>
    </div>
  )
}
