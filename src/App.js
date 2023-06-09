import logo from './logo.svg';
import './App.css';
import FileUpload from './components/FileUpload';
import Templates from './components/Templates';
import Options from './components/Options';
import Chart from './components/Chart';
import { useEffect, useState } from 'react';
import template from './templates/template';

function App() {
  const [templates, setTemplates] = useState(template);
  const [templateSelection, setTemplateSelection] = useState('Default');
  const [chart, setChart] = useState('');
  const [csv, setCsv] = useState([]);
  const [config, setConfig] = useState({});
  const [chartOption, setChartOption] = useState({});
  const [embedCode, setEmbedCode] = useState('');
  const [percentFlag, setPercentFlag] = useState(false);

  const state = {templates, templateSelection, chart, csv, config}
  
  useEffect(() => {

  })

  return (
    <div className="App">
      <FileUpload 
        chart={chart}
        setChart={setChart}
        setCsv={setCsv}
        setConfig={setConfig}
        chartOption={chartOption}
        csv={csv}
        setTemplateSelection={setTemplateSelection}
        setChartOption={setChartOption}
        config={config}
        embedCode={embedCode}
        setEmbedCode={setEmbedCode}
        setPercentFlag={setPercentFlag}

      />
      <Templates 
        templates={templates}
        setTemplates={setTemplates}
        chart={chart}
        templateSelection={templateSelection}
        setTemplateSelection={setTemplateSelection}
        csv={csv}
        embedCode={embedCode}
      /> 
      <Options 
        config={config}
        setConfig={setConfig}
        templates={templates}
        csv={csv}
        setCsv={setCsv}
        embedCode={embedCode}
        chart={chart}
      />
      <Chart 
        state={state}
        chartOption={chartOption}
        setChartOption={setChartOption}
        percentFlag={percentFlag}
      />
    </div>
  );
}

export default App;
 