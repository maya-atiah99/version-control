import React from 'react';
import './Tooltip.scss';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const Tooltip = ({ content, children, red, placement, disabled }) => {
  const tooltipClass = red ? 'red-tooltip' : ''

  return (
    <Tippy
      arrow={false}
      content={content || null}
      className={tooltipClass}
      placement={placement || 'bottom'}
      disabled={disabled}
    >
      <span>{children}</span>
    </Tippy>
  );
};

export default Tooltip;
