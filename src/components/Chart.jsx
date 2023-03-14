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
      
    </div>
  )

}

export default Chart