import { useState, useEffect } from 'react'
import { select, line, curveCardinal, axisBottom, axisLeft, scaleLinear } from "d3"

import solData from "../../../hooks/useSolData"
import useResizeObserver from "../../../hooks/useResizeObserver"

function useGraphs(sols, data, wrapperRef, svgRef) {
  const [graphData, setGraphData] = useState([])
  const dimensions = useResizeObserver(wrapperRef)

  useEffect(() => {
    let remainderSols = []
    sols.forEach(item => remainderSols.push(solData(data, item)))
    
    let avgTemperatures = []
    remainderSols.forEach(item => {
      avgTemperatures.push(item.temp.avgTemp)
    })
    
    setGraphData(avgTemperatures)
  }, [data, sols])
  
  useEffect(() => {
    const svg = select(svgRef.current)

    if (!dimensions) return

    // Scales
    const xScale = scaleLinear()
      .domain([0, graphData.length - 1])
      .range([0, dimensions.width])
    
    const yScale = scaleLinear()
      .domain([Math.min(...graphData)-1, Math.max(...graphData)+1])
      .range([dimensions.height, 0])

    // X axis
    const xAxis = axisBottom(xScale)
      .ticks(graphData.length)
      .tickFormat(index => sols[index])

    svg
      .select(".x-axis")
      .style("transform", `translateY(${dimensions.height}px)`)
      .call(xAxis)

    // Y axis
    const yAxis = axisLeft(yScale)
      .ticks(graphData.length)
      .tickFormat(value => value)

    svg
      .select(".y-axis")
      .style("transform", "translateX(0px)")
      .call(yAxis)

    // Line
    const myLine = line()
      .x((value,index) => xScale(index))
      .y(value => yScale(value))
      .curve(curveCardinal)
    
    svg
      .selectAll(".line")
      .data([graphData])
      .join("path")
      .attr("class", "line")
      .attr("d", value => myLine(value))
      .attr("fill", "none")
      .attr("stroke", "whitesmoke")
      .attr("height", value => dimensions.height)
  }, [graphData, sols, dimensions, svgRef])

}

export default useGraphs
