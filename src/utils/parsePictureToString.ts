type ParsePictureToStringProps = {
  image: File;
  callback: (value: string) => void;
};

export const parsePictureToString = ({
  image,
  callback
}: ParsePictureToStringProps) => {
  const reader = new FileReader();
  reader.onloadend = () => {
    const imageInBase64 = reader.result as string;
    callback(imageInBase64);
  };
  reader.readAsDataURL(image);
};
