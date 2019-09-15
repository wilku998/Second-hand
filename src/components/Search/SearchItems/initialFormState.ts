export default {
  category: {
    isVisible: false,
    label: "Kategoria",
    name: "category",
    options: [
      { isChecked: false, option: "buty" },
      { isChecked: false, option: "bluza" },
      { isChecked: false, option: "spodnie" },
      { isChecked: false, option: "szorty" },
      { isChecked: false, option: "kurtka" },
      { isChecked: false, option: "plaszcz" },
      { isChecked: false, option: "koszulka" },
      { isChecked: false, option: "koszula" },
      { isChecked: false, option: "marynarka" },
      { isChecked: false, option: "czapka" },
      { isChecked: false, option: "skarpetki" },
      { isChecked: false, option: "bielizna" },
      { isChecked: false, option: "biżuteria" },
      { isChecked: false, option: "inne" }
    ]
  },
  size: {
    name: "size",
    isVisible: false,
    label: "Rozmiar",
    type: "number",
    value: "",
    placeholder: "Rozmiar EU",
    options: [
      { isChecked: false, option: "ONE-SIZE" },
      { isChecked: false, option: "XS" },
      { isChecked: false, option: "S" },
      { isChecked: false, option: "M" },
      { isChecked: false, option: "L" },
      { isChecked: false, option: "XL" },
      { isChecked: false, option: "XXL" }
    ]
  },
  condition: {
    name: "condition",
    value: [],
    isVisible: false,
    label: "Stan",
    options: [
      { isChecked: false, option: "nowy" },
      { isChecked: false, option: "używany" }
    ]
  },
  gender: {
    name: "gender",
    isVisible: false,
    label: "Płeć",
    options: [
      { isChecked: false, option: "mężczyźni" },
      { isChecked: false, option: "kobiety" },
      { isChecked: false, option: "dzieci" }
    ]
  },
  price: {
    name: "price",
    priceFrom: { value: "0", label: "Cena od" },
    priceTo: { value: "9999", label: "Cena do" },
    isVisible: false,
    label: "Cena",
    type: "number"
  },

  name: {
    name: "name",
    value: "",
    isVisible: false,
    label: "Nazwa przedmiotu",
    placeholder: "Marka, model",
    type: "text"
  }
};
