import { ChangeEvent, useState } from "react";
import { PlusIcon, UploadIcon } from "./svg";
import { Flex, Text } from "@chakra-ui/react";
import useUpload from "@/hooks/useUpload";

export interface ImageData {
  dataUrl: string;
  fileName: string; // Optional for reference (consider security)
}

const ImageUpload = ({
  onImageChange,
  setImageFile,
  // setImageUrl,
  initialImageUrl,
}: {
  onImageChange?: (image: ImageData) => void;
  setImageFile?: any;
  // setImageUrl?: (url: string) => void;
  initialImageUrl?: string;
}) => {
  const [image, setImage] = useState<ImageData | null>(null);
  const { uploadSingle } = useUpload();

  console.log('initialImageUrl', initialImageUrl);
  console.log('image', image);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const dataUrl = event.target?.result as string;

        const imageData: ImageData = {
          dataUrl,
          fileName: file.name, // Optional for reference
        };

        setImage(imageData);
        onImageChange?.(imageData);

        // console.log("file", file);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("filename", file.name);
        formData.append("filesize", file.size.toString());
        formData.append("filetype", file.type);

        const uploadImage = async () => {
          try {
            const req = await uploadSingle(formData);
            console.log('image req', req);
            setImageFile(req?.data?.data);
      
            // Check if setImageUrl is defined before calling it
            // if (setImageUrl) {
            //   setImageUrl(req?.data?.data);
            // }
          } catch (err) {
            console.log("err", err);
          }
        };

        uploadImage();

      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <label
        htmlFor={"name"}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "700px",
          borderRadius: "7px",
          overflow: "hidden",
          position: "relative",
          maxHeight: "200px",
          zIndex: "1",
          backgroundColor: "rgba(46, 196, 182, 0.10)",
        }}
      >
        {image ? (
          <img src={ image?.dataUrl } alt="header-img" style={{ width: "100%" }} />
        ) : initialImageUrl ? (
          <img src={ initialImageUrl } alt="header-img" style={{ width: "100%" }} />
        ) : (
          <div
            // "
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
              paddingBlock: "29px",
              zIndex: "1",
            }}
          >
            <UploadIcon />
            <Text
              w="270px"
              fontWeight={300}
              fontSize={".75rem"}
              className="mulish"
              textAlign={"center"}
            >
              Browse and chose the files you want to upload from your computer
            </Text>
            <Flex
              align={"center"}
              justify={"center"}
              bgColor={"#2EC4B6"}
              borderRadius={"4px"}
            >
              <PlusIcon />
            </Flex>
          </div>
        )}
        <input
          type="file"
          name="headerImage"
          id="headerImage"
          onChange={handleFileChange}
          style={{
            width: "100%",
            height: "100%",
            opacity: 0,
            cursor: "pointer",
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: "2",
          }}
        />
      </label>
    </>
  );
};

export default ImageUpload;
