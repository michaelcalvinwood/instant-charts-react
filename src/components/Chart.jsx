import './Chart.scss';
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import lodash from 'lodash';


function Chart({state, setChartOption, chartOption}) {
  console.log('Chart state', state);
  let minChartHeight = 300;
  const chartRef = useRef();
  let percentFlag = false;

  function setTheTitles (option) {
    console.log('setTheTitles option', option);
      /*
      * Set the title
      */

    if (state.config && state.config.title && state.config.title.text) {
      if (typeof option.title === 'undefined') {
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

    let titleFontSize = 12;
    if (option.title && option.title.textStyle && option.title.textStyle.fontSize) titleFontSize = option.title.textStyle.fontSize;
    if (option.title && option.title.textStyle && option.title.textStyle.lineHeight) titleFontSize = option.title.textStyle.lineHeight;
    
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

    let subtitleFontSize = 12;
    if (option.title && option.title.subtextStyle && option.title.subtextStyle.fontSize) subtitleFontSize = option.title.subtextStyle.fontSize;
    if (option.title && option.title.subtextStyle && option.title.subtextStyle.lineHeight) subtitleFontSize = option.title.subtextStyle.lineHeight;
    
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

        // NOTE: totalHeight is the amount of height to add to the minHeight
        let totalHeight = (getTitleHeight(option) + getSubtitleHeight(option)) + 36;

        let minHeight;
    
        if (option.info && option.info.minHeight) minHeight = option.info.minHeight;
        else minHeight = minChartHeight;

        if (state.chart === 'bar') {
          if (state.config.orient === 'vertical' && state.csv.length > 4) {
            totalHeight += 12 * (state.csv.length * state.csv[0].length);
            option.grid.height += 12 * (state.csv.length * state.csv[0].length);
          }
        }
    
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
    console.log('setMetaData', option);
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
    console.log('adjustPiePlacement optionOrig', optionOrig);
    const option = lodash.cloneDeep(optionOrig);

    setTheTitles(option);
    const titleHeight = getTitleHeight(option);
    const subtitleHeight = getSubtitleHeight(option);
    setColorScheme(option);
    adjustContainerHeight(option);
    adjustLegendPlacement(option);

    console.log('adjustPiePlacement option', option);
    return option;
  }

  const adjustBarPlacement = optionOrig => {
    console.log('adjustPiePlacement optionOrig', optionOrig);
    const option = lodash.cloneDeep(optionOrig);

    setTheTitles(option);
    const titleHeight = getTitleHeight(option);
    const subtitleHeight = getSubtitleHeight(option);
    setColorScheme(option);
    adjustContainerHeight(option);
    //adjustLegendPlacement(option);

    console.log('adjustPiePlacement option', option);
    return option;
  }

  const displayChartInDom = (option) => {
    console.log('displayChartInDom option', option);
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

  const convertValue = value => {
    if (typeof value === 'string') {
      if (value.indexOf('%') !== -1) {
        percentFlag = true;
        value = Number(value.replaceAll('%', ''));
      } else if (state.config.percent) {
        value = Number(value) * 100;
        percentFlag = true;
      } else value = Number(value);
    } else {
      if (state.config.percent) {
        value = value * 100;
        percentFlag = true;
      }
    }

    //console.log('convertValue', value, state.config.decimal);
    return value.toFixed(state.config.decimal );
  }

  const displayPieChart = () => {
    const {templates, templateSelection, chart, csv} = state;
    console.log('displayPieChart templateSelection', templateSelection, state.config.percent);

    let option = templates.pie[templateSelection].desktop;

    console.log('displayPieChart option', option);
    /*
     * Set series data using csv
     */
    const data = [];

    for (let i = 1; i < csv[0].length; ++i) {
      const name = csv[0][i];
      let value = convertValue(csv[1][i]);

      data.push({name, value, percentFlag})
    }

    if (percentFlag && option.tooltip) option.tooltip.formatter = (a) => `${a.name}<br>${a.value}%`;
    else if (!percentFlag && option.tooltip) option.tooltip.formatter = (a) => `${a.name}<br>${a.value}`;
    option.series[0].data = data;
   
    option = adjustPiePlacement(option);
    

    displayChartInDom(option);
    
  }

  const extractLineChartData = () => {
    const csv = state.csv;
    const data = [];
    for (let i = 1; i < csv[0].length; ++i) {
      data.push(csv[0][i]);
    }

    return data;
  }

  const extractLineChartSeries = () => {
    const csv = state.csv;
    let maxValue = -1;

    let percentFlag = false;
    let dashFlag = false;

    const series = [];

    for (let i = 1; i < csv.length; ++i) {
      const name = csv[i][0];
      const data = [];
      for (let j = 1; j < csv[i].length; ++ j) {
        if (csv[i][j] === '') continue;
        let value = convertValue(csv[i][j]);
        data.push(value);
      }
      let dashTest = state.config.dashInfo.find(d => d === i);
      if (dashTest) series.push({name, data, type: 'line', lineStyle: {type: 'dashed'}});
      else series.push({name, data, type: 'line', lineStyle: {type: 'solid'}});
    }

    return series;
  }
  const displayLineChart = () => { 
    const {templates, templateSelection, chart, csv} = state;

    let option = templates.line[templateSelection].desktop;
    console.log('displayLineChart template option', option);

    option.xAxis.data = extractLineChartData();
    option.series = extractLineChartSeries();
    console.log('displayLineChart option with series', option);


    // if (percentFlag && option.tooltip) option.tooltip.formatter = (a) => `${a.name}<br>${a.value}%`;
    // else if (!percentFlag && option.tooltip) option.tooltip.formatter = (a) => `${a.name}<br>${a.value}`;
    // option.series[0].data = data;
    option = adjustLinePlacement(option);
    displayChartInDom(option);
  }

  const displayBarChart = () => {
    const {templates, templateSelection, chart, csv} = state;

    let option = templates.bar[templateSelection].desktop;
    console.log('displayBarChart option', option);

    setTheTitles(option);

    let categories = [];
    for (let i = 1; i < csv[0].length; ++i) {
      if (csv[0][i]) categories.push(csv[0][i]);
    }
    
    let names = [];
    let series = [];
    for (let i = 1; i <= categories.length; ++i) {
      let data = [];
      let name = csv[0][i] ? csv[0][i] : '';

      option.xAxis.data = [];
      for (let j = 1; j < csv.length; ++j) {
        let value = convertValue(csv[j][i]);
        data.push({value});
        option.xAxis.data.push(csv[j][0]);
      }
      let temp = lodash.cloneDeep(templates.bar[templateSelection].desktop.series[0]);
      if (percentFlag) temp.label.formatter = '{c}%';
      temp.data = data;
      if (name) {
        temp.name = name;
        names.push(name);
      }
      console.log('displayBarChart temp', temp)
      series.push(temp);
    }
    if (names.length) {
      option.legend.data = names;
    }
    console.log('displayBarChart series', series);
    console.log('displayBarChart legend', option.legend);

    option.series = series;

    option = adjustBarPlacement(option);

    if (state.config.orient === 'vertical') {
      // Flip the axis
      let tempAxis = option.xAxis;
      option.xAxis = option.yAxis;
      option.yAxis = tempAxis;

      // get max characters in yAxis data labels
      const maxLabelLength = 30;

      let maxChars = 0;
      for (let i = 0; i < option.yAxis.data.length; ++i) {
        const curLabel = option.yAxis.data[i];
        if (curLabel.length > 30) {
          const words = curLabel.split(' ');
          const sentences = [];
          let count = 0;
          let sentence = words[0];
          for (let j = 1; j < words.length; ++j) {
            if (sentence.length + words[j].length < maxLabelLength) sentence += ' ' + words[j];
            else {
              sentences.push(sentence);
              sentence = words[j];
            }
          }
          if (sentence.length) sentences.push(sentence);
          option.yAxis.data[i] = sentences.join("\n");
          maxChars = 30;
        } else if (option.yAxis.data[i].length > maxChars) maxChars = option.yAxis.data[i].length;
      }
      option.grid.left = maxChars * 7;
    }

    if (percentFlag) {
      option.tooltip.formatter =  "<div style='text-align:center'>{b}<br>{a}<br>{c}%</div>";
    }
    
    displayChartInDom(option);

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