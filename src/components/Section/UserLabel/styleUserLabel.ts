import styled from "styled-components";
import { FunctionComponent } from "react";
import { IUserLabelProps } from "./UserLabel";
import InvisibleButton from "../../Abstracts/InvisibleButton";

export const Avatar = styled.img`
  object-fit: cover;
  object-position: center;
  ${({ size }) => `
    ${
      size === "big"
        ? `  width: 3rem;
    height: 3rem;`
        : `  width: 2rem;
    height: 2rem;`
    }
  `}

  border-radius: 50%;
  margin-right: 1rem;
`;

export const styleUserLabel = (
  UserLabel: FunctionComponent<IUserLabelProps>
) => styled(UserLabel)`
  display: flex;
  align-items: center;
  padding: 0.7rem 1rem;
  ${({ theme, size }) => `
    background-color: ${theme.colorWhiteTransparent};
    ${size === "big" ?
      `grid-column: 1/5;
      margin-bottom: 2rem;
    ` : `border-bottom: ${theme.lightBorder2};`}
  `}
`;

export const FollowButton = styled(InvisibleButton)`
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

export const Info = styled.span`
  font-size: 1.4rem;
  display: flex;
  align-items: flex-end;
  & > h3 {
    font-size: inherit;
  }
  & > span {
    margin-left: 1.5rem;
  }
`;
