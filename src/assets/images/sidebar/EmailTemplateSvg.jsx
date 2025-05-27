import React from 'react';
const ProjectsSvg = ({ color = 'white', ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="18"
      viewBox="0 0 23 18"
      fill="none"
      {...props}
    >
      <path
        d="M21.9524 9.0736V1.21646H11.4762H1V9.0736V16.9307H11.4762"
        stroke={color}
        stroke-width="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.9525 14.3117H14.6191"
        stroke={color}
        stroke-width="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.334 11.6927L21.953 14.3117L19.334 16.9308"
        stroke={color}
        stroke-width="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 1.21646L11.4762 9.0736L21.9524 1.21646"
        stroke={color}
        stroke-width="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ProjectsSvg;
