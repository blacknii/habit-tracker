import React from "react";

function Circle(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="ionicon"
      viewBox="0 0 512 512"
      height="1.2em"
      width="1.2em"
    >
      <circle
        cx="256"
        cy="256"
        r="192"
        fill={props.color}
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
    </svg>
  );
}

export default Circle;
