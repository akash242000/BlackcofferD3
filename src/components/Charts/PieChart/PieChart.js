import React, { useEffect, useState } from 'react'
import * as d3 from "d3";
import useMeasure from 'react-use-measure';
import './PieChart.css'

export default function PieChart({data,colorSchemeB}) {


    const [ref, bounds] = useMeasure();

    const dimensions={
      height:bounds.height,
      width:bounds.width
    }

    const margin={
        top:20,
        side:50,
        high:50
      }

    const radius = Math.min(dimensions.height, dimensions.width)/2-margin.high

    const color= d3.scaleOrdinal()
                    .domain(data)
                    .range(d3.schemeSet2)

    
    const colorScale = d3.scaleSequential()
                         .interpolator(colorSchemeB?d3.interpolatePlasma:d3.interpolateCool)
                         .domain([0,data.length])


    const pieGenerator =d3.pie().value((d)=>d.frequency);
    const pie = pieGenerator(data);


    const arcPathGenerator = d3
        .arc()
        .innerRadius(0)
        .outerRadius(radius)

    const arcs = pie.map((p)=>
        arcPathGenerator({
            startAngle:p.startAngle,
            endAngle:p.endAngle
        })
    );

    const sliceInfo= pie.map((p,i)=>{
        return {
            innerRadius:0,
            outerRadius:radius,
            startAngle:p.startAngle,
            endAngle:p.endAngle
        }
    })
    


  return (
    <div className='pie-chart-container' ref={ref}>

      <svg viewBox={`0 0 ${dimensions.width} ${dimensions.height}`} >
            <g transform={`translate(${dimensions.width / 2}, ${dimensions.height / 2})`}>
                {  
                    arcs.map((arc,i)=>{
                        const[x,y]=arcPathGenerator.centroid(sliceInfo[i]);
                        return (
                            <g key={i}>
                            <path fill={colorScale(i)} d={arc} />
                            {
                                data[i].frequency>0 && 
                                                        <text 
                                                            textAnchor='middle' 
                                                            alignmentBaseline='middle' 
                                                            key={i} fill='white' 
                                                            transform={`translate(${x} ${y})`} 
                                                            fontSize={"13px"}
                                                            fontWeight={'600'} >
                                                                {data[i].country==='United States of America'?"USA":data[i].country}
                                                        </text>
                            }
                            </g>
                        )

                    })
                }
            </g>


      </svg>
    </div>
  )
}
