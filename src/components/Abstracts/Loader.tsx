import React from "react";
import styled from "styled-components";

const Loader = ({ className }: { className?: string, size: number }) => (
  <div className={className}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default styled(Loader)<{size: number}>`
  display: inline-block;
  position: relative;
  ${({ size }) => `
    width: ${size}rem;
    height: ${size}rem;
  `}
  & div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    ${({ theme, size }) => `
      width: ${size - (size / 10) * 2}rem;
      height: ${size - (size / 10) * 2}rem;
      margin: ${size / 10}rem;
      border: ${size / 10}rem solid ${theme.colorGreyDark6};
      border-color:${theme.colorGreyDark6} transparent transparent transparent;
    `}
  }
  & div:nth-child(1) {
    animation-delay: -0.45s;
  }
  & div:nth-child(2) {
    animation-delay: -0.3s;
  }
  & div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
