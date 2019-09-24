import { IProps } from "./Footer";
import { FunctionComponent } from "react";
import styled from "styled-components";
import media from "../../styles/media";

export default (Footer: FunctionComponent<IProps>) => styled(Footer)`
  margin-top: 10rem;
  padding: 5rem 6rem 4rem 6rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  clip-path: polygon(0 2rem, 100% 0, 100% 100%, 0 100%);
  text-align: center;
  ${({ theme }) => `
    background-image: linear-gradient(to right bottom, ${theme.colorGreyDark1}, ${theme.colorGreyDark0});
    color: ${theme.colorGreyLight3};
  `}
  & > * {
    flex: 1;
  }

  ${media.medium_2`
    font-size: 1.2rem;
    padding: 5rem 3rem 4rem 3rem;
  `};

  ${media.small`
    flex-direction: column;
    align-items: stretch;
  `}
`;

export const List = styled.ul`
  margin-left: 6rem;
  list-style: none;
  & > li {
    &:first-child {
      border-top: none !important;
    }
  }

  ${media.medium_2`
    margin-left: 3rem;
  `};

  ${media.small`
    margin-left: 0;
  `}
`;

export const About = styled.span`
  padding: 0.3rem 0;
  ${({ theme }) => `
    border-top: ${theme.darkBorder};
  `}
  ${media.small`
    border-top: none;
    border-bottom: 1px solid #666;
  `}
`;

export const ListItem = styled.li`
  padding: 0.3rem 0;
  &:not(:first-child) {
    ${({ theme }) => `
    border-top: ${theme.darkBorder};
  `}
  }
`;
