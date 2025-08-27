// components/CustomGlowSVG.tsx
import React from "react";

const CustomGlowSVG = () => {
    return (
        <svg
  xmlns="http://www.w3.org/2000/svg"
  width="256"
  height="750"
  viewBox="0 0 256 608"
  fill="none"
>
  <mask
    id="mask0_6188_177318"
    style={{ maskType: "alpha" }}
    maskUnits="userSpaceOnUse"
    x="0"
    y="0"
    width="256"
    height="640"
  >
    <rect
      width="256"
      height="640"
      transform="matrix(-1 0 0 1 256 0)"
      fill="#D9D9D9"
    />
  </mask>
  <g mask="url(#mask0_6188_177318)">
    <g filter="url(#filter0_f_6188_177318)">
      <ellipse
        cx="64.58"
        cy="65.67"
        rx="64.58"
        ry="65.67"
        transform="matrix(-0.999052 0.0435305 0.041825 0.999125 267.735 392.531)"
        fill="#dbf51b"
      />
      <ellipse
        cx="80.36"
        cy="81.77"
        rx="80.36"
        ry="81.77"
        transform="matrix(-0.999052 0.0435305 0.041825 0.999125 369.041 249.793)"
        fill="#dbf51b"
      />
      <ellipse
        cx="90.22"
        cy="91.84"
        rx="90.22"
        ry="91.84"
        transform="matrix(-0.999052 0.0435305 0.041825 0.999125 380.359 315.776)"
        fill="#dbf51b"
      />
      <ellipse
        cx="57.85"
        cy="58.82"
        rx="57.85"
        ry="58.82"
        transform="matrix(-1 0 0 1 313.946 256.471)"
        fill="#dbf51b"
      />
    </g>
  </g>
  <defs>
    <filter
      id="filter0_f_6188_177318"
      x="-7.10138"
      y="-34.1172"
      width="583.101"
      height="705.881"
      filterUnits="userSpaceOnUse"
      colorInterpolationFilters="sRGB"
    >
      <feFlood floodOpacity="0" result="BackgroundImageFix" />
      <feBlend
        mode="normal"
        in="SourceGraphic"
        in2="BackgroundImageFix"
        result="shape"
      />
      <feGaussianBlur
        stdDeviation="80"
        result="effect1_foregroundBlur_6188_177318"
      />
    </filter>
  </defs>
</svg>




    );
};

export default CustomGlowSVG;
