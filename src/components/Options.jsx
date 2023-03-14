import './Options.scss';
import React from 'react';

function Options() {

  const handleTitle = e => {

  }

  const handleSubtitle = e => {

  }

  const handleLegend = e => {

  }

  return (
    <div className='options'>
      <h2 className="options--heading">Options</h2>
      <label htmlFor="chartTitle" className="options--chart-title-label">
          Title:
          <input type="text" name="chartTitle" id="chartTitle" className="options--chart-title" value='' onChange={handleTitle}/>
      </label>
      <label htmlFor="chartSubtitle" className="options--chart-subtitle-label">
        Subtitle:
        <input type="text" name="chartSubtitle" id="chartSubtitle" className="options--chart-subtitle" value='' onChange={handleSubtitle}/>
      </label>
      <div>Legend: <input type="checkbox" name="chartLegend" id="chartLegend" checked onChange={handleLegend}/></div>
      <div>Color:</div>
      <div>Color list goes here</div>
    </div>
  )
}

export default Options