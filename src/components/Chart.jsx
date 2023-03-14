import './Chart.scss';
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

function Chart({state}) {
  console.log('Chart', state);
  const chartRef = useRef();

  const addConfig = option => {
    /*
     * Set the title
     */

    if (state.config && state.config.title && state.config.title.text) {
      if (!option.title) {
        option.title = state.config.title
      } else option.title.text = state.config.title.text.replace('<br>', "\n");
    } else {
      if (option.title) option.title.text = '';
    }

    /*
     * Set the subtitle
     */

    if (state.config && state.config.title && state.config.title.subtext) {
      if (!option.title) {
        option.title = state.config.title
      } else option.title.subtext = state.config.title.subtext.replace('<br>', "\n");
    } else {
      if (option.title) option.title.subtext = '';
    }

  }

  const displayPieChart = () => {
    const {templates, templateSelection, chart, csv} = state;

    let option = templates.pie[templateSelection].desktop;
    console.log('Chart option', option);
    
    const chartDom = chartRef.current;
    var myChart = echarts.init(chartDom);

    addConfig(option);

    option && myChart.setOption(option);

  }

  const displayLineChart = () => {

  }

  const displayBarChart = () => {

  }

  useEffect(() => {
    if (state.csv) {
      switch(state.chart) {
        case 'pie':
          displayPieChart();
          break;
        case 'line':
          displayLineChart();
          break;
        case 'bar':
          displayBarChart();
          break;
      }
    }
  });

  return (
    <div className='chart'>
      <h2 className='chart--heading'>Chart</h2>
      <div id="theChart" ref={chartRef}>

      </div>
      
    </div>
  )

}

export default Chart