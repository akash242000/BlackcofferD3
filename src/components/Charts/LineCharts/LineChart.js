import React from 'react'
import * as d3 from "d3";
import useMeasure from 'react-use-measure';
import './LineChart.css'


export default function LineChart({data}) {
    const [ref, bounds] = useMeasure();

    const dimensions={
      height:bounds.height,
      width:bounds.width
    }


    const margin={
      top:dimensions.width<500?10:20,
      side:dimensions.width<500?20:50,
      high:dimensions.width<500?20:50
    }


    const xScale= d3
      .scaleLinear()
      .domain(d3.extent(data.map((data,index)=>index)))
      .range([margin.side,dimensions.width-margin.side])

      const xScaleband =d3
            .scaleBand()
            .domain(data.map(d=>d.label))
            .range([margin.side,dimensions.width-margin.side])


      const svg= d3.select('#line-chart-svg');
      
      
      const yScale= d3
      .scaleLinear()
      .domain(d3.extent(data.map((data)=>data.value)))
      .range([dimensions.height-margin.high,margin.high])
      
      // svg.append('g')
      //     .attr("transform", `translate(${margin.side+50}, ${0})`)
      //     .call(d3.axisLeft(yScale))
      

      const yMin = d3.min(data,(d)=> d.value);
      

      const chartLine = d3.line()
        .x((d,i)=>xScale(i))
        .y((d)=>yScale(d.value))
        .curve(d3.curveMonotoneX)(data)

      const chartArea = d3.area()
        .x((d,i)=>xScale(i))
        .y0((d)=>yScale(d.value))
        .y1(()=>yScale(yMin-0.3))
        .curve(d3.curveMonotoneX)(data)




  return (
    <div className='line-chart-container'>
        <svg ref={ref} id='line-chart-svg' viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}> 

            <path d={chartLine} fill='none' stroke='blue' strokeWidth={'5px'} />
            <path d={chartArea} id='area-fill-chart' stroke='none' />

            {
              yScale.ticks(dimensions.width<500?3:5).map((tick)=>{
                return <g key={tick} transform={`translate(${margin.top-10}, ${yScale(tick)})`}> 

                  <line
                    x1={20}
                    x2={dimensions.width-margin.side}
                    stroke='black'
                    strokeDasharray={[5,10]}
                    strokeOpacity={0.3}
                    strokeWidth={0.8}
                    />

                    <text alignmentBaseline='middle' fontSize={'10px'} key={tick}>
                      {tick}
                    </text>  
                </g>
              })
            }

            <g id='y-axis'>

            </g>

            {
              xScale.ticks(dimensions.width<500?4:5).map((tick)=>{
                return <g key={tick} transform={`translate(${xScale(tick)-12}, ${dimensions.height-margin.top+8})`}>
                          <text alignmentBaseline='middle' textAnchor='start' fontSize={'12px'} key={tick}>
                            {data[tick].label==="United States of America"?'USA':data[tick].label===""?'Other':data[tick].label}
                          </text>  
                      </g>
              })
            }



      <defs>
        <linearGradient id="MyGradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="10%" stop-color="#61a9ff" />
          <stop offset="90%" stop-color="#ffffff" />
        </linearGradient>
      </defs>


        </svg>
    </div>
  )
}
