import React from "react";
import Header from "./Header/Header";
import Section from "../Section/Section";
import { items, users } from "./fakedata";
import styled from "styled-components";
const Dashboard = () => (
  <main>
    <Header />
    <Main>
      <Section items={items} title="Ostatnio dodane" />
      <Section users={users} title="Najlepsi sprzedawcy" />
    </Main>
  </main>
);

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: fit-content;
  margin: auto;
`;
export default Dashboard;
