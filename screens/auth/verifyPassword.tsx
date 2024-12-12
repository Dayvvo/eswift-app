import {
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  PinInput,
  PinInputField,
  Stack,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import { AuthHeaderProps } from "./authheader";
import { MdOutlineEmail } from "react-icons/md";
import React from "react";
import Btn from "@/components/Btn";
import Link from "next/link";
import { AuthBackground } from "./authBackground";

export const VerifyPasswordScreen = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  let userEmail = "Dayvvo@alignui.com";

  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      bg={"#FFF"}
      justifyContent={"space-between"}
      w={"100%"}
      h={"100vh"}
      px={{ base: "16px", lg: "44px" }}
      py={"24px"}
      className="robotoF"
    >
      <AuthBackground/>
      <Box h={"fit-content"}>
        <Image width={200} height={100} src={"/logo.svg"} alt={"e-Swift"} />
      </Box>
      <Flex flexBasis={1} justifyContent={"center"} alignItems={"center"}>
        <Box
          w={{ base: "100%", sm: "440px" }}
          h={"fit-content"}
          p={{ base: "16px", md: "32px" }}
          border={"1px solid var(--soft200)"}
          boxShadow={"lg"}
          borderRadius={"20px"}
        >
          <AuthHeaderProps
            icon="/verifyIcon.png"
            title="Enter Verification Code"
            description={`We've sent a code to`}
            user={userEmail}
          />
          <Box w={"100%"} border={"1px solid var(--soft200)"} my={"24px"} />
          <Flex flexDir={"column"} w={"100%"} gap={"12px"}>
            <HStack>
              <PinInput type="alphanumeric" size="xl">
                <PinInputField h={"64px"} borderRadius={"10px"} />
                <PinInputField h={"64px"} borderRadius={"10px"} />
                <PinInputField h={"64px"} borderRadius={"10px"} />
                <PinInputField h={"64px"} borderRadius={"10px"} />
              </PinInput>
            </HStack>
          </Flex>
          <Btn
            bg={"var(--primaryBase)"}
            display={"flex"}
            alignItems={"center"}
            w={"100%"}
            h={"40px"}
            border={"1px"}
            borderColor={"#FFFFFF"}
            borderRadius={"10px"}
            textColor={"#FFFFFF"}
            my={"24px"}
          >
            Submit Code
          </Btn>
          <Flex flexDir={"column"} gap={"8px"} w="100%" alignItems={"center"}>
            <Text
              fontWeight={500}
              fontSize={"14px"}
              textColor={"var(--sub600)"}
            >
              Experiencing issues receiving the code?
            </Text>
            <Text
              fontWeight={500}
              fontSize={"14px"}
              textColor={"var(--strong950)"}
              textDecor={"underline"}
            >
              Resend code
            </Text>
          </Flex>
        </Box>
      </Flex>
      <Text fontSize={"14px"} fontWeight={400} textColor={"var(--sub600)"}>
        © {new Date().getFullYear()} e-Swift Property Mart
      </Text>
    </Box>
  );
};
