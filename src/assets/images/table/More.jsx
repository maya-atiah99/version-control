import React from 'react';

const More = ({ color = '#1B224C', ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="23"
      viewBox="0 0 22 23"
      fill="none"
      {...props}
    >
      <path
        d="M8 21.5H14C19 21.5 21 19.5 21 14.5V8.5C21 3.5 19 1.5 14 1.5H8C3 1.5 1 3.5 1 8.5V14.5C1 19.5 3 21.5 8 21.5Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.9965 11.5H15.0045"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.9955 11.5H11.0036"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.99451 11.5H7.00259"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default More;
