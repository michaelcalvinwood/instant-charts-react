import './TemplateCard.scss';
import React from 'react';

function TemplateCard({selection, templateSelection, setTemplateSelection}) {
    console.log('TemplateCard', selection)
  return (
    <div 
        className={selection === templateSelection ? 'template-card template-card--active' : 'template-card'}
    >
        {selection}
    </div>
  )
}

export default TemplateCard