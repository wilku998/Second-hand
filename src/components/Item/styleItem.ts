import styled from "styled-components";
import { IProps } from "./Item";
import { FunctionComponent } from "react";
import InvisibleButton from "../Abstracts/InvisibleButton";

export default (Item: FunctionComponent<IProps>) => styled(Item)`
  height: 35rem;
  ${({ item, theme }) => `
    border: ${theme.lightBorder2};
    background: url(${item.image}) center/cover no-repeat;
    `}
  position: relative;
`;

export const ItemDescription = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  color: white;
  padding: 0.5rem 1rem;
  & > span {
    &:last-child {
      margin-left: 2rem;
    }
  }
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > h3 {
      font-size: inherit;
      font-weight: 400;
    }
  }
`;

export const LikeButton = styled(InvisibleButton)`
  border-radius: 50%;
  width: 1.6rem;
  height: 1.6rem;
  & > div > div > svg {
    fill: white;
    width: 100%;
    height: 100%;
    &:hover {
      cursor: pointer;
      fill: ${({ theme }) => `${theme.colorGreyLight5}`};
    }
  }
`;
