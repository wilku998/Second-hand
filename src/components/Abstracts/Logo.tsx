import React from "react";
import styled from "styled-components";

interface IProps {
  className?: string;
}

const LogoBase = ({ className }: IProps) => (
  <span className={className}>
    S<span>econdHand</span>
  </span>
);

export default styled(LogoBase)`
  position: relative;
  z-index: 10;
  ${({ theme }) => `
    color: ${theme.colorGreyDark2};
  `}

  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: -1rem;
    transform: translateY(-50%);
    z-index: -1;
  }
`;
