import Btn from "@/components/Btn";
import React, { KeyboardEvent, useState } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { ChangeEvent } from "react";
import { IoIosArrowForward } from "react-icons/io";
import useToast from "@/hooks/useToast";
import { BsPlus } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import { validateRequired } from "@/utils/modules";
import { useAppContext } from "@/context";

interface AddPropertyScreenOneProps {
  onClick: () => void;
  handleOnchange: (
    event: ChangeEvent<
      HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement
    >
  ) => void;
  handleOnblur: any;
  input: {
    title: string;
    description: string;
    category: string;
    owner: string;
    propertyType: string;
  };
  touched: {
    owner: boolean;
    title: boolean;
    description: boolean;
    category: boolean;
    propertyType: boolean;
  };
  setTouched: React.Dispatch<React.SetStateAction<any>>;
  setFeatures: React.Dispatch<React.SetStateAction<string[]>>;
  features: string[];
}
export const AddPropertyScreenOne = ({
  onClick,
  handleOnblur,
  touched,
  setTouched,
  setFeatures,
  features,
  handleOnchange,
  input,
}: AddPropertyScreenOneProps) => {
  const { toast } = useToast();
  const [inputValue, setInputValue] = useState<string>("");
  const subs: any[] = [
    {
      id: 1,
      title: "Property Title & Category",
      bg: "var(--primaryBase)",
      text: "#FFF",
    },
    {
      id: 2,
      title: "Location & Pricing",
      bg: "#FFF",
      text: "var(--sub600)",
    },
    {
      id: 3,
      title: "Images",
      bg: "#FFF",
      text: "var(--sub600)",
    },
    {
      id: 4,
      title: "Documents",
      bg: "#FFF",
      text: "var(--sub600)",
    },
  ];

  const handleAddTag = () => {
    const newFeature: string = inputValue.trim();
    if (newFeature && !features.includes(newFeature)) {
      setFeatures((prev) => [...prev, newFeature]);
      setInputValue("");
    }
  };

  const handleRemoveTag = (index: number) => {
    setFeatures(features.filter((_features, i) => i !== index));
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTag();
    }
  };

  const handleTagInput = (e: any) => {
    setInputValue(e.target.value);
  };

  const validation = validateRequired({
    title: input.title,
    description: input.description,
    category: input.category,
    owner: input.owner,
    propertyType: input.propertyType,
  });

  const nextFn = () => {
    const hasValidationError =
      validation && Object.values(validation).includes(false);
    if (hasValidationError) {
      const fieldsWithErrors = Object.keys(validation).reduce((acc, key) => {
        if (!validation[key]) {
          acc[key] = true;
        }
        return acc;
      }, {} as Record<string, boolean>);

      setTouched((prev: any) => ({
        ...prev,
        ...fieldsWithErrors,
      }));

      toast({
        status: "error",
        description: "Validation failed",
        title: "Failed",
        position: "top",
        duration: 1500,
      });

      return;
    }
    onClick();
  };

  const { globalContext } = useAppContext();
  const getUser = globalContext.getUser;

  const OWNERS = ["ESWIFT", "AFFILIATE", "AGENT"];
  // const arrName = getUser?.map((entry: { firstName: string; lastName: string; _id: string; })=> {
  //   return({
  //       userName: entry?.firstName + " " + entry?.lastName,
  //       ID: entry?._id
  //     }
  //   )
  // })

  return (
    <>
      <Box
        w={"100%"}
        px={"20px"}
        className="inter"
        maxH={"600px"}
        overflow={"scroll"}
      >
        <Flex
          w={"100%"}
          justifyContent={"space-between"}
          flexDir={{ base: "column", md: "row" }}
        >
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
                  {sub?.id}
                </Flex>
                <Text
                  fontWeight={400}
                  textColor={"var(--strong950)"}
                  fontSize={"12px"}
                >
                  {sub?.title}
                </Text>
              </Flex>
              <IoIosArrowForward className="arrow" />
            </Flex>
          ))}
        </Flex>
        <Flex flexDir={"column"} gap={"16px"} w="100%" py={"20px"}>
          <FormControl w={"100%"}>
            <FormLabel
              fontWeight={500}
              fontSize={"14px"}
              textColor={"var(--strong950)"}
            >
              Property Title
            </FormLabel>
            <InputGroup
              border={"1px"}
              borderRadius={"10px"}
              borderColor={"var(--soft200)"}
              cursor={"text"}
              fontSize={14}
              textColor={"var--(sub600)"}
              w="100%"
              h="40px"
              _placeholder={{ textColor: "var--(soft400)" }}
            >
              <Input
                w={"100%"}
                h={"100%"}
                border={
                  touched.title && !validation.title
                    ? "1px solid var(--errorBase)"
                    : ""
                }
                type="text"
                placeholder="A descriptive name for the property"
                name="title"
                value={input.title}
                onBlur={handleOnblur}
                onChange={handleOnchange}
              />
            </InputGroup>
            {touched.title && !validation.title && (
              <FormHelperText color={"var(--errorBase)"} fontSize={"12px"}>
                {"Enter a valid property title"}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl w={"100%"}>
            <FormLabel
              fontWeight={500}
              fontSize={"14px"}
              textColor={"var(--strong950)"}
            >
              Property type
            </FormLabel>
            <Select
              w="100%"
              h="40px"
              borderRadius={"10px"}
              fontSize={14}
              textColor={"var--(sub600)"}
              _placeholder={{ textColor: "var--(soft400)" }}
              placeholder="Type of property"
              name="category"
              border={
                touched.category && !validation.category
                  ? "1px solid var(--errorBase)"
                  : "1px solid var(--soft200)"
              }
              onChange={handleOnchange}
              onBlur={handleOnblur}
              value={input.category}
            >
              {["Land", "House"].map((entry) => (
                <option value={`${entry}`} key={entry} color="var(--soft400)">
                  {entry}
                </option>
              ))}
            </Select>
            {touched.category && !validation.category && (
              <FormHelperText color={"var(--errorBase)"} fontSize={"12px"}>
                {"Select valid property type"}
              </FormHelperText>
            )}
          </FormControl>
          {/*  */}
          <FormControl w={"100%"}>
            <FormLabel
              fontWeight={500}
              fontSize={"14px"}
              textColor={"var(--strong950)"}
            >
              Listing Type
            </FormLabel>
            <Select
              w="100%"
              h="40px"
              borderRadius={"10px"}
              fontSize={14}
              textColor={"var--(sub600)"}
              _placeholder={{ textColor: "var--(soft400)" }}
              placeholder="SelectListing Type"
              name="propertyType"
              border={
                touched.propertyType && !validation.propertyType
                  ? "1px solid var(--errorBase)"
                  : "1px solid var(--soft200)"
              }
              onChange={handleOnchange}
              onBlur={handleOnblur}
              value={input.propertyType}
            >
              {["Project", "Property"].map((entry) => (
                <option
                  value={`${entry.toLocaleLowerCase()}`}
                  key={entry}
                  color="var(--soft400)"
                >
                  {entry}
                </option>
              ))}
            </Select>
            {touched.propertyType && !validation.propertyType && (
              <FormHelperText color={"var(--errorBase)"} fontSize={"12px"}>
                {"Select valid listing type"}
              </FormHelperText>
            )}
          </FormControl>
          {/*  */}
          <FormControl w={"100%"}>
            <FormLabel
              fontWeight={500}
              fontSize={"14px"}
              textColor={"var(--strong950)"}
            >
              Property Owner
            </FormLabel>
            <Select
              w="100%"
              h="40px"
              borderRadius={"10px"}
              fontSize={14}
              textColor={"var--(sub600)"}
              _placeholder={{ textColor: "var--(soft400)" }}
              placeholder=""
              name="owner"
              border={
                touched.owner && !validation.owner
                  ? "1px solid var(--errorBase)"
                  : "1px solid var(--soft200)"
              }
              onChange={handleOnchange}
              onBlur={handleOnblur}
              value={input.owner}
            >
              {OWNERS.map((owner, index) => (
                <option value={owner} key={index} color="var(--soft400)">
                  {owner}
                </option>
              ))}
            </Select>
            {touched.category && !validation.category && (
              <FormHelperText color={"var(--errorBase)"} fontSize={"12px"}>
                {"select property owner"}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl w={"100%"}>
            <FormLabel
              fontWeight={500}
              fontSize={"14px"}
              textColor={"var(--strong950)"}
            >
              Description
            </FormLabel>
            <Textarea
              border={
                touched.description && !validation.description
                  ? "1px solid var(--errorBase)"
                  : "1px solid var(--soft200)"
              }
              borderRadius={"10px"}
              cursor={"text"}
              fontSize={14}
              textColor={"var--(sub600)"}
              _placeholder={{ textColor: "var--(soft400)" }}
              name="description"
              value={input.description}
              onBlur={handleOnblur}
              onChange={handleOnchange}
            />
            {touched.description && !validation.description && (
              <FormHelperText color={"var(--errorBase)"} fontSize={"12px"}>
                {"Description must be at least 10 characters long"}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl w={"100%"}>
            <FormLabel
              fontWeight={500}
              fontSize={"14px"}
              textColor={"var(--strong950)"}
            >
              Features
            </FormLabel>
            <Flex
              w={"100%"}
              h={"fit-content"}
              alignItems={"center"}
              justifyContent={"space-between"}
              borderRadius={"10px"}
            >
              <Input
                type={"text"}
                height={"40px"}
                cursor={"text"}
                fontSize={14}
                textColor={"var--(sub600)"}
                _placeholder={{ textColor: "var--(soft400)" }}
                _focusWithin={{ border: "0px solid transparent" }}
                border={"1px solid var(--soft200)"}
                borderLeftRadius={"8px"}
                borderRightRadius={"0px"}
                value={inputValue}
                onChange={handleTagInput}
                onKeyDown={handleKeyPress}
              />

              <Flex
                w={"40px"}
                h={"40px"}
                fontSize={"36px"}
                px={"4px"}
                justifyContent={"center"}
                alignItems={"center"}
                onClick={handleAddTag}
                bg={"var(--primaryBase)"}
                borderRightRadius={"8px"}
              >
                <BsPlus color="white" fontSize={"25px"} />
              </Flex>
            </Flex>
            <Flex flexWrap={"wrap"} gap={"8px"} mt={"6px"}>
              {features.map((feature, index) => (
                <Flex
                  gap="8px"
                  key={index}
                  alignItems={"center"}
                  fontSize={"14px"}
                  bg={"var(--soft200)"}
                  px={"8px"}
                  py={"2px"}
                  borderRadius={"10px"}
                >
                  {feature}
                  <Flex
                    onClick={() => handleRemoveTag(index)}
                    fontSize={"14px"}
                  >
                    <IoCloseOutline />
                  </Flex>
                </Flex>
              ))}
            </Flex>
            {/* {(
              <FormHelperText color={"var(--)"} fontSize={"12px"}>
                {"No Feature listed"}
              </FormHelperText>
            )} */}
          </FormControl>
        </Flex>
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
      </Box>
    </>
  );
};
