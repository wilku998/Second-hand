import { FunctionComponent } from "react";
import styled from "styled-components";
import { IProps } from "./Profile";
import Button_2 from "../Abstracts/Button_2";

export default (Profile: FunctionComponent<IProps>) => styled(Profile)`
  display: flex;
  justify-content: center;
  margin-top: 4rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  ${({ theme }) => `
      width: ${theme.rowWidth};
    `}
`;

export const Avatar = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const AvatarContainer = styled.div`
  position: relative;
  width: 20rem;
`;

export const UserLabel = styled.div`
  width: 100%;
  display: flex;
  padding-bottom: 2rem;
  ${({ theme }) => `
    border-bottom: ${theme.lightBorder2};
  `}
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
`;

export const Name = styled.h1`
  font-weight: 400;
  font-size: 3rem;
`;

export const Button = styled(Button_2)`
  margin-top: 1rem;
`;
