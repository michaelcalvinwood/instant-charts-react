import './Options.scss';
import React from 'react';
import * as lodash from 'lodash';

function Options({config, setConfig}) {
  console.log("Options", config);

  const handleTitle = e => {
    const configCopy = lodash.cloneDeep(config);
    if (typeof configCopy.title === 'undefined') {
      configCopy.title = {
        text: e.target.value
      }
    } else {
      configCopy.title.text = e.target.value;
    }
    setConfig(configCopy);
  }

  const handleSubtitle = e => {
    const configCopy = lodash.cloneDeep(config);
    if (typeof configCopy.title === 'undefined') {
      configCopy.title = {
        subtext: e.target.value
      }
    } else {
      configCopy.title.subtext = e.target.value;
    }
    setConfig(configCopy);
  }

  const handleLegend = e => {

  }

  

  return (
    <div className='options'>
      <h2 className="options--heading">Options</h2>
      
      <div className='options--chart-label'>Title:</div>
      <input 
        type="text" 
        name="chartTitle" 
        id="chartTitle" 
        className="options--chart-title" 
        value={config.title && config.title.text ? config.title.text : ''} 
        onChange={handleTitle}/>
      <br />
    
      <div className='options--chart-label'>Subtitle:</div>
      <input 
        type="text" 
        name="chartSubtitle" 
        id="chartSubtitle" 
        className="options--chart-subtitle" 
        value={config.title && config.title.subtext ? config.title.subtext : ''} 
        onChange={handleSubtitle}/>
      <br />
      
      <div className='options--chart-label'>Legend:</div> 
      <input type="checkbox" name="chartLegend" id="chartLegend" checked onChange={handleLegend}/>
      <br />

      <div className='options--chart-label'>Color:</div>
      <select className="options--chart-color-scheme" name="chartColorScheme" id="chartColorScheme">
        <option value="default">Default</option>
      </select>
    </div>
  )
}

export default Options