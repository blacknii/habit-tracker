import React from "react";

function Circle(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="ionicon"
      viewBox="0 0 512 512"
      height="1.2em"
      width="1.2em"
    >
      <circle
        cx="256"
        cy="256"
        r="192"
        fill="white"
        stroke="#bed1ed"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="36"
      />
      {props.checked && (
        <circle
          cx="256"
          cy="256"
          r="120"
          fill="#007bff"
          stroke="#bed1ed"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="36"
        />
      )}
    </svg>
  );
}

export default Circle;
