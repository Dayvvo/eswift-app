import Btn from "@/components/Btn";
import { DeleteBin } from "@/components/svg";
import useToast from "@/hooks/useToast";
import {
  Box,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  Select,
  Text,
  Textarea,
  Image,
} from "@chakra-ui/react";
import { ChangeEvent, ReactNode, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { RiUploadCloud2Line } from "react-icons/ri";

interface ButtonFunction {
  next: () => void;
  previous: () => void;
  images: any;
  error: any;
  onChangeImage: (event: ChangeEvent<HTMLInputElement>) => void;
  deleteImage: (id: number) => void;
}
// export const AddPropertyScreenTwo = ({ next, previous }: ButtonFunction) => {

export const AddPropertyScreenThree = ({
  next,
  previous,
  images,
  onChangeImage,
  deleteImage,
  error,
}: ButtonFunction) => {
  const { toast } = useToast();
  const subs: any[] = [
    {
      id: 1,
      count: <FaCheck />,
      title: "Property Title & Category",
      bg: "#1FC16B",
      text: "#FFF",
    },
    {
      id: 2,
      count: <FaCheck />,
      title: "Location & Pricing",
      bg: "#1FC16B",
      text: "#FFF",
    },
    {
      id: 3,
      count: "3",
      title: "Images",
      bg: "var(--primaryBase)",
      text: "#FFF",
    },
    {
      id: 4,
      count: "4",
      title: "Documents",
      bg: "#FFF",
      text: "var(--sub600)",
    },
  ];

  const validfileTypes: string[] = ["image/jpeg", "image/png", "image/gif"];
  const maxFileSize: number = 5 * 1024 * 1024;

  const [dragging, setDragging] = useState<boolean>(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  console.log("images", images);

  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const handleImageClickHadler = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };
  const handleDragEnter = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    setUploadedFile(e.dataTransfer.files[0]);
  };

  const handleUpload = (e: ChangeEvent<HTMLImageElement>) => {
    const input = document.createElement("input");
    input.type = "file";
    input.click();
    input.addEventListener("change", (e: any) => {
      const file: File = e.target.files[0];
    });
  };

  const nextFn = () => {
    // const isFormValid = validate();

    if (images.length < 1) {
      toast({
        status: "error",
        title: "Image Upload Required",
        description: "Please upload at least one image to proceed.",
        position: "top",
        duration: 1500,
      });
      return;
    } else if (error) {
      toast({
        status: "error",
        title: "Invalid image upload type",
        description: "Please upload a valid image type.",
        position: "top",
        duration: 1500,
      });
    }
    next();
  };

  return (
    <>
      <Box w={"100%"} px={"20px"} className="inter">
        <Flex w={"100%"} justifyContent={"space-between"}>
          {subs.map((sub) => (
            <Flex
              key={sub?.id}
              my={"24px"}
              w={"fit-content"}
              alignItems={"center"}
              gap={{ base: "12px", md: "16px" }}
              className="inter"
            >
              <Flex alignItems={"center"} gap={"8px"}>
                <Flex
                  w={"20px"}
                  h={"20px"}
                  border={"1px solid var(--soft200)"}
                  borderRadius={"100%"}
                  bg={`${sub?.bg}`}
                  alignItems={"center"}
                  justifyContent={"center"}
                  textColor={`${sub?.text}`}
                  fontSize={"14px"}
                  fontWeight={400}
                >
                  {sub?.count}
                </Flex>
                <Text
                  fontWeight={400}
                  textColor={"var(--strong950)"}
                  fontSize={"14px"}
                >
                  {sub?.title}
                </Text>
              </Flex>
              <IoIosArrowForward className="arrow" />
            </Flex>
          ))}
        </Flex>
        <Flex
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          flexDir={"column"}
          w="100%"
          gap={"20px"}
          py={"32px"}
          border={"1px dashed var(--soft200)"}
          borderRadius={"12px"}
          bg={"var(--weak50)"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <RiUploadCloud2Line className="arrow" />
          <Box>
            {dragging ? (
              <Text
                fontSize={"14px"}
                fontWeight={500}
                textColor={"var(--strong950)"}
              >
                Drop the File here
              </Text>
            ) : (
              <Text
                fontSize={"14px"}
                fontWeight={500}
                textColor={"var(--strong950)"}
              >
                Click to Upload or drag & drop it here.
              </Text>
            )}
            {error ? (
              <Text fontSize={"14px"} fontWeight={500} textColor={"#FF3B30"}>
                {error}
              </Text>
            ) : (
              images && (
                <Text
                  fontSize={"14px"}
                  fontWeight={500}
                  textColor={"var(--strong950)"}
                >
                  Uploaded Files:{images.name}
                  {/* {images.map((img: File) => img.name).join(", ")} */}
                </Text>
              )
            )}
            <Text
              fontSize={"14px"}
              fontWeight={400}
              textColor={"var(--sub600)"}
            >
              Upload high-quality images of the property.
            </Text>
          </Box>
          <Input
            type="file"
            name="image"
            display={"none"}
            accept="image/jpeg, image/png, image/gif"
            onChange={onChangeImage}
            ref={imageInputRef}
            multiple
          />
          <Btn
            onClick={handleImageClickHadler}
            border={"1px solid var(--soft200)"}
            display={"flex"}
            alignItems={"center"}
            w={"100px"}
            h={"32px"}
            bg={"#FFFFFF"}
            fontSize={"14px"}
            fontWeight={500}
            borderRadius={"10px"}
            textColor={"var(--sub600)"}
          >
            Browse File
          </Btn>
        </Flex>
        {images.length > 0 && (
          <Flex
            gap="15px"
            overflow="auto"
            wrap="nowrap"
            justifyContent={"center"}
            bgColor={"#E2EDF3"}
            mt={"20px"}
            border={"1px solid #262626"}
            padding="10px"
            borderRadius={"12px"}
            css={{
              "&::-webkit-scrollbar": {
                height: "4px",
              },
              "&::-webkit-scrollbar-thumb": {
                borderRadius: "4px",
              },
            }}
          >
            {images.map((image: any, index: number) => (
              <Box
                key={index}
                h="74px"
                borderRadius="6px"
                flexShrink="0"
                width="122.22px"
                position={"relative"}
                // onClick={() => handleImageClick(index)}
              >
                <Image
                  h="100%"
                  w="100%"
                  src={typeof(image) ==='string'?image: URL.createObjectURL(image)}
                  alt={image.name}
                  borderRadius="6px"
                  objectFit="cover"
                />
                <Box
                  position={"absolute"}
                  top={"30px"}
                  left={"50px"}
                  cursor="pointer"
                  bgColor={"#999"}
                  borderRadius={"5px"}
                  onClick={() => deleteImage(index)}
                >
                  <DeleteBin />
                </Box>
              </Box>
            ))}
          </Flex>
        )}
        <Flex gap={"2rem"}>
          <Btn
            onClick={previous}
            my={"20px"}
            border={"1px solid var(--primaryBase)"}
            display={"flex"}
            alignItems={"center"}
            w={"100%"}
            h={"40px"}
            bg={"#FFFFFF"}
            borderRadius={"10px"}
            textColor={"var(--primaryBase)"}
            _hover={{
              bg: "#1A1D66",
              textColor: "#FFF",
            }}
          >
            Previous
          </Btn>
          <Btn
            onClick={nextFn}
            my={"20px"}
            border={"1px solid var(--primaryBase)"}
            display={"flex"}
            alignItems={"center"}
            w={"100%"}
            h={"40px"}
            bg={"#FFFFFF"}
            borderRadius={"10px"}
            textColor={"var(--primaryBase)"}
            _hover={{
              bg: "#1A1D66",
              textColor: "#FFF",
            }}
          >
            Next
          </Btn>
        </Flex>
      </Box>
    </>
  );
};
