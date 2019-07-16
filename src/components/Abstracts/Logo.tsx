import React from "react";
import styled from "styled-components";

interface IProps {
  className: string;
};

const LogoBase = ({ className }: IProps) => (
  <span className={className}>SecondHand</span>
);

export default styled(LogoBase)`
  font-size: 2.2rem;
  position: relative;
  margin-left: 1rem;
  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: -1rem;
    transform: translateY(-50%);
    width: 3rem;
    height: 3rem;
    background-color: white;
    z-index: -1;
  }
`;
