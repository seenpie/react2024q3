export const parsePictureToString = (image) => {
  const reader = new FileReader();
  reader.onloadend = () => {
    return reader.result;
  };
  reader.readAsDataURL(image);
  console.log(reader);
  return reader.result;
};
