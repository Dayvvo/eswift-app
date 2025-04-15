import { ChangeEvent, useState } from "react";
import { PlusIcon, UploadIcon } from "./svg";
import { Flex, Text } from "@chakra-ui/react";
import useUpload from "@/hooks/useUpload";
import useToast from "@/hooks/useToast";

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
  const { toast } = useToast();
  const MAX_FILE_SIZE_MB = 2.5;
  const validTypes = ["image/jpeg", "image/gif" ,"image/jpg", "image/png"];

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      const fileSizeInMB = file.size / (1024 * 1024);

      const validFiletype = validTypes.includes(file.type);
      if (!validFiletype) {
        toast({
          status: "error",
          title: "Invalid file type",
          description: "Please upload a JPEG or PNG image.",
          duration: 5000,
        });
        e.target.value = "";
        return;
      }
      if (fileSizeInMB > MAX_FILE_SIZE_MB) {
        toast({
          status: "error",
          title: "Image cannot be uploaded",
          description: "Image file exceeds 2.5MB",
          duration: 5000,
        });
        e.target.value = "";
        return;
      }
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

        const uploadImage = async () => {
          try {
            const req = await uploadSingle(formData);
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
      <Flex
      as="label"
      htmlFor="headerImage"
      direction="column"
      align="center"
      justify="center"
      w={{ base: "100%",lg: '700px' }}
      maxH="200px"
      borderRadius="7px"
      overflow="hidden"
      position="relative"
      bg="rgba(46, 196, 182, 0.10)"
      cursor="pointer"
      _hover={{ bg: "rgba(46, 196, 182, 0.15)" }}
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
      </Flex>
    </>
  );
};

export default ImageUpload;
