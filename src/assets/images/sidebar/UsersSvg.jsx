import React from 'react';
const UsersSvg = ({ color = 'white', ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="19"
      viewBox="0 0 23 19"
      fill="none"
      {...props}
    >
      <path
        d="M14.7591 17.6667C14.7591 15.2121 11.7743 13.2222 8.09245 13.2222C4.41055 13.2222 1.42578 15.2121 1.42578 17.6667M21.4258 7.66667L16.9813 12.1111L14.7591 9.88889M8.09245 9.88889C5.63785 9.88889 3.648 7.899 3.648 5.44444C3.648 2.98984 5.63785 1 8.09245 1C10.547 1 12.5369 2.98984 12.5369 5.44444C12.5369 7.899 10.547 9.88889 8.09245 9.88889Z"
        stroke={color}
        stroke-width="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UsersSvg;
