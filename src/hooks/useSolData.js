import { dateFormatter } from "../utils/dateFormatter"

function solData(data, sol) {
  if (data) {
    return {
      sol,
      earthDate: dateFormatter(data[sol].First_UTC),
      temp: {
        minTemp: data[sol].AT.mn,
        maxTemp: data[sol].AT.mx,
        avgTemp: data[sol].AT.av // temperature in Celsius
      },
      pres: {
        minPres: data[sol].PRE.mn,
        maxPres: data[sol].PRE.mx,
        avgPres: data[sol].PRE.av // pressure in Pascal
      },
      wind: {
        minWind: data[sol].HWS.mn,
        maxWind: data[sol].HWS.mx,
        avgWind: data[sol].HWS.av, // wind swpeed in meters/second
        dirWind: data[sol].WD.most_common.compass_point // most common
      },
      message: ""
    }
  } else {
    return {
      message: "The InSight API data is being updated with the latest data. Please try again in a few minutes."
    }
  }
}

export default solData