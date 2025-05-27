import React from 'react';
const ArrowSvg = ({ color = 'white', ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="9"
      height="16"
      viewBox="0 0 9 16"
      fill="none"
      {...props}
    >
      <path
        d="M8 1L0.999999 8L8 15"
        stroke={color}
        stroke-width="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowSvg;
