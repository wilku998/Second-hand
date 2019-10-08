import React, { FunctionComponent } from "react";
import styled from "styled-components";
import ReactSVG from "react-svg";
import parseDate from "../../functions/parseDate";

const Date = ({ date }: { date: string | number }) => (
  <StyledDate>
    <DateIcon src="/svg/calendar.svg" />
    {parseDate(date)}
  </StyledDate>
);

const StyledDate = styled.div`
  display: flex;
  align-items: center;
`;

const DateIcon = styled(ReactSVG)`
  position: relative;
  height: 100%;
  width: 1.2rem;
  margin-right: 0.5rem;

  & svg {
    width: 1.2rem;
    height: 1.2rem;
  }
`;

export default Date;
