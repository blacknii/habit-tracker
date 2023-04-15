import React from "react";

function Circle(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="ionicon"
      viewBox="0 0 512 512"
      height="1em"
      width="1em"
    >
      <circle
        cx="256"
        cy="256"
        r="192"
        fill="none"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
    </svg>
  );
}

export default Circle;
