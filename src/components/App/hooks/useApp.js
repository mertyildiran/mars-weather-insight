import { useState, useEffect } from "react"
import axios from "axios"

import WarpSpeed from "../../../utils/warpAnimation"

function useApp(ref) {
  const [progress, setProgress] = useState(0)
  const [showContent, setShowContent] = useState(false)
  const [data, setData] = useState({})
  const [sols, setSols] = useState([])

  const imageSrc = (file) => file === "tesla" ?  `./images/${file}.png` : `./images/${file}.svg`        

  useEffect(() => {
    const apiUrl = `http://localhost:8081/rss/api?feed=weather&category=insight_temperature&feedtype=json&ver=1.0`
    const fetchData = async () => {
      try {
        const result = await axios(apiUrl)
        setData(result.data)
        setSols(result.data.sol_keys)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    let introSettings = {
      "speed": 2,
      "speedAdjFactor": 0.03,
      "density": 0.7,
      "shape": "circle",
      "warpEffect": true,
      "warpEffectLength": 5,
      "depthFade": true,
      "starSize": 3,
      "backgroundColor": "hsl(265, 100%, 10%)",
      "starColor": "#FFFFFF"
    }

    if (!showContent) {
      new WarpSpeed("intro-canvas", introSettings)
    } else {
      setTimeout(() => {
        new WarpSpeed("intro-canvas", introSettings).destroy()
      }, 1000)
    }
  }, [showContent])

  useEffect(() => {
    const id = setTimeout(() => {
      if (progress < 100) {
        setProgress(prev => prev + 1)
      } else {
        setShowContent(true)
      }
    }, 25)
    return () => progress === 100 && clearTimeout(id)
  }, [progress])

  return {
    data,
    sols,
    showContent,
    progress,
    imageSrc
  }
}

export default useApp
