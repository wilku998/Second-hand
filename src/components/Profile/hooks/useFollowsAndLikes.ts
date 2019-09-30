import IUser, { IProfile } from "../../../interfaces/IUser";
import { useEffect, useState } from "react";
import { getFollowsAndLikes } from "../../../API/users";
import IItem from "../../../interfaces/IItem";

export default (user: IUser) => {
  const [isFetching, setIsFetching] = useState(false);
  const [likedItems, setLikedItems]: [IItem[], any] = useState([]);
  const [follows, setFollows]: [IProfile[], any] = useState([]);
  const [followedBy, setFollowedBy]: [IProfile[], any] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        setIsFetching(true);
        const {
          likedItems: fetchedLikedItems,
          follows: fetchedFollows,
          followedBy: fetchedFollowedBy
        } = await getFollowsAndLikes(user._id);

        setLikedItems(fetchedLikedItems);
        setFollows(fetchedFollows);
        setFollowedBy(fetchedFollowedBy);
        setIsFetching(false);
      };
      fetchData();
    }
  }, [user]);

  return {likedItems, follows, followedBy, isFetching, setIsFetching}
};
