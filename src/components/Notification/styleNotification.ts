import styled from "styled-components";

export const NotificationInfo = styled.div<{ infoColor: string }>`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  ${({ infoColor }) => `
    color: ${infoColor};
    fill: ${infoColor};
  `}
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  line-height: 1.4;
`;

export const Avatar = styled.img`
  border-radius: 50%;
  width: 3.7rem;
  height: 3.7rem;
  margin-right: 1rem;
`;

export const Text = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: calc(1.2rem * 1.4 * 2);
  & > a {
    display: inline;
  }
`;

export const InterlocutorName = styled.span`
  margin-left: 1rem;
  text-align: right;
`;

export const Content = styled.div`
  flex: 1;
`;
