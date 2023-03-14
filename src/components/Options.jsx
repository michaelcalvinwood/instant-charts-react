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
      
      <div className='options--chart-label'>Title:</div>
      <input type="text" name="chartTitle" id="chartTitle" className="options--chart-title" value='' onChange={handleTitle}/>
      <br />
    
      <div className='options--chart-label'>Subtitle:</div>
      <input type="text" name="chartSubtitle" id="chartSubtitle" className="options--chart-subtitle" value='' onChange={handleSubtitle}/>
      <br />
      
      <div className='options--chart-label'>Legend:</div> 
      <input type="checkbox" name="chartLegend" id="chartLegend" checked onChange={handleLegend}/>
      <br />

      <div className='options--chart-label'>Color:</div>
      <div className='options--color-list'>Color list goes here</div>
    </div>
  )
}

export default Options