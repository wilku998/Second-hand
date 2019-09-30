import React, { useState, useEffect } from "react";
import Header from "./Header/Header";
import ItemsSection from "../Section/ItemsSection/ItemsSection";
import UsersSection from "../Section/UsersSection/UsersSection";
import { getItemsRequest } from "../../API/items";
import { getMostPopularUsersRequest } from "../../API/users";
import Container from "../Abstracts/Container";

const Dashboard = () => {
  const [items, setItems] = useState(undefined);
  const [users, setUsers] = useState(undefined);

  useEffect(() => {
    const fetchItemsAndUsers = async () => {
      const items = await getItemsRequest("?limit=8&sortBy=_id&order=-1");
      const users = await getMostPopularUsersRequest();
      if (items) {
        setItems(items);
      }
      if (users) {
        setUsers(users);
      }
    };
    fetchItemsAndUsers();
  }, []);

  return (
    <>
      <Header />
      <Container>
        {items && <ItemsSection title="Ostatnio dodane" items={items} />}
        {users && <UsersSection title="Najlepsi sprzedawcy" users={users} />}
      </Container>
    </>
  );
};

export default Dashboard;
