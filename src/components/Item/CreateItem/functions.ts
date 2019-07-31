export const isSelectSize = (category: string) =>
  category !== "buty" && category !== "skarpetki";

export const onCategory_SizeChange = (
  category: string,
  previousCategory: string,
  size: string
) => {
  if (isSelectSize(category) === isSelectSize(previousCategory)) {
    return { value: size };
  } else if (isSelectSize(category)) {
    return { value: "M", valid: true };
  } else {
    return { value: "", valid: false };
  }
};
