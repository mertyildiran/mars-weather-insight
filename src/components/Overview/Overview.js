import React from "react"
import { Table, Checkbox } from "semantic-ui-react"

import "./Overview.scss"
import useOverview from "./hooks/useOverview"

function Overview({data, sols, message}) {

  const {
    apiData,
    units,
    handleTempChange,
    handleWindChange,
    handlePresChange,
    roundedToOneDecimal
  } = useOverview(data, sols)
 
  return (
    <div className="overview">
      {message !== "" ? <p className="api-update-message">{message}</p> :
        <Table basic="very" striped celled collapsing inverted selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="2">Time</Table.HeaderCell>
              <Table.HeaderCell colSpan="3">
                <p>Temperature</p>
                <div className="checkbox-label">°C</div>
                <Checkbox slider onChange={() => handleTempChange()} />
                <div className="checkbox-label">°F</div>
              </Table.HeaderCell>
              <Table.HeaderCell colSpan="4">
                <p>Wind Speed</p>
                <div className="checkbox-label">m/s</div>
                <Checkbox slider onChange={() => handleWindChange()} />
                <div className="checkbox-label">mph</div>
              </Table.HeaderCell>
              <Table.HeaderCell colSpan="3">
                <p>Pressure</p>
                <div className="checkbox-label">Pa</div>
                <Checkbox slider onChange={() => handlePresChange()} />
                <div className="checkbox-label">mmHg</div>
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Sol</Table.HeaderCell>
              <Table.HeaderCell>Min</Table.HeaderCell>
              <Table.HeaderCell>Avg</Table.HeaderCell>
              <Table.HeaderCell>Max</Table.HeaderCell>
              <Table.HeaderCell>Min</Table.HeaderCell>
              <Table.HeaderCell>Avg</Table.HeaderCell>
              <Table.HeaderCell>Max</Table.HeaderCell>
              <Table.HeaderCell>Direction<br/><span className="small">(most common)</span></Table.HeaderCell>
              <Table.HeaderCell>Min</Table.HeaderCell>
              <Table.HeaderCell>Avg</Table.HeaderCell>
              <Table.HeaderCell>Max</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {apiData.slice(0).reverse().map(({sol, earthDate, temp, wind, pres}) =>
              <Table.Row key={sol}>
                <Table.Cell>
                  {earthDate}
                </Table.Cell>
                <Table.Cell>
                  {sol}
                </Table.Cell>
                <Table.Cell>
                  {roundedToOneDecimal(temp.minTemp)}° {units.temp}
                </Table.Cell>
                <Table.Cell>
                  {roundedToOneDecimal(temp.avgTemp)}° {units.temp}
                </Table.Cell>
                <Table.Cell>
                  {roundedToOneDecimal(temp.maxTemp)}° {units.temp}
                </Table.Cell>
                <Table.Cell>
                  {roundedToOneDecimal(wind.minWind)} {units.wind}
                </Table.Cell>
                <Table.Cell>
                  {roundedToOneDecimal(wind.avgWind)} {units.wind}
                </Table.Cell>
                <Table.Cell>
                  {roundedToOneDecimal(wind.maxWind)} {units.wind}
                </Table.Cell>
                <Table.Cell>
                  {wind.dirWind}
                </Table.Cell>
                <Table.Cell>
                  {roundedToOneDecimal(pres.minPres)} {units.pres}
                </Table.Cell>
                <Table.Cell>
                  {roundedToOneDecimal(pres.avgPres)} {units.pres}
                </Table.Cell>
                <Table.Cell>
                  {roundedToOneDecimal(pres.maxPres)} {units.pres}
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      }
    </div>
  )
}

export default Overview