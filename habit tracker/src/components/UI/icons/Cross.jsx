import React from "react";

function Close(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="ionicon"
      viewBox="0 0 512 512"
      height="1.2em"
      width="1.2em"
    >
      <path
        fill="none"
        stroke={props.color}
        strokeLinecap="miter"
        strokeLinejoin="miter"
        strokeWidth="100"
        d="M 454.265 423.434 L 89.57 58.739 M 454.265 58.739 L 89.57 423.434"
        style={{
          fill: "rgb(89, 85, 218)",
          strokeWidth: "100px",
        }}
      />
    </svg>
  );
}

export default Close;
