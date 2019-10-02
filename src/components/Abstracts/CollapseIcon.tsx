import React from "react";
import ReactSVG from "react-svg";
import styled from "styled-components";

const CollapseIcon = ({ className }: { className?: string }) => (
  <div className={className}>
    <ReactSVG src="/svg/left.svg" />
  </div>
);

export default styled(CollapseIcon)<{ listvisible: string; width: string }>`
  height: 100%;
  position: relative;
  margin-left: auto;

  ${({ listvisible, width }) => `
    width: ${width};
    height: ${width};
    & svg {
      width: ${width};
      height: ${width};
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) ${listvisible === "true" ? "rotate(90deg)" : "rotate(270deg)"};
    }
  `};
`;
