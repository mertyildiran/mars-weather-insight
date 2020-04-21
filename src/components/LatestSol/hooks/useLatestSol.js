import { useState } from "react"

function useLatestSol(data) {
  
  const defaultUnits = {
    temp: "C",
    wind: "m/s",
    pres: "Pa"
  }

  const [apiData, setApiData] = useState(data)
  const [units, setUnits] = useState(defaultUnits)
  // Units of measurement
  const [celsius, setCelsius] = useState(true)
  const [mps, setMps] = useState(true)
  const [pascal, setPascal] = useState(true)
  
  function handleTempChange() {
    if (celsius) {
      setApiData(prev => ({
        ...prev,
        temp: {
          maxTemp: apiData.temp.maxTemp * 1.8000 + 32.00,
          minTemp: apiData.temp.minTemp * 1.8000 + 32.00,
          avgTemp: apiData.temp.avgTemp * 1.8000 + 32.00
        }
      }))
      setUnits(prev => ({
        ...prev,
        temp: "F"
      }))
      setCelsius(false)
    } else {
      setApiData(prev => ({
        ...prev,
        temp: {
          maxTemp: (apiData.temp.maxTemp - 32.00) / 1.8000,
          minTemp: (apiData.temp.minTemp - 32.00) / 1.8000,
          avgTemp: (apiData.temp.avgTemp - 32.00) / 1.8000
        }
      }))
      setUnits(prev => ({
        ...prev,
        temp: "C"
      }))
      setCelsius(true)
    }
  }

  function handleWindChange() {
    if (mps) {
      setApiData(prev => ({
        ...prev,
        wind: {
          ...prev.wind,
          maxWind: apiData.wind.maxWind * 2.2369,
          minWind: apiData.wind.minWind * 2.2369,
          avgWind: apiData.wind.avgWind * 2.2369
        }
      }))
      setUnits(prev => ({
        ...prev,
        wind: "mph"
      }))
      setMps(false)
    } else {
      setApiData(prev => ({
        ...prev,
        wind: {
          ...prev.wind,
          maxWind: apiData.wind.maxWind / 2.2369,
          minWind: apiData.wind.minWind / 2.2369,
          avgWind: apiData.wind.avgWind / 2.2369
        }
      }))
      setUnits(prev => ({
        ...prev,
        wind: "m/s"
      }))
      setMps(true)
    }
  }

  function handlePresChange() {
    if (pascal) {
      setApiData(prev => ({
        ...prev,
        pres: {
          maxPres: apiData.pres.maxPres / 133,
          minPres: apiData.pres.minPres / 133,
          avgPres: apiData.pres.avgPres / 133
        }
      }))
      setUnits(prev => ({
        ...prev,
        pres: "mmHg"
      }))
      setPascal(false)
    } else {
      setApiData(prev => ({
        ...prev,
        pres: {
          maxPres: apiData.pres.maxPres * 133,
          minPres: apiData.pres.minPres * 133,
          avgPres: apiData.pres.avgPres * 133
        }
      }))
      setUnits(prev => ({
        ...prev,
        pres: "Pas"
      }))
      setPascal(true)
    }
  }

  return {
    apiData,
    units,
    handleTempChange,
    handleWindChange,
    handlePresChange
  }
}

export default useLatestSol
