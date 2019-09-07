import React from "react";
import styled from "styled-components";

interface IProps {
  className?: string;
  squareColor: string;
  size: string;
}

const LogoBase = ({ className }: IProps) => (
  <span className={className}>SecondHand</span>
);

export default styled(LogoBase)`
  font-size: ${({ size }) => (size === "small" ? "2.2rem" : "6.6rem")};
  position: relative;
  margin-left: 1rem;
  z-index: 10;
  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: -1rem;
    transform: translateY(-50%);
    z-index: -1;

    ${({ size }) =>
      size === "small"
        ? `width: 3rem;
    height: 3rem;`
        : `width: 9rem;
    height: 9rem;
    `};

    ${({ squareColor, theme }) =>
      squareColor === "light"
        ? `background-image: linear-gradient(to right bottom,${theme.colorGreyLight2}, ${theme.colorGreyLight4});`
        : `background-image: linear-gradient(to right bottom, ${theme.colorGreyLight6}, ${theme.colorGreyDark6});`};
  }
`;
