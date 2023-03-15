import './Chart.scss';
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import lodash from 'lodash';

function Chart({state}) {
  console.log('Chart state', state);
  const minChartHeight = 300;
  const chartRef = useRef();

  const addConfig = optionOrig => {
    const option = lodash.cloneDeep(optionOrig);

    /*
     * Set the title
     */

    if (state.config && state.config.title && state.config.title.text) {
      if (!option.title) {
        option.title = state.config.title
      } else option.title.text = state.config.title.text.replaceAll('<br>', "\n");
    } else {
      if (option.title) option.title.text = '';
    }

    /*
     * Set the subtitle
     */

    if (state.config && state.config.title && state.config.title.subtext) {
      if (!option.title) {
        option.title = state.config.title
      } else option.title.subtext = state.config.title.subtext.replaceAll('<br>', "\n");
    } else {
      if (option.title) option.title.subtext = '';
    }

    /*
     * Calculate titleHeight
     */

    let titleFontSize = option.title && option.title.textStyle && option.title.textStyle.fontSize ?
      option.title.textStyle.fontSize : 
      16;

   
    let numTitleLines = 0;
    if (option.title.text) {
      numTitleLines = option.title.text.split("\n").length;
    }

    const titleHeight = numTitleLines * titleFontSize;

    /*
     * Calculate subtitleHeight
     */

    let subtitleFontSize = option.title && option.title.subtextStyle && option.title.subtextStyle.fontSize ?
    option.title.subtextStyle.fontSize : 
    16;

   
    let numSubtitleLines = 0;
    if (option.title.subtext) {
      numSubtitleLines = option.title.subtext.split("\n").length;
    }

    const subtitleHeight = numSubtitleLines * subtitleFontSize;

    /*
     * Adjust chart placement based on total title & subtitle height
     */

    const totalHeight = (titleHeight + subtitleHeight) * 2.5;

    chartRef.current.style.height = minChartHeight + totalHeight + 'px';
    //chartRef.current.innerHTML = '';

    if (!state.config.checked) {
      option.legend = {show: false}
    }
    else {
      console.log('Legend True', state.templates.pie[state.templateSelection].desktop.legend);
      option.legend = state.templates.pie[state.templateSelection].desktop.legend;
      option.legend.show = true;
    }

    option.grid = {
      bottom: 0
    }

    

    return option;
  }

  const displayPieChart = () => {
    const {templates, templateSelection, chart, csv} = state;

    let option = templates.pie[templateSelection].desktop;
    /*
     * Set series data using csv
     */
    const data = [];

    for (let i = 0; i < csv[0].length; ++i) {
      data.push({
        name: csv[0][i],
        value: csv[1][i],
      })
    }

    option.series[0].data = data;
   
    option = addConfig(option);

    const chartDom = chartRef.current;
    var myChart = echarts.init(chartDom);

    myChart.resize({opts: {
      height: 'auto'
    }});

    console.log('Chart setOption', option);
    myChart.setOption(option);

  }

  const displayLineChart = () => {

  }

  const displayBarChart = () => {

  }

  useEffect(() => {
    if (state.csv && state.csv.length) {
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