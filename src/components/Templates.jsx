import './Templates.scss';
import React from 'react';
import template from '../templates/template';

const Templates = ({templates, setTemplates, chart}) => {
  console.log('template', template, Object.keys(template));


  return (
    <div className='templates'>
      <h2 className='templates--heading'>
          Templates for {chart.charAt(0).toUpperCase() + chart.slice(1)} Charts
      </h2>
      <div className="templates--selections">
        {!templates[chart] && <p>No Templates Found</p>} 
      </div>
    </div>
  )
}

export default Templates