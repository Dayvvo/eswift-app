import { useState, ChangeEvent } from "react";
import useToast from "./useToast";

export const useInputText = (validation: (input: string) => boolean) => {
  const [input, setInput] = useState("");
  const [isTouch, setIsTouch] = useState<boolean | null>(null);

  const valueIsValid = validation(input);
  const valueIsInvalid = !valueIsValid && isTouch;

  const onChangeInput = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setInput(event.target.value);
  };
  const onBlurHandler = () => {
    setIsTouch(true);
  };

  const reset = () => {
    setInput("");
    setIsTouch(false);
  };
  return {
    input,
    onChangeInput,
    onBlurHandler,
    reset,
    valueIsValid,
    valueIsInvalid,
  };
};

export const useInputNumber = (
  validation: (input: number | null) => boolean
) => {
  const [input, setInput] = useState<number | null>(null);
  const [isTouch, setIsTouch] = useState<boolean | null>(null);

  const valueIsValid = validation(input ?? 0);
  const valueIsInvalid = !valueIsValid && isTouch;

  const parseNumber = (value: string): number | null => {
    const parsedValue = parseFloat(value);
    return isNaN(parsedValue) ? null : parsedValue;
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const parsedNumber = parseNumber(event.target.value);
    setInput(parsedNumber);
    setIsTouch(true);
  };
  const onBlurHandler = () => {
    setIsTouch(true);
  };

  const reset = () => {
    setInput(null);
    setIsTouch(false);
  };
  return {
    input,
    onChangeInput,
    onBlurHandler,
    reset,
    valueIsValid,
    valueIsInvalid,
  };
};

export type PropImages = (File | string)[];

// const validate_ladsacape_image = (file: File): Promise<void> => {
//   return new Promise((resolve, reject) => {
//     const img = new Image();

//     img.onload = function () {
//       const { width, height } = img;

//       if (width > height) {
//         resolve();
//       } else {
//         reject(new Error("Image must be landscape"));
//       }
//     };
//     img.onerror = function () {
//       reject(new Error("Image must be landscape"));
//     };

//     img.src = URL.createObjectURL(file);
//   });
// };

export const useImage = ({
  existingImages,
}: {
  existingImages?: PropImages;
}) => {
  const { toast } = useToast();
  const [images, setImages] = useState<PropImages>(existingImages || []);
  const [error, setError] = useState<string | null>(null);
  const validFileTypes: string[] = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/png",
  ];
  const maxFileSize: number = 12 * 1024 * 1024;

  const onChangeHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (
      event.target instanceof HTMLInputElement &&
      event.target.type === "file"
    ) {
      const selectedFiles = event.target.files;

      if (selectedFiles) {
        const newImages: File[] = [];

        for (const file of Array.from(selectedFiles)) {
          if (!validFileTypes.includes(file.type)) {
            setError(
              `Invalid file type for '${file.name}'. ${validFileTypes.join(
                ", "
              )} are supported.`
            );
            toast({
              status: "error",
              title: "Image Upload Required",
              description: `Invalid file type for '${
                file.name
              }'. ${validFileTypes.join(", ")} are supported.`,
              position: "top",
              duration: 1500,
            });
            continue;
          }
          if (file.size > maxFileSize) {
            setError(
              `File '${file.name}' exceeds maximum size of ${maxFileSize / 1024 / 1024}MB`
            );
            toast({
              status: "error",
              title: "Image Upload Required",
              description: `File '${file.name}' exceeds maximum size of ${maxFileSize / 1024 / 1024}MB`,
              position: "top",
              duration: 1500,
            });
            continue;
          }

          // try {
          //   await validate_ladsacape_image(file);
          //   newImages.push(file);
          // } catch (error: any) {
          //   toast({
          //     status: "error",
          //     title: "Image Upload Required",
          //     description: error.message || "Invalid image format",
          //     position: "top",
          //     duration: 1500,
          //   });
          //   setError(error.message);
          //   continue;
          // }

          newImages.push(file);
        }

        if (newImages.length > 0) {
          setImages([...images, ...newImages]);
          setError(null);
        }
      }
    }
  };

  const deleteImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const reset = () => {
    setImages([]);
  };

  return {
    images,
    onChangeHandler,
    error,
    reset,
    deleteImage,
    setImages,
  };
};

export const useInputSettings = <T extends {}>(
  data: T,
  validation: { [K in keyof T]: (value: T[K]) => boolean }
) => {
  const [input, setInput] = useState<T>(data);
  const [touched, setIsTouched] = useState<{
    [K in keyof T]?: boolean;
  }>({});

  const validateInput = (name: keyof T) => validation[name](input[name]);

  const onChangeHandler = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const reset = () => {
    // setInput({});
    setIsTouched({});
  };

  const onBlurHandler = (name: keyof T) => {
    setIsTouched((prev) => ({ ...prev, [name]: true }));
  };

  const inputIsvalid = (name: keyof T) => validateInput(name);
  const inputIsinvalid = (name: keyof T) =>
    !inputIsvalid(name) && touched[name];
  return {
    input,
    onChangeHandler,
    setInput,
    onBlurHandler,
    inputIsvalid,
    inputIsinvalid,
    reset,
  };
};
