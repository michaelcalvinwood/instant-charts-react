import './Options.scss';
import React, { useEffect } from 'react';
import * as lodash from 'lodash';

function Options({config, setConfig, templates, csv, setCsv, embedCode, chart}) {
  console.log("Options", config, templates);

  const { colors } = templates.global.choices;

  if (typeof config.checked === 'undefined') config.checked = true;
  if (typeof config.percent === 'undefined') config.percent = false;
  if (typeof config.decimal === 'undefined') config.decimal = 0;
  if (typeof config.orient === 'undefined') config.orient = 'horizontal';
  if (typeof config.dashes === 'undefined') config.dashes = '';
  if (typeof config.dashInfo === 'undefined') config.dashInfo = [];
  console.log('options csv.length', csv.length, typeof config.title)
  if (csv.length) {
    const words = csv[0][0].split(' ');
    if (words.length > 1) {
      const configCopy = lodash.cloneDeep(config);
      configCopy.title = {text: csv[0][0]}
      setConfig(configCopy);

      const csvCopy = lodash.cloneDeep(csv);
      csvCopy[0][0] = '';
      setCsv(csvCopy);
    }
  } 

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

  const handleDashes = e => {
    console.log('handleDashes', config.dashInfo);
    // validation
    let test = e.target.value;
    if (test.length) {
      const parts = test.split(',');
      for (let i = 0; i < parts.length; ++i) {
        let testValue = isNaN(Number(parts[i]));
        if (testValue) return;
      }
    }
    const configCopy = lodash.cloneDeep(config);
    
    if (test.length) {
      configCopy.dashInfo = [];
      const parts = test.split(',');
      for (let i = 0; i < parts.length; ++i) {
       if (parts[i]) configCopy.dashInfo.push(Number(parts[i]));
      }
    } else configCopy.dashInfo = [];
    
    configCopy.dashes = e.target.value;
    
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

  const handleDecimal = e => {
    const configCopy = lodash.cloneDeep(config);
    configCopy.decimal = e.target.value;
    setConfig(configCopy);
  }
 
  const handleColorSelection = e => {
    const configCopy = lodash.cloneDeep(config);
    configCopy.color = e.target.value;
    setConfig(configCopy);
  }

  const handleOrient = orient => {
    const configCopy = lodash.cloneDeep(config);
    configCopy.orient = orient;
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

      { chart === 'bar' && 
        <div>
          <div className='options__chart-label'>Orient:</div> 
            {
              config.orient === 'horizontal' ?  
              <input 
                onClick={() => handleOrient('horizontal')}
                type="radio" id="horizontal" name="barOrientation" value="horizontal" checked/> :
              <input 
                onClick={() => handleOrient('horizontal')}
                type="radio" id="horizontal" name="barOrientation" value="horizontal" />
            }
            <label for="horizontal">horizontal</label>
            {
              config.orient === 'vertical' ?
              <input 
                onClick={() => handleOrient('vertical')}
                type="radio" id="vertical" name="barOrientation" value="vertical" checked/> :
              <input 
                onClick={() => handleOrient('vertical')}
                type="radio" id="vertical" name="barOrientation" value="vertical"/>           
            }
            <label for="vertical">vertical</label>
          <br />

        </div>

      }
      <div className='options__chart-label'>Percent:</div> 
      <input type="checkbox" name="chartPercent" id="chartPercent" 
        checked={config.percent} onChange={handlePercent}
      />
      <br />

      <div className='options__chart-label'>Decimal:</div> 
      <input type="number" min="0" max="6" step="1" name="chartDecimal" id="chartDecimal" value={config.decimal} className="options__chart-decimal"
        checked={config.percent} onChange={handleDecimal}
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
      <br />

      <div className='options__chart-label'>Dashes:</div>
      <input 
        type="text" 
        name="chartDashes" 
        id="chartDashes" 
        className="options--chart-title" 
        value={config.dashes} 
        onChange={handleDashes}/>
      <br />
    
    
    
    
    </div>
    


  )
}

export default Options