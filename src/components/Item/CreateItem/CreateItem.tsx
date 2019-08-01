import React, { useState, useEffect, ChangeEvent } from "react";
import ReactSVG from "react-svg";
import { inject, observer } from "mobx-react";
import style, {
  Container,
  Image,
  SellerProfile,
  Info,
  GridContainer,
  ButtonSeeAll,
  OtherItemDescription
} from "../styleItem";
import Avatar from "../../Abstracts/Avatar";
import { Label, FormInput } from "../../Abstracts/Form";
import {
  Optional,
  ItemForm,
  PhotoButton,
  AddPhotosContainer,
  ErrorMessage
} from "./styleCreateItem";
import initialState from "./initialState";
import { isSelectSize, onCategory_SizeChange } from "./functions";
import validation from "./validaton";
import { getImageBase64Request } from "../../../API/images";
import InvisibleButton from "../../Abstracts/InvisibleButton";
import { addItemRequest } from "../../../API/items";

export interface IProps {
  className?: string;
  userStore?: any;
}

const CreateItem = ({ className, userStore }: IProps) => {
  const user = userStore.getUser;
  const [itemForm, setItemForm] = useState(initialState);
  const [images, setImages] = useState([]);
  const [resettingFileInput, setResettingFileInput] = useState(false);
  const [error, setError] = useState("");

  const {
    price,
    size,
    category,
    brand,
    itemModel,
    description,
    condition,
    gender
  } = itemForm;

  if (isSelectSize(category.value)) {
    var inputs = [price, brand, itemModel];
    var selectors = [category, condition, gender, size];
  } else {
    var inputs = [size, price, brand, itemModel];
    var selectors = [category, condition, gender];
  }

  const imageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    const image = e.target.files[0];
    if (images.findIndex(e => e.name === image.name) === -1) {
      formData.append("itemImage", image, image.name);
      const base64 = await getImageBase64Request(formData);
      setImages([
        ...images,
        { image: `data:image/jpeg;base64, ${base64}`, name: image.name }
      ]);
    }
    setResettingFileInput(true);
  };

  const removeImage = (e: any) => {
    const image = e.target.name;
    setImages(images.filter(e => e.image !== image));
  };

  const onFormChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const property:
      | "price"
      | "size"
      | "category"
      | "brand"
      | "itemModel"
      | "description" = e.target.name;
    const value = e.target.value;
    setItemForm({
      ...itemForm,
      size:
        property === "category"
          ? {
              ...size,
              ...onCategory_SizeChange(value, category.value, size.value)
            }
          : size,
      [property]: {
        ...itemForm[property],
        value,
        valid: validation(
          value,
          property,
          property === "size" ? category.value : undefined
        )
      }
    });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    let isValid = true;
    let errorMessage = "";

    inputs.forEach(e => {
      if (!e.valid) {
        isValid = false;
        errorMessage = e.errorMessage;
      }
    });
    if (images.length === 0) {
      errorMessage = "Przedmiot musi posiadać conajmniej jedno zdjęcie";
      isValid = false;
    }
    if (isValid) {
      console.log("success");
      const item: any = {};
      [...inputs, ...selectors].forEach(e => {
        if (e.value) {
          item[e.name] = e.value;
        }
      });
      addItemRequest(item, images.map(e => e.image.replace('data:image/jpeg;base64, ', "")));
    } else {
      setError(errorMessage);
    }
  };

  useEffect(() => {
    if (resettingFileInput) {
      setResettingFileInput(false);
    }
  }, [resettingFileInput]);

  return (
    <Container>
      <div className={className}>
        <AddPhotosContainer>
          <SellerProfile>
            <Avatar size="big" src={user.avatar} />
            <span>{user.name}</span>
          </SellerProfile>
          <Info>Dodaj zdjęcia przedmiotu</Info>
          <GridContainer>
            {images.map(image => (
              <Image key={image.image}>
                <img src={image.image} />
                <OtherItemDescription>
                  <InvisibleButton name={image.image} onClick={removeImage}>
                    Usuń
                  </InvisibleButton>
                </OtherItemDescription>
              </Image>
            ))}
            {images.length < 3 && !resettingFileInput && (
              <PhotoButton>
                <ReactSVG src="/svg/camera.svg" />
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={imageUpload}
                />
              </PhotoButton>
            )}
          </GridContainer>
        </AddPhotosContainer>
        <ItemForm onSubmit={onSubmit}>
          {selectors.map(e => (
            <Label key={e.name}>
              {e.label}
              <select name={e.name} value={e.value} onChange={onFormChange}>
                {e.options.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Label>
          ))}
          {inputs.map(e => (
            <Label key={e.name} isColumn={e.isOptional}>
              <span>
                {e.label} {e.name === "size" && "EU"}{" "}
                {e.isOptional && <Optional>*niewymagane</Optional>}
              </span>
              <FormInput
                valid={e.valid}
                type={e.type}
                name={e.name}
                onChange={onFormChange}
                value={e.value}
              />
            </Label>
          ))}
          <Label isColumn={true}>
            <span>
              Opis <Optional>*niewymagane</Optional>
            </span>
            <FormInput
              as="textarea"
              rows={4}
              name="description"
              value={description.value}
              valid={description.valid}
              onChange={onFormChange}
            />
          </Label>
          {error !== "" && <ErrorMessage>{error}</ErrorMessage>}
          <ButtonSeeAll>Dodaj przedmiot</ButtonSeeAll>
        </ItemForm>
      </div>
    </Container>
  );
};

export default style(inject("userStore")(observer(CreateItem)));
