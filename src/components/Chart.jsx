import './Chart.scss';
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import lodash from 'lodash';


function Chart({state, setChartOption, chartOption}) {
  console.log('Chart state', state);
  let minChartHeight = 300;
  const chartRef = useRef();

  function setTheTitles (option) {
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
  }  

  function getTitleHeight (option) {
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

    return titleHeight;
  }

  function getSubtitleHeight (option) {
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
    return subtitleHeight;
    
  }

  function adjustContainerHeight (option) {
        /*
     * Adjust chart placement based on total title & subtitle height
     */

        const totalHeight = (getTitleHeight(option) + getSubtitleHeight(option)) * 2.75;

        let minHeight;
    
        if (option.info && option.info.minHeight) minHeight = option.info.minHeight;
        else minHeight = minChartHeight;
    
        chartRef.current.style.height = minHeight + totalHeight + 'px';
    
        if (!option.info) option.info = {containerHeight: minHeight + totalHeight};
        else option.info.containerHeight = minHeight + totalHeight;
  }

  function adjustLegendPlacement (option) {
    /*
     * Adjust legend placement based on total title & subtitle height
     */

    if (!state.config.checked) {
      option.legend.show = false
    }
    else {
      console.log('Legend True', state.templates[state.chart][state.templateSelection].desktop.legend);
      option.legend = state.templates[state.chart][state.templateSelection].desktop.legend;
      option.legend.show = true;
    }

    if (option.legend.top) {
      option.legend.top = (getTitleHeight(option) + getSubtitleHeight(option)) + 24;
      console.log("option legend top", option)
    }
  }

  function setColorScheme (option) {

    /*
     * Set color scheme
     */

    if (state.config.color && state.config.color !== 'default') {
      let match = state.templates.global.choices.colors.find(color => Object.keys(color)[0] === state.config.color);
      option.color = Object.values(match)[0];
    } 
    
  }

  function setMetaData (option) {
    if (typeof option.info === 'undefined') option.info = {
      source: state.config.source ? state.config.source : '',
      meta: state.config.meta ? state.config.meta : ''
    }; 
    else {
      option.info.source = state.config.source ? state.config.source : '';
      option.info.meta = state.config.meta ? state.config.meta : '';
    }

  }

  const adjustLinePlacement = optionOrig => {
    const option = lodash.cloneDeep(optionOrig);
    console.log('adjustLinePlacement', option);

    setTheTitles(option);
    const titleHeight = getTitleHeight(option);
    const subtitleHeight = getSubtitleHeight(option);
    setColorScheme(option);
    console.log('height variables', chartRef.current.offsetHeight, option.info.minHeight)
    if (chartRef.current.offsetHeight < option.info.minHeight) chartRef.current.style.height = option.info.minHeight + 'px';
    
    //adjustContainerHeight(option);
    adjustLegendPlacement(option);

    option.grid.top = titleHeight + subtitleHeight + 48;

    return option;
  }

  const adjustPiePlacement = optionOrig => {
    const option = lodash.cloneDeep(optionOrig);

    setTheTitles(option);
    const titleHeight = getTitleHeight(option);
    const subtitleHeight = getSubtitleHeight(option);
    setColorScheme(option);
    adjustContainerHeight(option);
    adjustLegendPlacement(option);

    return option;
  }

  const displayPieChart = () => {
    const {templates, templateSelection, chart, csv} = state;

    let option = templates.pie[templateSelection].desktop;
    /*
     * Set series data using csv
     */
    let percentFlag = false;
    const data = [];

    for (let i = 1; i < csv[0].length; ++i) {
      const name = csv[0][i];
      let value = csv[1][i];
      if (typeof value === 'string') {
        if (value.indexOf('%') !== -1) percentFlag = true;
        value = Number(value.replaceAll('%', ''));
      }
      data.push({name, value, percentFlag})
    }

    console.log('percentFlag', percentFlag);

    if (percentFlag && option.tooltip) option.tooltip.formatter = (a) => `${a.name}<br>${a.value}%`;
    else if (!percentFlag && option.tooltip) option.tooltip.formatter = (a) => `${a.name}<br>${a.value}`;
    option.series[0].data = data;
   
    option = adjustPiePlacement(option);
    option = setMetaData(option);

    const chartDom = chartRef.current;
    var myChart = echarts.init(chartDom);

    myChart.resize({opts: {
      height: 'auto'
    }});

    /*
     * Update option state if different
     */

    const optionCopy = lodash.cloneDeep(option);
    const chartOptionCopy = lodash.cloneDeep(chartOption);

    console.log('Chart setOption', option, chartOption);

    if (!lodash.isEqualWith(option, chartOption, (val1, val2) => {
      if(lodash.isFunction(val1) && lodash.isFunction(val2)) {
        return val1.toString() === val2.toString();
      }
    })) {
      setChartOption(option);
    }
    
    myChart.setOption(option);
    
  }


  const displayLineChart = () => { const {templates, templateSelection, chart, csv} = state;

    let option = templates.line[templateSelection].desktop;
    console.log('displayLineChart option', option);
    
    /*
    * Set series data using csv
    */

    let maxValue = -1;

    let percentFlag = false;
    const info = [];

    for (let i = 1; i < csv.length; ++i) {
      const name = csv[i][0];
      console.log('csv[i]', csv[i], i);
      const data = [];
      for (let j = 1; j < csv[i].length; ++ j) {
        let value = csv[i][j];
          if (typeof value === 'string') {
            if (value.indexOf('%') !== -1) percentFlag = true;
            value = Number(value.replaceAll('%', ''));
          }  
        data.push(csv[i][j]);
        if (value > maxValue) maxValue = value;
      }
      
      info.push({name, data, type: 'line'});
    }

    const data = [];
    for (let i = 1; i < csv[0].length; ++i) {
      data.push(csv[0][i]);
    }

    option.xAxis.data = data;

    option.series = info;

    console.log('percentFlag', percentFlag);

    // if (percentFlag && option.tooltip) option.tooltip.formatter = (a) => `${a.name}<br>${a.value}%`;
    // else if (!percentFlag && option.tooltip) option.tooltip.formatter = (a) => `${a.name}<br>${a.value}`;
    // option.series[0].data = data;
  
    option = adjustLinePlacement(option);
    setMetaData(option);

    const chartDom = chartRef.current;
    var myChart = echarts.init(chartDom);

    myChart.resize({opts: {
      height: 'auto'
    }});

    /*
    * Update option state if different
    */

    const optionCopy = lodash.cloneDeep(option);
    const chartOptionCopy = lodash.cloneDeep(chartOption);

    console.log('Chart setOption', option, chartOption);

    if (!lodash.isEqualWith(option, chartOption, (val1, val2) => {
      if(lodash.isFunction(val1) && lodash.isFunction(val2)) {
        return val1.toString() === val2.toString();
      }
    })) {
      setChartOption(option);
    }
    
    myChart.setOption(option);
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
      {/* <h2 className='chart--heading'>Chart</h2> */}
      <div id="theChart" ref={chartRef}>

      </div>
      { state.config && state.config.source && <div className='chart__source'>
          Source: <span dangerouslySetInnerHTML={{__html: state.config.source}}></span>
        </div>

      }
      
    </div>
  )

}

export default Chart