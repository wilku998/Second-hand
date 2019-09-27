import styled from "styled-components";
import { Form } from "../Abstracts/Form";
import ReactSVG from "react-svg";
import Loader from "../Abstracts/Loader";
import { IProps } from "./ComponentTemplate";
import { Link } from "react-router-dom";
import media from "../../styles/media";
import Button_2 from "../Abstracts/Button_2";

export default (CreateItem: FunctionComponent<IProps>) => styled(CreateItem)`
  display: flex;
  margin: auto;
  width: 70rem;
  ${({ theme }) => `
    background-color: ${theme.colorGreyLight1};
    border: ${theme.lightBorder2};
    box-shadow: ${theme.lightShadow};
    & > * {
      padding: 2rem;
      &:not(:last-child){
      border-right: ${theme.lightBorder};
      }
    }
  `}
  ${media.medium`
    width: 100%;
  `}
  ${media.small`
    margin-top: 2rem;
    flex-direction: column;
    align-items: stretch;
    & > * {
      border-right: none !important;
    }
  `}
`;

export const Optional = styled.span`
  font-size: 1.2rem;
`;

export const ItemForm = styled(Form)`
  flex: 1;
`;

export const AddPhotosContainer = styled.div`
  flex: 0 1 35rem;

  ${media.small`
    flex: 0;

  `}
`;

export const PhotoButton = styled.div`
  padding-top: 100%;
  position: relative;
  border-radius: 0.3rem;

  &:hover {
    cursor: pointer;
  }

  ${({ theme }) => `
    border: ${theme.lightBorder2};
  `}
  & > input {
    position: absolute;
    top: 0;
    left: 0%;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;

export const CameraIcon = styled(ReactSVG)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  opacity: 0.5;
`;

export const ErrorMessage = styled.span`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colorRed};
`;

export const ImagesErrorMessage = styled(ErrorMessage)`
  margin-top: 1rem;
  display: block;
  text-align: center;
`;

export const RemoveImageButton = styled.button`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0.5rem;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  font-size: 1.2rem;
`;

export const ImageLoader = styled(Loader)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const CreatedAt = styled.span`
  font-size: 1.2rem;
  margin-bottom: 0.5rem !important;
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

export const SellerProfile = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
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

export const Button = styled(Button_2)`
  &:first-of-type {
    margin-top: auto;
  }
`;

export const AddLoader = styled(Loader)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
