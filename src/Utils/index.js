import React from 'react'
import numeral from 'numeral'
import { Circle,Popup } from 'react-leaflet'
import './utils.css'
export const sortTable= (sortedData)=>{
    
    return sortedData.sort((a, b) => a.cases > b.cases? -1:1 );  
  }

  export const resolvePrint = (stat) =>{
    if(stat)
      return `+${numeral(stat).format("0.0a")}`
      else
      return "+0"
  }

const casesColors = {
  cases: {
    hex: "#CC1034",
    rgb: "rgb(204, 16, 52)",
    half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "rgb(125, 215, 29)",
    half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    rgb: "rgb(251, 68, 67)",
    half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 2000,
  },
};

  export const MapData = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={casesColors[casesType].hex}
      fillColor={casesColors[casesType].hex}
      fillOpacity={0.4}
      radius={
        Math.sqrt(country[casesType]) * casesColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="popup-container">
        <div className = "popup-left">
        <div
        className="popup-flag"
        style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
      ></div>
        </div>

        <div className = "popup-right">
        <div className="popup-name">{country.country}</div>
        <div className="popup-confirmed">
          Cases: {numeral(country.cases).format("0,0")}
        </div>
        <div className="popup-recovered">
          Recovered: {numeral(country.recovered).format("0,0")}
        </div>
        <div className="popup-deaths">
          Deaths: {numeral(country.deaths).format("0,0")}
        </div>
      </div>
        </div>
        
         
      </Popup>
    </Circle>
  ));