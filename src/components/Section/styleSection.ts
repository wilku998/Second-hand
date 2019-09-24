import styled from "styled-components";
import Button_1 from "../Abstracts/Button_1";
import media from "../../styles/media";

export const StyledUsersSection = styled.div`
  margin-top: 4rem;
  width: ${({ theme }) => theme.rowWidth};
  ${media.big`
    width: 100%;
  `}
`;

export const StyledItemSection = styled.section`
  width: ${({ theme }) => theme.rowWidth};
  ${media.big`
    width: 100%;
  `}
  margin-top: 4rem;
`;

export const UserSection = styled.section`
  width: 100%;
  &:not(:first-of-type) {
    margin-top: 4rem;
  }
`;

export const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 400;
  margin-bottom: 1rem;
`;

export const ItemsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 4rem;
  align-items: flex-start;
  width: 100%;
  ${media.big`
    grid-gap: 2rem;
  `}
  ${media.medium`
    grid-template-columns: repeat(3, 1fr);
  `}

  ${media.medium_2`
    grid-template-columns: repeat(2, 1fr);
  `}
  
  ${media.smallest`
    grid-template-columns: repeat(1,1fr);
  `}
`;

export const Info = styled.span`
  grid-column: 1/5;
  text-align: center;
  display: block;
  font-size: 1.2rem;
`;

export const ButtonShowMore = styled(Button_1)`
  margin-top: 2rem;
  width: 100%;
`;
