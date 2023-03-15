import './Options.scss';
import React from 'react';
import * as lodash from 'lodash';

function Options({config, setConfig, templates}) {
  console.log("Options", config, templates);

  const { colors } = templates.global.choices;

  if (typeof config.checked === 'undefined') config.checked = true;

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
   const configCopy = lodash.cloneDeep(config);
   configCopy.checked = !configCopy.checked;
   setConfig(configCopy);
    
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
      <input type="checkbox" name="chartLegend" id="chartLegend" checked={config.checked} onChange={handleLegend}/>
      <br />

      <div className='options--chart-label'>Color:</div>
      <select className="options--chart-color-scheme" name="chartColorScheme" id="chartColorScheme">
        <option key="default" value="default">Default</option>
        {colors.map(color => {
          const colorName = Object.keys(color)[0];
          return <option key={colorName} value={colorName}>{colorName}</option>
        })}
      </select>
    </div>
  )
}

export default Options