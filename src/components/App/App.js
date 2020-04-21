import React, { useRef } from "react"
import { Progress, Icon } from "semantic-ui-react"
import { Parallax, ParallaxLayer } from "react-spring/renderprops-addons"

import "./App.scss"
import useApp from "./hooks/useApp"
import solData from "../../hooks/useSolData"
import LatestSol from "../LatestSol"
import Overview from "../Overview"
import Graphs from "../Graphs"

function App() {
  const parallax = useRef(null)
  const { data, sols, showContent, progress, imageSrc } = useApp(parallax)

  return (
    <div className="app"> 

      <div className="intro">
        <canvas id="intro-canvas"></canvas>
        <div className="progress-bar">
          <div className="progress-wrap">
            <Progress percent={progress} inverted color="violet" />
          </div>
        </div>
      </div>

      {showContent &&
        <div className="content" style={{backgroundImage: `url(${imageSrc("bg")})`}}>
          <div className="scroll-prompt" onClick={() => parallax.current.scrollTo(1)}>
            <Icon name="long arrow alternate left" />
            &nbsp;Scroll horizontally to navigate&nbsp;
            <Icon name="long arrow alternate right" />
          </div>
          <Parallax horizontal ref={parallax} pages={3} className="parallax-inner">
            <ParallaxLayer offset={0} speed={0.4}>
              <img src={imageSrc("stars")} className="stars" alt="" />
            </ParallaxLayer>

            <ParallaxLayer offset={1} speed={0.4}>
              <img src={imageSrc("stars")} className="stars" alt="" />
              <img src={imageSrc("stars")} className="stars-middle" alt="" />
            </ParallaxLayer>

            <ParallaxLayer offset={2} speed={0.4}>
              <img src={imageSrc("stars")} className="stars" alt="" />
              <img src={imageSrc("stars")} className="stars-middle" alt="" />
            </ParallaxLayer>

            <ParallaxLayer offset={0} speed={-0.3}>
              <img src={imageSrc("planet_1")} className="prop-1" alt="" />
            </ParallaxLayer>

            <ParallaxLayer offset={2} speed={-0.1}>
              <img src={imageSrc("tesla")} className="prop-2" alt="" />
            </ParallaxLayer>

            <ParallaxLayer offset={1} speed={-0.3}>
              <img src={imageSrc("satellite")} className="prop-3" alt="" />
            </ParallaxLayer>

            <ParallaxLayer offset={2} speed={-0.3}>
              <img src={imageSrc("planet_2")} className="prop-4" alt="" />
            </ParallaxLayer>

            <ParallaxLayer offset={0} speed={0.1} className="content-block">
              <LatestSol data={solData(data, Math.max(...sols))} message={solData(data, Math.max(...sols)).message} />
            </ParallaxLayer>

            <ParallaxLayer offset={1} speed={0.1} className="content-block">
              <Overview data={data} sols={sols} message={solData(data, Math.max(...sols)).message} />
            </ParallaxLayer>

            <ParallaxLayer offset={2} speed={0.1} className="content-block">
              <Graphs data={data} sols={sols} message={solData(data, Math.max(...sols)).message} />
            </ParallaxLayer>
          </Parallax>
        </div>
      }

    </div>
  )
}

export default App