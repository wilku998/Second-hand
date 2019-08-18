import { ChangeEvent, useState } from "react";

export default (sortByOptions: string[]) => {
    const [sortBy, setSortBy] = useState(sortByOptions[0]);

    const onSortByChange = (e: ChangeEvent<HTMLSelectElement>) => {
      setSortBy(e.target.value);
    };

    return {sortBy, onSortByChange}
}