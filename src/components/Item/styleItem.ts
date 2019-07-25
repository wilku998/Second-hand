import { FunctionComponent } from "react";
import styled from "styled-components";
import { IProps } from "./Item";
import Button_2 from "../Abstracts/Button_2";
import { Link } from "react-router-dom";

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

export const FakeImage = styled.img.attrs(() => ({
  src: "/images/square.png"
}))`
  opacity: 0;
  width: initial;
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
`;

export const Description = styled.div`
  margin-top: .5rem;
  line-height: 1;
  & > span {
    &:not(:last-of-type) {
      margin-right: 2rem;
    }
  }
`;

export const ButtonMessage = styled(Button_2)`
  margin-top: 2rem;
`;

export const ButtonSeeAll = styled(Button_2)`
  margin-top: auto;
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
`;

export const SellerOtherItems = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const OtherItemDescription = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  font-size: 1.2rem;
  background-color: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 0.2rem 0.5rem;
`;
