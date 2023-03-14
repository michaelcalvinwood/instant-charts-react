import './TemplateCard.scss';
import React from 'react';

function TemplateCard({selection}) {
    console.log('TemplateCard', selection)
  return (
    <div>
        {selection}
    </div>
  )
}

export default TemplateCard