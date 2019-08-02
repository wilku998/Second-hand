import React, { Fragment } from "react";
import { Redirect } from "react-router";
import formTemplate from "./formTemplate";
import ComponentTemplate from "./ComponentTemplate";
import IItem from "../../../interfaces/Item";
import { inject, observer } from "mobx-react";
import { Iimages } from "./interfaces";

interface IProps {
  userStore: any;
  match: any;
}
// http://localhost:3000/items/edit/5d42a656d691910150d57df0
const EditItem = ({ userStore, match }: IProps) => {
  const ownItems = userStore.getOwnItems;
  const editItemID = match.params.id;
  const item = ownItems.find((e: IItem) => e._id === editItemID);
  if (item) {
    var itemEditForm: any = { ...formTemplate };
    Object.keys(item).map(key => {
      if (key !== "images") {
        itemEditForm[key] = {
          ...itemEditForm[key],
          value: item[key],
          valid: true
        };
      }
    });

    var initialImages = item.images.map((image: string) => ({
      image,
      name: image
    }));
  }

  const onSubmitRequest = async (
    updatedItem: IItem,
    images: Iimages["images"]
  ) => {
    const update: IItem = {};
    Object.keys(updatedItem).map(
      (
        key:
          | "price"
          | "size"
          | "category"
          | "brand"
          | "itemModel"
          | "description"
          | "condition"
          | "gender"
      ) => {
        if (updatedItem[key] !== item[key]) {
          update[key] = updatedItem[key]
        }
      }
    );
    console.log(update)
  };

  return (
    <Fragment>
      {item ? (
        <ComponentTemplate
          initialImages={initialImages}
          initialForm={itemEditForm}
          onSubmitRequest={onSubmitRequest}
        />
      ) : (
        <Redirect to="/" />
      )}
    </Fragment>
  );
};

export default inject("userStore")(observer(EditItem));
