import styled from "styled-components";
import reactModalStyles from "../../styles/reactModalStyles";
import ReactSVG from "react-svg";

export default {
  overlay: {
    ...reactModalStyles.overlay,
    backgroundColor: "rgba(0,0,0,.7)"
  },
  content: {
    ...reactModalStyles.content,
    border: "none",
    background: "none"
  }
};
export const Content = styled.div`
  width: 80vw;
  height: 90vh;
  display: grid;
  grid-template-columns: 5rem 1fr 5rem;
  grid-template-rows: 5rem 1fr 5rem;
`;

export const Image = styled.img`
  border-radius: 0.3rem;
  box-shadow: 0 2rem 4rem rgba(0, 0, 0, 0.2);
  grid-row: 2/3;
  grid-column: 2/3;
`;

export const MoveButtonContainer = styled.div`
  grid-row: 1/4;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ButtonsContainer = styled.div`
  grid-column: 2/3;
  grid-row: 1/2;
  display: flex;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  color: white;
  padding: 1rem 0;
  line-height: 1;
`;

export const PositionContainer = styled.div`
  grid-row: 3/4;
  grid-column: 2/3;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Circle = styled.div<{ isActive: boolean }>`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  &:not(:last-child) {
    margin-right: 2rem;
  }
  ${({ theme, isActive }) => `
    border: ${theme.lightBorder};
    background-color: ${isActive ? theme.colorGreyLight1 : "none"};
  `}
`;

export const MoveIcon = styled(ReactSVG)<{isright?: string}>`
  fill: white;
  width: 2rem;
  ${({isright}) => `
    transform: rotate(${isright ? '180deg' : '0deg'});
  `}
`;

export const CloseIcon = styled(ReactSVG)`
  fill: white;
  width: 1.5rem;
`;


