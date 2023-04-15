import React from "react";

function FireIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="ionicon"
      viewBox="0 0 512 512"
      height="1.15em"
      width="1.15em"
    >
      <path
        d="M112 320c0-93 124-165 96-272 66 0 192 96 192 272a144 144 0 01-288 0z"
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="40"
      />
      <path
        d="M320 368c0 57.71-32 80-64 80s-64-22.29-64-80 40-86 32-128c42 0 96 70.29 96 128z"
        fill={props.hole}
        stroke={props.hole}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="5"
      />
    </svg>
  );
}

export default FireIcon;
