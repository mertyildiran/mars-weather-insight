import React from "react"
import { Grid, Divider, Checkbox } from "semantic-ui-react"

import "./LatestSol.scss"
import { tempIcon, windIcon, presIcon } from "../../utils/svgIcons"
import useLatestSol from "./hooks/useLatestSol"

function LatestSol({data, message}) { 
  const { apiData, units, handleTempChange, handleWindChange, handlePresChange } = useLatestSol(data)
  const { sol, earthDate, temp, pres, wind } = apiData

  return (
    <div className="sol">
      {message !== "" ? <p className="api-update-message">{message}</p> :
        <>
          <Grid columns={2} divided inverted padded className="summary">
            <Grid.Row>
              <Grid.Column>
                <h1>Sol {sol}</h1>
                <h3>{earthDate}</h3>
              </Grid.Column>
              <Grid.Column>
                <p><span className="label">Temperature (avg):</span> {Math.round(temp.avgTemp)}° {units.temp}</p>
                <p><span className="label">Wind speed (avg):</span> {Math.round(wind.avgWind)} {units.wind}</p>
                <p><span className="label">Wind direction (most common):</span> {wind.dirWind}</p>
                <p><span className="label">Atmospheric pressure (avg):</span> {Math.round(pres.avgPres)} {units.pres}</p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Divider />
          <Grid columns={3} divided inverted padded>
            <Grid.Row>
              <Grid.Column>
                <div className="icon">{tempIcon}</div>
                <p><span className="label">High:</span> {Math.round(temp.maxTemp)}° {units.temp}</p>
                <p><span className="label">Low:</span> {Math.round(temp.minTemp)}° {units.temp}</p>
              </Grid.Column>
              <Grid.Column>
              <div className="icon">{windIcon}</div>
                <p><span className="label">High:</span> {Math.round(wind.maxWind)} {units.wind}</p>
                <p><span className="label">Low:</span> {Math.round(wind.minWind)} {units.wind}</p>
              </Grid.Column>
              <Grid.Column>
                <div className="icon">{presIcon}</div>
                <p><span className="label">High:</span> {Math.round(pres.maxPres)} {units.pres}</p>
                <p><span className="label">Low:</span> {Math.round(pres.minPres)} {units.pres}</p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Divider />
          <div className="widget-footer">
            <Grid columns={3} divided inverted padded>
              <Grid.Row>
                <Grid.Column>
                  <div className="checkbox-label">°C</div>
                  <Checkbox slider onChange={() => handleTempChange()} />
                  <div className="checkbox-label">°F</div>
                </Grid.Column>
                <Grid.Column>
                  <div className="checkbox-label">m/s</div>
                  <Checkbox slider onChange={() => handleWindChange()} />
                  <div className="checkbox-label">mph</div>
                </Grid.Column>
                <Grid.Column>
                  <div className="checkbox-label">Pa</div>
                  <Checkbox slider onChange={() => handlePresChange()} />
                  <div className="checkbox-label">mmHg</div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider />
            <p className="small">InSight is taking daily weather measurements (temperature, wind, pressure) on the surface of Mars at Elysium Planitia, a flat, smooth plain near Mars’ equator.</p>
          </div>
        </>
      }
    </div>
  )
}

export default LatestSol
