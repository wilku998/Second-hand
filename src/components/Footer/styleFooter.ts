import { IProps } from "./Footer";
import { FunctionComponent } from "react";
import styled from "styled-components";

export default (Footer: FunctionComponent<IProps>) => styled(Footer)`
  margin-top: 10rem;
  padding: 5rem 6rem 4rem 6rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  clip-path: polygon(0 1rem, 100% 0, 100% 100%, 0 100%);
  text-align: center;
  ${({ theme }) => `
    background-image: linear-gradient(to right bottom, ${theme.colorGreyDark1}, ${theme.colorGreyDark0});
    color: ${theme.colorGreyLight3};
  `}
  & > * {
    flex: 1;
  }
`;

export const List = styled.ul`
  margin-left: 6rem;
  list-style: none;
  & > li {
    &:first-child {
      border-top: none !important;
    }
  }
`;

export const Text = styled.span`
  padding: 0.3rem 0;
  position: relative;
  ${({ theme }) => `
    border-top: ${theme.darkBorder};
  `}
`;
