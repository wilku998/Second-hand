import { FunctionComponent } from "react";
import styled from "styled-components";
import Button_2 from "../Abstracts/Button_2";
import media from "../../styles/media";

export const StyledProfile = styled.section`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  ${({ theme }) => `
      width: ${theme.rowWidth};
    `}
  ${media.big`
    width: 100%;
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
  ${({ theme }) => `
    border: ${theme.lightBorder2};
  `}

  ${media.small`
    height: 20rem;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto 2rem auto;
  `}
`;

export const UserLabel = styled.div`
  width: 100%;
  display: flex;
  padding-bottom: 2rem;
  ${({ theme }) => `
    border-bottom: ${theme.lightBorder2};
  `}

  ${media.small`
    flex-direction: column;
  `}
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  ${media.small`
    margin-left: 0;
    text-align: center;
  `}
`;

export const Name = styled.h1`
  font-weight: 400;
  font-size: 3rem;
  line-height: 1.2;
`;

export const DesktopName = styled(Name)`
  margin-bottom: 0.5rem;
  ${media.small`
    display: none;
  `}
`;

export const MobileName = styled(Name)`
  display: none;
  text-align: center;
  margin-bottom: 2rem;
  ${media.small`
    display: block;
  `}
`;

export const Button = styled(Button_2)`
  margin-top: 1rem;
`;
