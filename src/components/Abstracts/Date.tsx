import React, { FunctionComponent } from "react";
import styled from "styled-components";
import ReactSVG from "react-svg";
import parseDate from "../../functions/parseDate";

const Date = ({ date }: { date: string }) => (
  <StyledDate>
    <DateIcon src="/svg/calendar.svg" />
    {parseDate(date)}
  </StyledDate>
);

const StyledDate = styled.div`
  display: flex;
  margin-bottom: 0.3rem;
`;

const DateIcon = styled(ReactSVG)`
  height: 1.2rem;
  width: 1.2rem;
  margin-right: 0.5rem;
  ${({ theme }) => `
    fill: ${theme.colorGreyDark2};
  `}
`;

export default Date;
