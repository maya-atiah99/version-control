import React from 'react';
const AddSvg = ({ color = 'white', ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      {...props}
    >
      <path
        d="M13.4004 10.5H10.4004M10.4004 10.5H7.40039M10.4004 10.5V7.5M10.4004 10.5V13.5M15.4004 19.5H5.40039C3.19125 19.5 1.40039 17.7091 1.40039 15.5V5.5C1.40039 3.29086 3.19125 1.5 5.40039 1.5H15.4004C17.6095 1.5 19.4004 3.29086 19.4004 5.5V15.5C19.4004 17.7091 17.6095 19.5 15.4004 19.5Z"
        stroke={color}
        stroke-width="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default AddSvg;
