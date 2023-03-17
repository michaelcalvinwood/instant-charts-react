import './Templates.scss';
import React from 'react';
import template from '../templates/template';
import TemplateCard from './TemplateCard';

const Templates = ({templates, setTemplates, chart, templateSelection, setTemplateSelection, csv}) => {
  console.log('template', templateSelection, template, Object.keys(template));

  let selections = [];
  if (templates[chart]) selections = Object.keys(templates[chart]);
  console.log("Templates selections", selections);

  if (!csv.length) {
    return (
      <div className='templates'>
        <h2 className='templates--heading'>
            {chart.charAt(0).toUpperCase() + chart.slice(1)} Templates
        </h2>
      </div>
    )
  }
  return (
    <div className='templates'>
      <h2 className='templates--heading'>
          {chart.charAt(0).toUpperCase() + chart.slice(1)} Templates
      </h2>
      <div className="templates--selections">
        {!templates[chart] && <p>No Templates Found</p>} 
        {templates[chart] && <div className='templates--template-list'>
          {selections.map(selection => {
             return <TemplateCard 
              key={selection}
              selection={selection}
              templateSelection={templateSelection}
              setTemplateSelection={setTemplateSelection}
             />
          })}
          </div>}
      </div>
    </div>
  )
}

export default Templates