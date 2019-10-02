import React, { ChangeEvent, forwardRef } from "react";
import {
  SearchMenuButton,
  InputContainer,
  CheckLabel,
  ButtonCleanFilter,
  Item
} from "./styleSearchMenu";
import { ISelector } from "./interfaces";

interface IProps {
  item: ISelector;
  onSelectorChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearchMenuButtonClick: (e: any) => void;
  onCleanFiltersClick: (e: any) => void;
  ref: any;
  closeFilters: () => void;
}

const ItemSelector = forwardRef(
  (
    {
      item,
      onSelectorChange,
      onSearchMenuButtonClick,
      onCleanFiltersClick,
      closeFilters
    }: IProps,
    ref
  ) => {
    const { name, options, label, isVisible } = item;
    return (
      <Item ref={ref}>
        <SearchMenuButton name={name} onClick={onSearchMenuButtonClick}>
          {label}
        </SearchMenuButton>
        {isVisible && (
          <InputContainer>
            {options.map(option => (
              <CheckLabel key={option.option}>
                <input
                  type="checkbox"
                  name={name}
                  data-option={option.option}
                  checked={option.isChecked}
                  onChange={onSelectorChange}
                />
                <span>{option.option}</span>
              </CheckLabel>
            ))}
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

export default ItemSelector;
