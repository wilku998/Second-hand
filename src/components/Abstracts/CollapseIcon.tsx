import React from "react";
import ReactSVG from "react-svg";
import styled from "styled-components";

const CollapseIcon = ({ className }: { className?: string }) => (
  <ReactSVG className={className} src="/svg/left.svg" />
);

export default styled(CollapseIcon)<{ listvisible: string, width: string }>`
  margin-left: auto;
  & > div > svg {
    ${({ theme, listvisible, width }) => `
    width: ${width};
    fill: ${theme.colorGreyDark3};
    transform: ${listvisible === "true" ? "rotate(90deg)" : "rotate(270deg)"};
  `};
  }
`;
