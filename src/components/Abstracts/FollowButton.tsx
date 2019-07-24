import React from "react";
import styled from "styled-components";
import InvisibleButton from "../Abstracts/InvisibleButton";
import ReactSVG from "react-svg";

export default () => (
    <Button>
        <ReactSVG src="./svg/eye.svg" />
    </Button>
);

const Button = styled(InvisibleButton)`
  margin-left: auto;
  & > div > div {
    line-height: 1;
    & > svg {
      width: 2rem;
      height: 2rem;
      ${({ theme }) => `
       fill: ${theme.colorGreyDark3}
      `}
    }
  }
`;