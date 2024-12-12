import {
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import { AuthHeaderProps } from "./authheader";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import React, { ChangeEvent, useEffect } from "react";
import Btn from "@/components/Btn";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { Background } from "../home/Background";
import { useInputText } from "@/hooks/useInput";
import useToast from "@/hooks/useToast";
import { AuthBackground } from "./authBackground";

export const LoginScreen = () => {
 
  const navigate = useRouter();
 
  const [show, setShow] = React.useState<boolean>(false);
  
  const {
    input: email,
    onChangeInput: onChangeEmail,
    onBlurHandler: onBlurEmail,
    reset: resetEmail,
    valueIsValid: validEmail,
    valueIsInvalid: invalidEmail,
  } = useInputText((email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  });

  const {
    input: password,
    onChangeInput: onChangePassword,
    onBlurHandler: onBlurPassword,
    reset: resetPassword,
    valueIsValid: validPassword,
    valueIsInvalid: invalidPassword,
  } = useInputText((password) => password.trim().length > 7);

  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const isLogin = { email, password};

  const validate = () => {
    if (!validEmail) {
      onBlurEmail();
      return false;
    } else if (!validPassword) {
      onBlurPassword();
      return false;
    }

    return true;
  };

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isFormValid = validate();

    if (!isFormValid) {
      return;
    }
    setLoading(true);
    axios
      .post("/api/auth/login", isLogin)
      .then((res) => {
        setLoading(false);
        const Data = res?.data?.data as {};
        const token = res?.data?.data?.token as string;
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("userData", JSON.stringify(Data));
        navigate.push("/dashboard");
        resetEmail();
        resetPassword();
      })
      .catch((err) => {
        toast({
          status: "error",
          description: err.response.data.message,
          title: "Failed",
          position: "top",
          duration: 1000,
        });
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    storedData && navigate.push('/dashboard')
  }, [navigate]);


  return (
    <Box
      display={"flex"}
      flexDir={"column"}
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
          h={"fit-content"} bg={'#FFF'}
          p={{ base: "16px", md: "32px" }}
          border={"1px solid var(--soft200)"}
          boxShadow={"lg"}
          borderRadius={"20px"}
        >
          <AuthHeaderProps
            icon="/LoginIcon.png"
            title="Login to your account"
            description="Enter your details to login."
          />
          <Box w={"100%"} border={"1px solid var(--soft200)"} my={"24px"} />
          <form onSubmit={handleSubmit}>
            <Flex flexDir={"column"} w={"100%"} gap={"12px"}>
              <FormControl w={"100%"}>
                <FormLabel
                  fontWeight={500}
                  fontSize={"14px"}
                  textColor={"var(--strong950)"}
                >
                  Email address
                </FormLabel>
                <InputGroup
                  display={"flex"}
                  justifyContent={"center"}
                  border={"1px solid var(--soft200)"}
                  borderRadius={"10px"}
                  cursor={"text"}
                  fontSize={14}
                  textColor={"var--(sub600)"}
                  w="100%"
                  h="40px"
                  _placeholder={{ textColor: "var--(soft400)", fontSize: 12 }}
                >
                  <InputLeftElement
                    pointerEvents="none"
                    color={"var(--soft400)"}
                  >
                    <MdOutlineEmail className="formicon" />
                  </InputLeftElement>
                  <Input
                    w={"100%"}
                    h={"100%"}
                    type="email"
                    placeholder="hello@gmail.com"
                    name="email"
                    value={email}
                    onBlur={onBlurEmail}
                    onChange={onChangeEmail}
                  />
                </InputGroup>
                {invalidEmail && (
                  <FormHelperText color={"var(--errorBase)"} fontSize={"12px"}>
                    Email is required*
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl w={"100%"}>
                <FormLabel
                  fontWeight={500}
                  fontSize={"14px"}
                  textColor={"var(--strong950)"}
                >
                  Password
                </FormLabel>
                <InputGroup
                  display={"flex"}
                  justifyContent={"center"}
                  border={"1px"}
                  borderRadius={"10px"}
                  borderColor={"var(--soft200)"}
                  cursor={"text"}
                  fontSize={14}
                  textColor={"var--(sub600)"}
                  w="100%"
                  h="40px"
                  _placeholder={{ textColor: "var--(soft400)", fontSize: 12 }}
                >
                  <InputLeftElement
                    pointerEvents="none"
                    color={"var(--soft400)"}
                  >
                    <RiLockPasswordLine className="formicon" />
                  </InputLeftElement>
                  <Input
                    w={"100%"}
                    h={"100%"}
                    outline={"none"}
                    type={show ? "text" : "Password"}
                    placeholder="*********"
                    name="password"
                    value={password}
                    onBlur={onBlurPassword}
                    onChange={onChangePassword}
                  />
                  <InputRightElement
                    width="fit-content"
                    marginRight={"20px"}
                    cursor={"pointer"}
                  >
                    <Box onClick={() => setShow(!show)}>
                      {!show ? (
                        <BsEyeSlash className="formicon" />
                      ) : (
                        <BsEye className="formicon" />
                      )}
                    </Box>
                  </InputRightElement>
                </InputGroup>

                {invalidPassword && (
                  <FormHelperText color={"var(--errorBase)"} fontSize={"12px"}>
                    minimum of 8 characters*
                  </FormHelperText>
                )}
              </FormControl>
            </Flex>
            <Flex w="100%" my={"24px"} justifyContent={"space-between"}>
              <Checkbox
                fontWeight={400}
                fontSize={"14px"}
                textColor={"var(--strong950)"}
              >
                Keep me logged in
              </Checkbox>
              <Link href={"/reset"}>
                <Text
                  fontWeight={500}
                  fontSize={"14px"}
                  textColor={"var(--sub600)"}
                  textDecor={"underline"}
                >
                  Forgot password?
                </Text>
              </Link>
            </Flex>
            <Btn
              type="Submit"
              bg={"var(--primaryBase)"}
              display={"flex"}
              alignItems={"center"}
              w={"100%"}
              h={"40px"}
              border={"1px"}
              borderColor={"#FFFFFF"}
              borderRadius={"10px"}
              textColor={"#FFFFFF"}
              isLoading={loading}
              loadingText="Submitting"
              disabled={loading}
            >
              Login
            </Btn>
          </form>
        </Box>
      </Flex>
      <Text fontSize={"14px"} fontWeight={400} textColor={"var(--sub600)"}>
        ©{new Date().getFullYear()} e-Swift Property Mart
      </Text>
    </Box>
  );
};
