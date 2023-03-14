import './Templates.scss';
import React from 'react';
import template from '../templates/template';
import TemplateCard from './TemplateCard';

const Templates = ({templates, setTemplates, chart, templateSelection, setTemplateSelection}) => {
  console.log('template', template, Object.keys(template));

  let selections = [];
  if (templates[chart]) selections = Object.keys(templates[chart]);
  console.log("Templates selections", selections);

  return (
    <div className='templates'>
      <h2 className='templates--heading'>
          Templates for {chart.charAt(0).toUpperCase() + chart.slice(1)} Charts
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