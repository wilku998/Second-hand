import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "./Header/Header";
import ItemsSection from "../Section/ItemsSection/ItemsSection";
import UsersSection from "../Section/UsersSection/UsersSection";
import { getItemsRequest } from "../../API/items";
import { getUsersRequest } from "../../API/users";

const Dashboard = () => {
  const [items, setItems] = useState(undefined);
  const [users, setUsers] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const items = await getItemsRequest();
      const users = await getUsersRequest();
      if(items){
        setItems(items)
      }
      if(users){
        setUsers(users)
      }
    }
    fetchData();
  }, []);
  console.log({items, users})

  return (
    <main>
      <Header />
      <Main>
        {items && <ItemsSection title="Ostatnio dodane" items={items} />}
        {users && <UsersSection title="Najlepsi sprzedawcy" users={users} />}
      </Main>
    </main>
  );
};
const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: fit-content;
  margin: auto;
`;
export default Dashboard;
