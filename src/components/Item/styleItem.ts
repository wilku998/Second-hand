import { FunctionComponent } from "react";
import styled from "styled-components";
import { IProps } from "./Item";
import Button_2 from "../Abstracts/Button_2";
import InvisibleButton from "../Abstracts/InvisibleButton";

export default (Item: FunctionComponent<IProps>) => styled(Item)`
  display: grid;
  align-items: start;
  grid-template-columns: calc(100% - 35rem) 35rem;
  ${({ theme }) => `
    width: ${theme.rowWidth};
  `}
`;

export const Content = styled.div`
  padding: 2rem;
  margin-left: 2rem;
  display: flex;
  flex-direction: column;
  grid-column: 2/3;
  ${({ theme }) => `
    background-color: ${theme.colorGreyLight1};
    border: ${theme.lightBorder2};
    box-shadow: ${theme.lightShadow};
  `}
`;


export const ItemInfo = styled.ul`
  margin-top: 1rem;
  padding-top: 1rem;
  list-style: none;
  ${({ theme }) => `
    border-top: ${theme.lightBorder};
  `}
`;

export const ItemAbout = styled(ItemInfo)`
  font-size: 1.2rem;
`;

export const Button = styled(Button_2)`
  &:first-of-type {
    margin-top: 2rem;
  }
  &:not(:first-of-type) {
    margin-top: 1rem;
  }
`;

export const ImagesGrid = styled.div`
  grid-column: 1/2;
  display: grid;
  grid-auto-rows: 1fr;
  grid-auto-columns: 1fr;
  height: 60rem;
  grid-gap: 0.2rem;
  margin-bottom: 4rem;
  ${({ theme }) => `
    box-shadow: ${theme.lightShadow};
  `}
`;

export const ImageButton = styled(InvisibleButton)`
  position: absolute;
  top: 0%;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

export const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 0.3rem;
`;

export const ImageContainer = styled.div<{
  imagesQuantity?: number;
  imagePosition: number;
}>`
  position: relative;
  ${({ imagesQuantity, imagePosition }) => `
    ${
      imagePosition === 0
        ? `
      grid-row: 1/3;
      grid-column: 1/2;
    `
        : ""
    }
    ${
      imagePosition === 1
        ? `
    grid-column: 2/3;
    grid-row: ${imagesQuantity > 2 ? "1/2" : "1/3"};
    `
        : ""
    }
    ${
      imagePosition === 2
        ? `
    grid-column: 2/3;
    grid-row: 2/3;
    `
        : ""
    }
  `}
`;
