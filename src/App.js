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
  const [templateSelection, setTemplateSelection] = useState('default');
  const [chart, setChart] = useState('bar');
  const [csv, setCsv] = useState(null);
  const [config, setConfig] = useState({});

  const state = {templates, templateSelection, chart, csv}
  
  useEffect(() => {

  })

  return (
    <div className="App">
      <FileUpload 
        chart={chart}
        setChart={setChart}
        setCsv={setCsv}
      />
      <Templates 
        templates={templates}
        setTemplates={setTemplates}
        chart={chart}
        templateSelection={templateSelection}
        setTemplateSelection={setTemplateSelection}
      /> 
      <Options 
        config={config}
        setConfig={setConfig}
      />
      <Chart 
        state={state}
      />
    </div>
  );
}

export default App;
 