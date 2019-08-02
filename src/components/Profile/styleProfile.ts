import { FunctionComponent } from "react";
import styled from "styled-components";
import { IProps } from "./Profile";
import AvatarTemplate from "../Abstracts/Avatar";
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
    ${({theme}) => `
        background-color: ${theme.colorGreyLight1};
        padding: 4rem;
        width: calc(${theme.rowWidth} + 8rem);
    `}
`;

export const Avatar = styled(AvatarTemplate)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const AvatarContainer = styled.div`
  position: relative;
  display: grid;
  grid-auto-columns: max-content;
`;

export const UserLabel = styled.div`
  display: flex;
  margin-bottom: 4rem;
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
`