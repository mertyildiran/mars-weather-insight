import React, { useRef } from "react"

import "./Graphs.scss"
import useGraphs from "./hooks/useGraphs"

function Graphs({data, sols, message}) {
  const svgRef = useRef(null)
  const wrapperRef = useRef(null)

  useGraphs(sols, data, wrapperRef, svgRef)

  return (
    <div className="graphs">
      {message !== "" ? <p className="api-update-message">{message}</p> :
        <>
          <h1>Average temperatures for last 7 Sols (°C)</h1>
          <div ref={wrapperRef} className="graph-wrapper">
            <svg ref={svgRef}>
              <g className="axis x-axis" />
              <g className="axis y-axis" />
            </svg>
          </div>
        </>
      }
    </div>
  )
}

export default Graphs
