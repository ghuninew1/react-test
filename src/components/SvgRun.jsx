/* eslint-disable react/prop-types */
import {useState} from 'react'
import './SvgRun.css';

export default function SvgRun({sVal=50,sMax=100,sText="", sInput=false}) {
    const [vals,setVals] = useState(sVal)
    const updateVal =(e)=>{
        setVals(e.target.value)
      }
  return (
    <div>
    <DonutChart value={Number(sVal).toFixed(2)} vText={sText} vMax={sMax}/>
    <br/>
    {sInput && <input onChange={updateVal} type="number" min="0" max={sMax} value={vals} /> }
  </div>
  )
}
function DonutChart({value=Number, vText=String, vMax=Number}) {
    const vaL = {values:value, valuelabel:vText, size:100, strokewidth:15};

    const halfsize = (vaL.size * 0.5);
    const radius = halfsize - (vaL.strokewidth * 0.5);
    const circumference = 2 * Math.PI * radius;
    const strokeval = ((vaL.values * circumference) / vMax);
    const dashval = (strokeval + ' ' + circumference);

    const trackstyle = {strokeWidth: vaL.strokewidth};
    const indicatorstyle = {strokeWidth: vaL.strokewidth, strokeDasharray: dashval}
    const rotateval = 'rotate(-90 '+halfsize+','+halfsize+')';
  return (
      <>
      <svg width={vaL.size} height={vaL.size} className="donutchart">
        <circle r={radius} cx={halfsize} cy={halfsize} transform={rotateval} style={trackstyle} className="donutchart-track" />
        <circle r={radius} cx={halfsize} cy={halfsize} transform={rotateval} style={indicatorstyle} className="donutchart-indicator"/>
        <text className="donutchart-text" x={halfsize} y={halfsize} style={{textAnchor:'middle'}} >
          <tspan className="donutchart-text-val">{vaL.values}</tspan>
          <tspan className="donutchart-text-percent"></tspan>
          <tspan className="donutchart-text-label" x={halfsize} y={halfsize + 12}>{vaL.valuelabel}</tspan>
        </text>
      </svg>
      </>
  );
}