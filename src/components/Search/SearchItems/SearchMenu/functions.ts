import initialFormState from "./initialFormState";
import { ISelector, ISize, IInput, IActiveFilters } from "./interfaces";

export const createActiveFiltersObject = (
  selectors: Array<ISelector>,
  name: IInput,
  price: IInput,
  size: ISize
) => {
  const activeFilters: IActiveFilters["activeFilters"] = [];

  [...selectors, size].forEach(selector => {
    const selectedFilters: Array<string> = [];
    selector.options.forEach(option => {
      if (option.isChecked) {
        selectedFilters.push(option.option);
      }
    });
    if (selectedFilters.length > 0) {
      const { name, label } = selector;
      activeFilters.push({ name, label, selectedFilters });
    }
  });

  if (name.value.length > 0) {
    const { label, value } = name;
    activeFilters.push({ name: name.name, label, selectedFilters: [value] });
  }

  ["priceFrom", "priceTo"].forEach((key: "priceFrom" | "priceTo") => {
    const { value, label } = price[key];
    if (value !== "" && value !== initialFormState.price[key].value) {
      activeFilters.push({
        name: key,
        label,
        selectedFilters: [value]
      });
    }
  });

  if (size.value !== initialFormState.size.value) {
    const { name, label, value } = size;
    const indexOfSizeFilter = activeFilters.findIndex(
      e => e.name === name
    );
    if (indexOfSizeFilter === -1) {
      activeFilters.push({ name, label, selectedFilters: [`${value}EU`] });
    } else {
      activeFilters[indexOfSizeFilter].selectedFilters.push(`${value}EU`);
    }
  }
  
  return activeFilters;
};
