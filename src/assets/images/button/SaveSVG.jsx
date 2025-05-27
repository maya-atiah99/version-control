import React from 'react';
const SaveSVG = ({ color = 'white', ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      {...props}
    >
      <path
        d="M16.125 23.5V16.625H7.875V23.5M20.25 23.5H3.75C2.23122 23.5 1 22.2688 1 20.75V4.25C1 2.73122 2.23122 1.5 3.75 1.5H14.986C15.7153 1.5 16.4147 1.78973 16.9305 2.30546L22.1945 7.56954C22.7103 8.08527 23 8.78474 23 9.51409V20.75C23 22.2688 21.7688 23.5 20.25 23.5Z"
        stroke={color}
        stroke-width="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SaveSVG;
