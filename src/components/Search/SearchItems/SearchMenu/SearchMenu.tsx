import React, { useState, ChangeEvent, Fragment } from "react";
import initialFormState from "./initialFormState";
import style, { Button, ItemsContainer } from "./styleSearchMenu";
import ItemInput from "./ItemInput";
import ItemSelector from "./ItemSelector";
import ItemSize from "./ItemSize";
import { createActiveFiltersObject } from "./functions";

interface IProps {
  className?: string;
}
const SearchMenu = ({ className }: IProps) => {
  const [form, setForm] = useState(initialFormState);
  const { category, condition, gender, price, name, size } = form;
  const selectors = [gender, category, condition];
  const inputs = [price, name];
  const activeFilters = createActiveFiltersObject(selectors, name, price, size);

  const onSearchMenuButtonClick = (e: any) => {
    const { name } = e.target;
    const newForm: any = {};
    Object.keys(form).forEach(key => {
      newForm[key] = {
        ...form[key],
        isVisible: form[key].name === name ? !form[key].isVisible : false
      };
    });
    setForm(newForm);
  };

  const onSelectorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const { option } = e.target.dataset;
    setForm({
      ...form,
      [name]: {
        ...form[name],
        options: form[name].options.map(e => ({
          option: e.option,
          isChecked: e.option === option ? !e.isChecked : e.isChecked
        }))
      }
    });
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const { property } = e.target.dataset;
    setForm({
      ...form,
      [name]: {
        ...form[name],
        [property]: value
      }
    });
  };

  const onCleanFiltersClick = (e: any) => {
    const { name } = e.target;
    setForm({
      ...form,
      [name]: initialFormState[name]
    });
  };

  console.log(activeFilters);

  const isSizeInputVisible =
    category.options.findIndex(e => e.isChecked && e.option === "buty") > -1 ||
    activeFilters.selectors.category.length === 0;

  const isSizeSelectorVisible =
    activeFilters.selectors.category.length === 0 ||
    activeFilters.selectors.category.filter((e: string) => e !== "buty")
      .length > 0;

  return (
    <div className={className}>
      <ItemsContainer>
        {inputs.map(item => (
          <ItemInput
            key={item.name}
            item={item}
            onSearchMenuButtonClick={onSearchMenuButtonClick}
            onInputChange={onInputChange}
            onCleanFiltersClick={onCleanFiltersClick}
          />
        ))}
        <ItemSize
          size={size}
          isSizeInputVisible={isSizeInputVisible}
          isSizeSelectorVisible={isSizeSelectorVisible}
          onInputChange={onInputChange}
          onSelectorChange={onSelectorChange}
          onSearchMenuButtonClick={onSearchMenuButtonClick}
          onCleanFiltersClick={onCleanFiltersClick}
        />
        {selectors.map(item => (
          <ItemSelector
            key={item.name}
            item={item}
            onSearchMenuButtonClick={onSearchMenuButtonClick}
            onCleanFiltersClick={onCleanFiltersClick}
            onSelectorChange={onSelectorChange}
          />
        ))}
      </ItemsContainer>
      <div>
        <Button>Szukaj przedmiotów</Button>
        <label>
          Sortuj od
          <select>
            <option>od najniższej ceny</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default style(SearchMenu);
