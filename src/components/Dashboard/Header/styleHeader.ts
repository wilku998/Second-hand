import styled from "styled-components";
import { FunctionComponent } from "react";
import { IProps } from "./Header";
import media from "../../../styles/media";

export default (Header: FunctionComponent<IProps>) => styled(Header)`
  padding: 8rem 4rem;
  margin-bottom: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background: url("/images/header_background.jpg") center/cover no-repeat fixed;
  color: white;

  ${({ theme }) => `
    box-shadow: ${theme.lightShadow};
  `}

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(
      to right bottom,
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.6)
    );
  }

  & > * {
    position: relative;
    z-index: 10;
  }
`;

export const Button = styled.button`
  font-size: 1.6rem;
  border-radius: 5rem;
  padding: 1rem 2rem;
  border: none;
  position: relative;
  ${({ theme }) => `
    background: linear-gradient(to right bottom, ${theme.colorBlue2}, ${theme.colorBlue3});
    &:after{
      ${theme.headerButtonPseudo};
      opacity: 1;
      box-shadow: 0 2rem 2rem rgba(0, 0, 0, 0.3);
    }
    &:before{
      ${theme.headerButtonPseudo};
      opacity: 0;
      box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
    }
  `}
  transition: all .2s;
  &:hover {
    transform: translateY(-0.3rem);
  }
  &:active {
    transform: translateY(-0.1rem);
  }
  &:hover:after {
    opacity: 0;
  }
  &:hover:before {
    opacity: 1;
  }
`;

export const Content = styled.div`
  width: 55rem;
  text-align: center;
  margin-bottom: 3rem;

  ${media.small`
    width: 100%;
  `}
`;

export const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 400;
  line-height: 1.2;
  margin-bottom: 1rem;
  text-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.3);
`;

export const Description = styled.p`
  line-height: 1.4;
  font-size: 2rem;
  text-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.3);
`;
