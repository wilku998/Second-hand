import styled from "styled-components";
import { FunctionComponent } from "react";
import { IProps } from "./Header";
import Button_1 from "../../Abstracts/Button_1";

export default (Header: FunctionComponent<IProps>) => styled(Header)`
  padding: 4rem 4rem 8rem 4rem;
  margin-bottom: 8rem;
  display: flex;
  align-items: flex-start;
  position: relative;
`;

export const Button = styled(Button_1)`
  justify-self: start;
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: min-content;
  background-color: ${({theme}) => theme.colorWhiteTransparent};
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
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: 400;
  line-height: 1.2;
  margin: 1rem 0;
`;

export const Description = styled.p`
  font-size: 1.8rem;
  margin-bottom: 2rem;
`;

export const Background = styled.img<{visible: boolean}>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
  ${({ visible }) => `
    opacity: ${visible ? 1 : 0};
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
  background-color: ${({theme}) => theme.colorWhiteTransparent};
`;
