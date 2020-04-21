import {useState, useEffect} from "react"

import solData from "../../../hooks/useSolData"

function useOverview(data, sols) {
  
  const defaultUnits = {
    temp: "C",
    wind: "m/s",
    pres: "Pa"
  }

  const [apiData, setApiData] = useState([])
  const [units, setUnits] = useState(defaultUnits)
  // Units of measurement
  const [celsius, setCelsius] = useState(true)
  const [mps, setMps] = useState(true)
  const [pascal, setPascal] = useState(true)

  useEffect(() => {
    const latestSol = Math.max(...sols)
    const previousSols = sols.filter(sol => sol !== latestSol.toString())
    let remainderSols = []
    previousSols.forEach(item => remainderSols.push(solData(data, item)))
    setApiData(remainderSols)
  }, [data, sols])

  function roundedToOneDecimal(number) {
    return Math.round(number * 10) / 10
  }

  function handleTempChange() {
    let updatedData = []
    apiData.forEach(item => {
      if (celsius) {
        let updatedObj = {
          ...item,
          temp: {
            maxTemp: (item.temp.maxTemp * 1.8000) + 32.00,
            minTemp: (item.temp.minTemp * 1.8000) + 32.00,
            avgTemp: (item.temp.avgTemp * 1.8000) + 32.00
          }
        }
        updatedData.push(updatedObj)
        setUnits(prev => ({
          ...prev,
          temp: "F"
        }))
        setCelsius(false)
      } else {
        let updatedObj = {
          ...item,
          temp: {
            maxTemp: (item.temp.maxTemp - 32.00) / 1.8000,
            minTemp: (item.temp.minTemp - 32.00) / 1.8000,
            avgTemp: (item.temp.avgTemp - 32.00) / 1.8000
          }
        }
        updatedData.push(updatedObj)
        setUnits(prev => ({
          ...prev,
          temp: "C"
        }))
        setCelsius(true)
      }
    })
    setApiData(updatedData)
  }

  function handleWindChange() {
    let updatedData = []
    apiData.forEach(item => {
      if (mps) {
        let updatedObj = {
          ...item,
          wind: {
            ...item.wind,
            maxWind: item.wind.maxWind * 2.2369,
            minWind: item.wind.minWind * 2.2369,
            avgWind: item.wind.avgWind * 2.2369
          }
        }
        updatedData.push(updatedObj)
        setUnits(prev => ({
          ...prev,
          wind: "mph"
        }))
        setMps(false)
      } else {
        let updatedObj = {
          ...item,
          wind: {
            ...item.wind,
            maxWind: item.wind.maxWind / 2.2369,
            minWind: item.wind.minWind / 2.2369,
            avgWind: item.wind.avgWind / 2.2369
          }
        }
        updatedData.push(updatedObj)
        setUnits(prev => ({
          ...prev,
          wind: "m/s"
        }))
        setMps(true)
      }
    })
    setApiData(updatedData)
  }

  function handlePresChange() {
    let updatedData = []
    apiData.forEach(item => {
      if (pascal) {
        let updatedObj = {
          ...item,
          pres: {
            maxPres: item.pres.maxPres / 133,
            minPres: item.pres.minPres / 133,
            avgPres: item.pres.avgPres / 133
          }
        }
        updatedData.push(updatedObj)
        setUnits(prev => ({
          ...prev,
          pres: "mmHg"
        }))
        setPascal(false)
      } else {
        let updatedObj = {
          ...item,
          pres: {
            maxPres: item.pres.maxPres * 133,
            minPres: item.pres.minPres * 133,
            avgPres: item.pres.avgPres * 133
          }
        }
        updatedData.push(updatedObj)
        setUnits(prev => ({
          ...prev,
          pres: "Pa"
        }))
        setPascal(true)
      }
    })
    setApiData(updatedData)
  }

  return {
    apiData,
    units,
    handleTempChange,
    handleWindChange,
    handlePresChange,
    roundedToOneDecimal
  }
}

export default useOverview
