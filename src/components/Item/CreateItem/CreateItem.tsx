import React from "react";
import formTemplate from "./formTemplate";
import ComponentTemplate from "./ComponentTemplate";
import { addItemRequest } from "../../../API/items";
import { Iimages } from "./interfaces";
import IItem from '../../../interfaces/IItem';

export default () => {
  const onSubmitRequest = async (item: IItem, images: Iimages["images"]) => {
    await addItemRequest(
      item,
      images.map(e => e.image.replace("data:image/jpeg;base64, ", ""))
    );
  };

  return <ComponentTemplate onSubmitRequest={onSubmitRequest} initialImages={[]} initialForm={formTemplate} />;
};
