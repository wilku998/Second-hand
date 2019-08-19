import { FunctionComponent } from "react";
import styled from "styled-components";
import { IProps } from "./Item";
import Button_2 from "../Abstracts/Button_2";
import { Link } from "react-router-dom";
import InvisibleButton from "../Abstracts/InvisibleButton";

export default (Item: FunctionComponent<IProps>) => styled(Item)`
  display: flex;
  margin: auto;
  ${({ theme }) => `
    background-color: ${theme.colorGreyLight1};
    border: ${theme.lightBorder2};
    & > * {
      padding: 2rem;
      &:not(:last-child){
      border-right: ${theme.lightBorder};
      }
    }
  `}
`;

export const Container = styled.section`
  padding: 4rem;
  display: flex;
  ${({ theme }) => `
      min-height: calc(100vh - ${theme.navigationHeight});
  `}
`;

export const MainImage = styled.img`
  position: absolute;
  top: 0%;
  left: 0;
  z-index: 10;
`;

export const MainImageContainer = styled.div`
  position: relative;
  display: grid;
  grid-auto-columns: max-content;
`;

export const Content = styled.div`
  min-height: 60rem;
  width: 35rem;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  font-weight: 400;
  line-height: 1.2;
  text-transform: uppercase;
  display: flex;
  align-items: center;
`;

export const Description = styled.span`
  padding-top: 1rem;
  ${({ theme }) => `
    border-top: ${theme.lightBorder};
  `}
`;

export const ItemInfo = styled(Description)`
  margin-top: 1rem;
  line-height: 1;
  display: flex;
  flex-direction: column;
  & > span {
    margin-bottom: 1rem;
  }
`;

export const ButtonMessage = styled(Button_2)`
  margin-top: 2rem;
`;

export const ButtonSeeAll = styled(Button_2)`
  margin-top: auto;
`;

export const ButtonSeeWhoLiked = styled(Button_2)`
  font-size: 1.2rem;
  align-self: flex-start;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 2rem;
`;

export const Image = styled.div`
  position: relative;
  padding-top: 100%;
  border-radius: 0.3rem;
  overflow: hidden;
  & > img {
    top: 0;
    left: 0;
    position: absolute;
  }
`;

export const Info = styled.span`
  display: block;
  text-align: center;
  font-size: 1.2rem;
  padding-top: 2rem;
  margin-top: 2rem;
  ${({ theme }) => `
    border-top: ${theme.lightBorder};
  `}
`;

export const Seller = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  width: 30rem;
`;

export const SellerProfile = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
`;

export const SellerOtherItems = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const LikeButton = styled(InvisibleButton)`
  position: relative;
  padding: 1rem;
  margin-right: 1rem;
  &:hover {
    cursor: pointer;
  }
  & > div > div > svg {
    position: absolute;
    top: 50%;
    left: 50;
    transform: translate(-50%, -50%);
    width: 1.6rem;
    height: 1.6rem;
    fill: ${({ theme }) => `${theme.colorGreyDark1}`};
  }
`;

export const ImageButton = styled(InvisibleButton)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 100;
`;