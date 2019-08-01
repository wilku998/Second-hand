import styled from "styled-components";
import { IProps } from "./ItemSmall";
import { FunctionComponent } from "react";
import InvisibleButton from "../../../Abstracts/InvisibleButton";

export default (ItemSmall: FunctionComponent<IProps>) => styled(ItemSmall)`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const Image = styled.img`
  height: 30rem;
`;

export const ItemDescription = styled.div`
  padding: 0.5rem 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const Title = styled.h3`
  font-size: inherit;
  text-transform: uppercase;
`;

export const LikeButton = styled(InvisibleButton)`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  border-radius: 50%;
  padding: .4rem;
  background-color: ${({ theme }) => `${theme.colorGreyLight1}`};
  &:hover {
    cursor: pointer;
  }
  & > div > div {
    width: 1.2rem;
    height: 1.2rem;
    & > svg {
      width: 100%;
      height: 100%;
      fill: ${({ theme }) => `${theme.colorGreyDark1}`};
    }
  }
`;
