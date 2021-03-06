export default {
  price: {
    isOptional: false,
    name: "price",
    value: "",
    valid: false,
    label: "Cena",
    type: "number",
    errorMessage: "Podana cena jest nieprawidłowa"
  },
  size: {
    isOptional: false,
    name: "size",
    value: "",
    valid: false,
    label: "Rozmiar",
    type: "number",
    options: ["ONE-SIZE", "XS", "S", "M", "L", "XL", "XXL"],
    errorMessage: "Podany rozmiar jest nieprawidłowy"
  },
  category: {
    isOptional: false,
    name: "category",
    value: "buty",
    valid: true,
    options: [
      "buty",
      "bluza",
      "spodnie",
      "szorty",
      "kurtka",
      "plaszcz",
      "koszulka",
      "koszula",
      "marynarka",
      "czapka",
      "skarpetki",
      "bielizna",
      "biżuteria",
      "inne"
    ],
    label: "Kategoria"
  },
  brand: {
    isOptional: false,
    name: "brand",
    value: "",
    valid: false,
    label: "Marka",
    type: "text",
    errorMessage:
      "Nazwa marki musi posiadać conajmniej 1 znak oraz mniej niż 21"
  },
  itemModel: {
    isOptional: true,
    name: "itemModel",
    value: "",
    valid: true,
    label: "Model",
    type: "text",
    errorMessage:
      "Nazwa modelu nie może posiadać więcej niż 21 znaków lecz może pozostać pusta"
  },
  description: {
    isOptional: false,
    name: "description",
    value: "",
    valid: true,
    errorMessage:
      "Opis może pozostać pusty lecz nie może posiadać więcej niż 100 znaków oraz więcej niż 25 znaków na słowo"
  },
  condition: {
    isOptional: false,
    name: "condition",
    value: "nowy",
    label: "Stan",
    options: ["nowy", "używany"],
    valid: true
  },
  gender: {
    isOptional: false,
    name: "gender",
    value: "mężczyźni",
    label: "Płeć",
    options: ["mężczyźni", "kobiety", "dzieci"],
    valid: true
  }
};
