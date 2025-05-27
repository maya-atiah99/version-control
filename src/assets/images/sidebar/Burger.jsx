import React from 'react';
const BurgerSVG = ({ color = 'black', className, ...props }) => {
  return (
    <svg
      width="16"
      height="14"
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M1 7H15M1 1H15M1 13H8"
        stroke={color}
        stroke-width="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BurgerSVG;
