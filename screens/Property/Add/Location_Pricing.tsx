import Btn from "@/components/Btn";
import { SelectInput, TextInput } from "@/components/Inputs";
import useToast from "@/hooks/useToast";
import { nigerianStates, validateRequired } from "@/utils/modules";
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
} from "@chakra-ui/react";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

interface ButtonFunction {
  next: () => void;
  previous: () => void;
  handleOnchange: (
    event: ChangeEvent<
      HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement
    >
  ) => void;
  handleOnblur: any;
  input: {
    state: string;
    lga: string;
    address: string;
    price: string;
  };
  touched: {
    state: boolean;
    lga: boolean;
    address: boolean;
    price: boolean;
  };
  setTouched: React.Dispatch<React.SetStateAction<any>>;
}
export const AddPropertyScreenTwo = ({
  next,
  previous,
  input,
  handleOnblur,
  handleOnchange,
  touched,
  setTouched,
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
      count: "2",
      title: "Location & Pricing",
      bg: "var(--primaryBase)",
      text: "#FFF",
    },
    {
      id: 3,
      count: "3",
      title: "Images",
      bg: "#FFF",
      text: "var(--sub600)",
    },
    {
      id: 4,
      count: "4",
      title: "Documents",
      bg: "#FFF",
      text: "var(--sub600)",
    },
  ];

  const validation = validateRequired({
    title: input.state,
    state: input.state,
    address: input.address,
    price: input.price,
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
        <SelectInput
          items={nigerianStates}
          label="State"
          placeholder="select state"
          name="state"
          value={input.state}
          inputIsinvalid={touched.state && !validation.state}
          onChange={handleOnchange}
          onBlur={handleOnblur}
          errorMessage="select state!"
        />
        <Box mt={3}>
          <TextInput
            name="lga"
            label="Local government"
            placeholder="Enter a local government"
            value={input.lga}
            onChange={handleOnchange}
          />
        </Box>

        <Flex flexDir={"column"} gap={"16px"} w="100%" py={"20px"}>
          <FormControl w={"100%"}>
            <FormLabel
              fontWeight={500}
              fontSize={"14px"}
              textColor={"var(--strong950)"}
            >
              Address
            </FormLabel>
            <InputGroup
              borderRadius={"10px"}
              // borderColor={"var(--soft200)"}
              border={
                touched.address && !validation.address
                  ? "1px solid var(--errorBase)"
                  : "1px solid var(--soft200)"
              }
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
                type="text"
                placeholder="The location of the property"
                name="address"
                value={input.address}
                onBlur={handleOnblur}
                onChange={handleOnchange}
              />
            </InputGroup>
            {touched.address && !validation.address && (
              <FormHelperText color={"var(--errorBase)"} fontSize={"12px"}>
                {"Enter a valid address"}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl w={"100%"}>
            <FormLabel
              fontWeight={500}
              fontSize={"14px"}
              textColor={"var(--strong950)"}
            >
              Price
              <Text as="span" textColor={"var(--primaryBase)"}>
                *
              </Text>
            </FormLabel>
            <InputGroup
              // display={"flex"}
              alignItems={"center"}
              // border={"1px"}
              borderRadius={"10px"}
              // borderColor={"var(--soft200)"}
              cursor={"text"}
              fontSize={14}
              textColor={"var(--sub600)"}
              w="100%"
              h="40px"
              _placeholder={{ textColor: "var(--soft400)" }}
            >
              <Input
                border={
                  touched.price && !validation.price
                    ? "1px solid var(--errorBase)"
                    : "1px solid var(--soft200)"
                }
                w={"100%"}
                h={"100%"}
                type="number"
                placeholder="₦ 0.00"
                name="price"
                value={input.price}
                onBlur={handleOnblur}
                onChange={handleOnchange}
              />
            </InputGroup>
            {touched.price && !validation.price && (
              <FormHelperText color={"var(--errorBase)"} fontSize={"12px"}>
                {"Enter a valid price"}
              </FormHelperText>
            )}
          </FormControl>
        </Flex>
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
