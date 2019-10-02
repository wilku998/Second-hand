import styled from "styled-components";
import { Link } from "react-router-dom";
import { FunctionComponent } from "react";
import { IProps } from "./ItemSmall";

export default (ItemSmall: FunctionComponent<IProps>) => styled(ItemSmall)`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const Image = styled.img`
  height: 30rem;
  border-radius: 0.1rem;
  ${({ theme }) => `
    box-shadow: ${theme.lightShadow2};
  `}
`;

export const ItemDescription = styled.div`
  padding: 0.5rem 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  & > span {
    font-size: 1.2rem;
  }
`;

export const Title = styled.h3`
  font-size: inherit;
  text-transform: uppercase;
`;

export const Button = styled.button`
  position: absolute;
  z-index: 10;
  top: 1.5rem;
  right: 1.5rem;
  border-radius: 50%;
  border: none;
  padding: 1.15rem;
  background-color: rgba(255, 255, 255, 0.7);
  &:hover {
    cursor: pointer;
  }
  & svg {
    width: 1.25rem;
    height: 1.25rem;
    fill: ${({ theme }) => `${theme.colorGreyDark1}`};
  }
`;

export const LinkToItem = styled(Link)`
  position: absolute;
  top: 0%;
  left: 0;
  width: 100%;
  height: 100%;
`;
