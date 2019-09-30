import React, { useState, useEffect, ChangeEvent } from "react";
import { inject, observer } from "mobx-react";
import Avatar from "../Abstracts/Avatar";
import { Label, FormInput } from "../Abstracts/Form";
import style, {
  Optional,
  ItemForm,
  PhotoButton,
  AddPhotosContainer,
  ErrorMessage,
  RemoveImageButton,
  ImagesErrorMessage,
  CameraIcon,
  Image,
  Button,
  GridContainer,
} from "./styleCreateItem";
import { isSelectSize, onCategory_SizeChange } from "./functions";
import validation from "./validaton";
import { getImageBase64Request } from "../../API/images";
import { history } from "../../app";
import IItem from "../../interfaces/IItem";
import { Iimages, IForm, IItemKeys } from "./interfaces";
import Date from "../Abstracts/Date";
import { IMinifedUser } from "../../interfaces/IUser";
import { ItemAbout, SellerProfile } from "../Item/styleItem";
import Loader from "../Abstracts/Loader";
import Container from "../Abstracts/Container";

export interface IProps {
  className?: string;
  userStore?: any;
  initialForm: IForm;
  initialImages: Iimages["images"];
  onSubmitRequest: (item: IItem, images: Iimages["images"]) => void;
  isEdit: boolean;
  onRemoveItemClick?: () => void;
  createdAt?: string;
  likedBy?: IMinifedUser[];
}

const ComponentTemplate = ({
  className,
  userStore,
  initialForm,
  initialImages,
  onSubmitRequest,
  isEdit,
  onRemoveItemClick,
  createdAt,
  likedBy
}: IProps) => {
  const user = userStore.getUser;
  const [itemForm, setItemForm] = useState(initialForm);
  const [images, setImages] = useState(initialImages);
  const [resettingFileInput, setResettingFileInput] = useState(false);
  const [error, setError] = useState("");
  const [imagesError, setImagesError] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);

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
      try {
        formData.append("itemImage", image, image.name);
        setImageLoading(true);
        const base64 = await getImageBase64Request(formData);
        setImages([
          ...images,
          { image: `data:image/jpeg;base64, ${base64}`, name: image.name }
        ]);
        setImagesError("");
      } catch (e) {
        setImagesError("Zdjęcie nie może być większe niż 10mb");
      }
    } else {
      setImagesError("Nie możesz dodać tego samego zdjęcia dwa razy");
    }
    setResettingFileInput(true);
    setImageLoading(false);
  };

  const removeImage = (e: any) => {
    const name = e.target.name;
    setImages(images.filter(e => e.name !== name));
  };

  const onFormChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const property: IItemKeys["keys"] = e.target.name;
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

  const onSubmit = async (e: any) => {
    e.preventDefault();
    let isValid = true;
    let errorMessage = "";

    [...inputs, description].forEach(e => {
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
      setAddLoading(true);
      const item: any = {};
      [...inputs, ...selectors, description].forEach(e => {
        if (e.value) {
          item[e.name] =
            e.name === "size" && category.value === "buty"
              ? `${e.value}EU`
              : e.value;
        }
      });
      await onSubmitRequest(item, images);
      history.push("/");
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
      {addLoading ? (
        <Loader size={6} />
      ) : (
        <div className={className}>
          <AddPhotosContainer>
            <SellerProfile to={`/users/myProfile`}>
              <Avatar size="big" src={user.avatar} />
              <span>{user.name}</span>
            </SellerProfile>
            {imagesError !== "" && (
              <ImagesErrorMessage>{imagesError}</ImagesErrorMessage>
            )}
            <GridContainer>
              {images.map(image => (
                <Image key={image.image}>
                  <img src={image.image} />
                  <RemoveImageButton name={image.name} onClick={removeImage}>
                    Usuń
                  </RemoveImageButton>
                </Image>
              ))}
              {images.length < 3 && !resettingFileInput && (
                <PhotoButton>
                  {imageLoading ? (
                    <Loader size={4} />
                  ) : (
                    <CameraIcon src="/svg/camera.svg" />
                  )}
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={imageUpload}
                    disabled={imageLoading}
                  />
                </PhotoButton>
              )}
            </GridContainer>
          </AddPhotosContainer>
          <ItemForm onSubmit={onSubmit}>
            {isEdit && (
              <ItemAbout>
                <li>
                  <Date date={createdAt} />
                </li>
                <li>
                  Polubione przez {likedBy.length}{" "}
                  {likedBy.length === 1 ? "osobę" : "osób"}
                </li>
              </ItemAbout>
            )}
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
                  {e.label} {e.name === "size" ? "EU" : ""}
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
            <Button disabled={imageLoading}>
              {isEdit ? "Edytuj" : "Dodaj"} przedmiot
            </Button>
            {isEdit && (
              <Button type="button" onClick={onRemoveItemClick}>
                Usuń przedmiot
              </Button>
            )}
          </ItemForm>
        </div>
      )}
    </Container>
  );
};

export default style(inject("userStore")(observer(ComponentTemplate)));
