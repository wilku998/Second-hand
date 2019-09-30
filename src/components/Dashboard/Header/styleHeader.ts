import styled from "styled-components";
import { FunctionComponent } from "react";
import { IProps } from "./Header";
import Button_1 from "../../Abstracts/Button_1";
import media from "../../../styles/media";
import Logo from "../../Abstracts/Logo";

export default (Header: FunctionComponent<IProps>) => styled(Header)`
  padding: 4rem 4rem 8rem 4rem;
  margin-bottom: 4rem;
  display: flex;
  align-items: flex-start;
  position: relative;
  background: url("/images/header_background.jpg") center/cover no-repeat fixed;
  &:after {
    z-index: -1;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(
      to right bottom,
      rgba(0, 0, 0, 0.05),
      rgba(0, 0, 0, 0.2)
    );
  }

  ${media.small`
    justify-content: center;
    padding: 4rem 2rem 6rem 2rem;
    margin-bottom: 0;
  `}
`;

export const Button = styled(Button_1)`
  justify-self: start;
  ${media.medium`
    font-size: 1.2rem;
  `}
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: min-content;
  background-color: ${({ theme }) => theme.colorWhiteTransparent};
  padding: 2rem;
  margin-left: 4rem;
  position: relative;
  & > * {
    position: relative;
    z-index: 10;
  }
  &:after {
    content: "";
    position: absolute;
    top: 4rem;
    left: -4rem;
    height: 100%;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.2);
  }
  ${media.small`
    margin-left: 0;
    &:after{
      top: 2rem;
      left: -2rem;
    }
  `}
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: 400;
  line-height: 1.2;
  margin: 1rem 0;
  ${media.medium`
    font-size: 2rem;
  `}
`;

export const Description = styled.p`
  font-size: 1.8rem;
  margin-bottom: 2rem;
  ${media.medium`
    margin-bottom: 1rem;
    font-size: 1.4rem;
  `}
`;

export const BackgroundDesc = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  position: absolute;
  padding: 0.3rem 2rem;
  bottom: 0;
  right: 2.5rem;
  height: 2.5rem;
  transform-origin: 100% 100%;
  transform: rotate(90deg);
  background-color: ${({ theme }) => theme.colorWhiteTransparent};
`;

export const HeaderLogo = styled(Logo)`
  font-size: 6.6rem;
  &:before {
    width: 9rem;
    height: 9rem;
    ${({ theme }) => `
      background-image: linear-gradient(to right bottom, ${theme.colorGreyLight6}, ${theme.colorGreyDark6});
    `}
  }
  ${media.medium`
    font-size: 3.3rem;
    &:before {
      width: 4.5rem;
      height: 4.5rem;
    }
  `}
`;
