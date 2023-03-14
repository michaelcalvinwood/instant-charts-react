import './Chart.scss';
import React, { useEffect } from 'react';

function Chart({state}) {
  console.log('Chart', state)

  const displayChart = () => {

  }

  useEffect(() => {
    displayChart();
  });

  return (
    <div className='chart'>
      <h2 className='chart--heading'>Chart</h2>
      <div id="theChart">
        
      </div>
      
    </div>
  )

}

export default Chart