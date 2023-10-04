import React from 'react'
import * as d3 from "d3";
import useMeasure from 'react-use-measure';
import './BarChart.css'

export default function BarChart({data}) {

    const [ref, bounds] = useMeasure();

    const dimensions={
      height:bounds.height,
      width:bounds.width
    }

    const margin={
      top:20,
      side:20,
      right:50,
      left:20,
      bottom:50
    }


    const xScale= d3
    .scaleBand()
    .domain(data.map((data,index)=>data.label))
    .range([margin.right,dimensions.width-margin.side])



    const yScale= d3
    .scaleLinear()
    .domain(d3.extent(data.map((data)=>data.value)))
    .range([dimensions.height-margin.top,margin.right])


  return (
    <div className='bar-chart-container'>
      <svg ref={ref} className='bar-chart-svg' viewBox={`-0 -0 ${dimensions.width} ${dimensions.height}`}>
      

        {data.map(({label, value}, index)=>{
            return  <rect 
                     fill='#7468ff'
                     key={label}
                     rx={5}
                     x={xScale(label)+margin.left}
                     y={yScale(value)-margin.top}
                     width={30} 
                     height={dimensions.height-yScale(value)} 
                      />
        })}

        
            {
                yScale.ticks(3).map((tick)=>{
                    return  <g key={tick} transform={`translate(${margin.left}, ${yScale(tick)-margin.top})`}>
                                <text alignmentBaseline="middle" key={tick} fontSize={'13px'}>{tick}</text>
                            </g>
                })
            }

            {
              data.map(({label})=>{
                return <g key={label} transform={`translate(${xScale(label)+margin.left+16},${dimensions.height-5})`}>
                          <text textAnchor='middle' fontSize={'12px'}>{label==="United States of America"?'USA':label===""?'Other':label.slice(0,1).toUpperCase()+label.slice(1)}</text>
                      </g>
              })
            }

            
            <line x1={0} x2={dimensions.width} transform={`translate(0 ${dimensions.height-margin.top-1})`} stroke='#f7f7f7' strokeWidth={'4px'}/>
        
      </svg>
    </div>
  )
}
