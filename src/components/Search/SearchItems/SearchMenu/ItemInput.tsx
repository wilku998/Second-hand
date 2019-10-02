import React, { Fragment, ChangeEvent, forwardRef } from "react";
import {
  Label,
  Input,
  SearchMenuButton,
  InputContainer,
  ButtonCleanFilter,
  Item
} from "./styleSearchMenu";
import { IInput } from "./interfaces";

interface IProps {
  item: IInput;
  onSearchMenuButtonClick: (e: any) => void;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onPriceChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onCleanFiltersClick: (e: any) => void;
  closeFilters: () => void;
}

const ItemInput = forwardRef(
  (
    {
      item,
      onSearchMenuButtonClick,
      onInputChange,
      onCleanFiltersClick,
      onPriceChange,
      closeFilters
    }: IProps,
    ref
  ) => {
    const { name, isVisible, label, type, value, placeholder } = item;
    return (
      <Item ref={ref}>
        <SearchMenuButton name={name} onClick={onSearchMenuButtonClick}>
          {label}
        </SearchMenuButton>
        {isVisible && (
          <InputContainer>
            {name === "price" ? (
              <Fragment>
                {["priceFrom", "priceTo"].map(
                  (key: "priceFrom" | "priceTo") => (
                    <Label key={item[key].label}>
                      <span>{item[key].label}</span>
                      <Input
                        type={type}
                        onChange={onPriceChange}
                        min={
                          key === "priceTo" && !isNaN(item.priceFrom.value)
                            ? item.priceFrom.value
                            : 0
                        }
                        max={
                          key === "priceFrom" && !isNaN(item.priceTo.value)
                            ? item.priceTo.value
                            : 9999
                        }
                        name={key}
                        value={item[key].value}
                      />
                    </Label>
                  )
                )}
              </Fragment>
            ) : (
              <Input
                type={type}
                onChange={onInputChange}
                name={name}
                value={value}
                placeholder={placeholder}
              />
            )}
            <ButtonCleanFilter name={name} onClick={onCleanFiltersClick}>
              Usuń filtr
            </ButtonCleanFilter>
            <ButtonCleanFilter onClick={closeFilters}>
              Zamknij okienko
            </ButtonCleanFilter>
          </InputContainer>
        )}
      </Item>
    );
  }
);

export default ItemInput;
