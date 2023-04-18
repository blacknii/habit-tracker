import React from "react";

function Logo() {
  return (
    <svg
      width="31"
      height="31"
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.02216 23L20.6289 23C21.7078 23 22.8647 22.1616 23.4979 21.0486C24.1413 19.9178 24.2794 18.442 23.2328 17.1587L23.228 17.1527L10.8762 3.80401L10.7005 3.97377L10.8553 3.78395C9.59838 2.71365 8.12015 2.85703 6.98206 3.51133C5.86109 4.15578 4.99999 5.33701 4.99999 6.44471L5 18.3048C5 18.3048 5 18.3052 5.24181 18.3052L5 18.3048C5 20.336 5.62403 21.5309 6.48478 22.2075C7.30024 22.8485 8.28506 22.99 9.02216 23Z"
        fill="#3FBBF7"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M22.9779 8H11.3711C10.2922 8 9.13536 8.83841 8.50211 9.9514C7.85871 11.0822 7.72064 12.558 8.76721 13.8413L8.77206 13.8473L21.1238 27.196L21.2995 27.0262L21.1447 27.2161C22.4016 28.2864 23.8799 28.143 25.018 27.4887C26.1389 26.8442 27 25.663 27 24.5553V12.6952C27 12.6952 27 12.6948 26.7582 12.6948L27 12.6952C27 10.664 26.376 9.46911 25.5152 8.79253C24.6998 8.15155 23.715 8.01003 22.9779 8Z"
        fill="#3FBBF7"
      />
      <g filter="url(#filter0_i_108_35)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M14.7588 8H11.3711C10.2922 8 9.13536 8.83841 8.50211 9.9514C7.8587 11.0822 7.72063 12.558 8.7672 13.8413L8.77206 13.8473L17.2412 23H20.6289C21.7078 23 22.8647 22.1616 23.4979 21.0486C24.1413 19.9178 24.2794 18.442 23.2328 17.1587L23.228 17.1527L14.7588 8Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_i_108_35"
          x="8.00002"
          y="8"
          width="16"
          height="19"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          {/* <feOffset dy="4" /> */}
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_108_35"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default Logo;
