import React, { Fragment } from "react";
import { Redirect } from "react-router";
import formTemplate from "./formTemplate";
import ComponentTemplate from "./ComponentTemplate";
import IItem from "../../../interfaces/Item";
import { inject, observer } from "mobx-react";
import { Iimages, IUpdate, IItemKeys } from "./interfaces";
import { editItemRequest } from "../../../API/items";

interface IProps {
  userStore: any;
  match: any;
}
// http://localhost:3000/items/edit/5d4468f8c1becb261cbcd95f
const EditItem = ({ userStore, match }: IProps) => {
  const ownItems = userStore.getOwnItems;
  const editItemID = match.params.id;
  const item: IItem = ownItems.find((e: IItem) => e._id === editItemID);
  if (item) {
    var itemEditForm: any = { ...formTemplate };
    Object.keys(item).map((key: IItemKeys["keys"] | "images") => {
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

  const findDifferenceInImageArrays = (
    firstArr: Iimages["images"],
    secondArr: Iimages["images"]
  ) => {
    const diff: Iimages["images"] = [];
    firstArr.forEach(image => {
      if (
        secondArr.findIndex(
          (e: { name: string; image: string }) => e.name === image.name
        ) === -1
      ) {
        diff.push(image);
      }
    });
    return diff.map(e => e.image);
  };

  const onSubmitRequest = async (
    updatedItem: IItem,
    updatedImages: Iimages["images"]
  ) => {
    const update: IUpdate = {};
    const imagesToAdd = findDifferenceInImageArrays(
      updatedImages,
      initialImages
    ).map(e => e.replace("data:image/jpeg;base64, ", ""));
    const imagesToRemove = findDifferenceInImageArrays(
      initialImages,
      updatedImages
    );
    Object.keys(updatedItem).forEach((key: IItemKeys["keys"]) => {
      if (updatedItem[key] !== item[key]) {
        update[key] = updatedItem[key];
      }
    });
    await editItemRequest(
      item._id,
      update,
      item.images,
      imagesToAdd,
      imagesToRemove
    );
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
