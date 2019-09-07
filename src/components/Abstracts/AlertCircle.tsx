import React from "react";
import styled from "styled-components";

const AlertCircle = ({ number }: { number: number }) => (
  <Base>{number > 9 ? 9 : number}</Base>
);

const Base = styled.span`
  position: absolute;
  top: -1.6rem;
  left: 1rem;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  z-index: 10;
  font-size: 1rem;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  ${({ theme }) => `
    background-color: ${theme.colorRed};
  `}
`;

export default AlertCircle;
