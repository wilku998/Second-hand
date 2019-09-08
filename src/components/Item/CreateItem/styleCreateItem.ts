import styled from "styled-components";
import { Form } from "../../Abstracts/Form";
import ReactSVG from "react-svg";
import Loader from "../../Abstracts/Loader";

export const Optional = styled.span`
  font-size: 1.2rem;
`;

export const ItemForm = styled(Form)`
  width: 35rem;
`;

export const AddPhotosContainer = styled.div`
  width: 35rem;
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
