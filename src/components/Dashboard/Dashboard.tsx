import React, { useState, useEffect } from "react";
import Header from "./Header/Header";
import ItemsSection from "../Section/ItemsSection/ItemsSection";
import UsersSection from "../Section/UsersSection/UsersSection";
import { getItemsRequest } from "../../API/items";
import { getMostPopularUsersRequest } from "../../API/users";
import loadingCompontent from "../../HOC/loadingCompontent";

const Items = loadingCompontent(({ items, users }) => {
  return (
    <>
      <ItemsSection title="Ostatnio dodane" items={items} />
      <UsersSection title="Najlepsi sprzedawcy" users={users} />
    </>
  );
});

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchItemsAndUsers = async () => {
      setIsFetching(true);
      const items = await getItemsRequest("?limit=8&sortBy=_id&order=-1");
      const users = await getMostPopularUsersRequest();
      if (items) {
        setItems(items);
      }
      if (users) {
        setUsers(users);
      }
      setIsFetching(false);
    };
    fetchItemsAndUsers();
  }, []);

  return (
    <>
      <Header />
      <Items items={items} users={users} isFetching={isFetching} shouldRender={true} />
    </>
  );
};

export default Dashboard;
