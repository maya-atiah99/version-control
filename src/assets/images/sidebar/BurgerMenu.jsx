import React from 'react';

const BurgerMenu = ({ color = 'white', className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="9"
      viewBox="0 0 18 9"
      fill="none"
      {...props}
    >
      <path
        d="M1.2002 4.6H16.8002M1.2002 1H16.8002M1.2002 8.2H9.0002"
        stroke={color}
        stroke-width="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BurgerMenu;
