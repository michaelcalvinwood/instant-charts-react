import './Options.scss';
import React, { useEffect } from 'react';
import * as lodash from 'lodash';

function Options({config, setConfig, templates, csv, embedCode}) {
  console.log("Options", config, templates);

  const { colors } = templates.global.choices;

  if (typeof config.checked === 'undefined') config.checked = true;
  if (typeof config.percent === 'undefined') config.percent = false;

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

  const handleSource = e => {
    const configCopy = lodash.cloneDeep(config);
    if (typeof configCopy.source === 'undefined') {
      configCopy.source = e.target.value
    } else {
      configCopy.source = e.target.value;
    }
    setConfig(configCopy);
  }

  const handleLegend = e => {
   const configCopy = lodash.cloneDeep(config);
   configCopy.checked = !configCopy.checked;
   setConfig(configCopy);
  }

  const handlePercent = e => {
    const configCopy = lodash.cloneDeep(config);
    configCopy.percent = !configCopy.percent;
    setConfig(configCopy);
   }
 
  const handleColorSelection = e => {
    const configCopy = lodash.cloneDeep(config);
    configCopy.color = e.target.value;
    setConfig(configCopy);
  }

  useEffect(() => {
    const configCopy = lodash.cloneDeep(config);
    configCopy.color = 'Default';
    setConfig(configCopy);
  }, [])


  if (embedCode) return (
    <div className='options'>
      
    </div>
  )

  if (!csv.length) return (
    <div className='options'>
      <h2 className="options--heading">Options</h2>
    </div>
  )

  return (
    <div className='options'>
      {/* <h2 className="options--heading">Options</h2> */}
      
      <div className='options__chart-label'>Title:</div>
      <input 
        type="text" 
        name="chartTitle" 
        id="chartTitle" 
        className="options--chart-title" 
        value={config.title && config.title.text ? config.title.text : ''} 
        onChange={handleTitle}/>
      <br />
    
      <div className='options__chart-label'>Subtitle:</div>
      <input 
        type="text" 
        name="chartSubtitle" 
        id="chartSubtitle" 
        className="options--chart-subtitle" 
        value={config.title && config.title.subtext ? config.title.subtext : ''} 
        onChange={handleSubtitle}/>
      <br />
     
      <div className='options__chart-label'>Legend:</div> 
      <input type="checkbox" name="chartLegend" id="chartLegend" checked={config.checked} onChange={handleLegend}/>
      <br />

      <div className='options__chart-label'>Percent:</div> 
      <input type="checkbox" name="chartLegend" id="chartLegend" 
        checked={config.percent} onChange={handlePercent}
      />
      <br />

      <div className='options__chart-label'>Color:</div>
      <select 
        className="options--chart-color-scheme" 
        name="chartColorScheme" 
        id="chartColorScheme"
        onChange={handleColorSelection}
      >
          {colors.map(color => {
            const colorName = Object.keys(color)[0];
            return <option key={colorName} value={colorName}>{colorName}</option>
          })}
      </select>
      <br />


      <div className="options__source-label">Source (HTML):</div>
      <textarea 
        rows="4" 
        id="chartSource" 
        className='options__chart-source'
        value={config.source ? config.source : ''}
        onChange={handleSource}
      />
    </div>
  )
}

export default Options