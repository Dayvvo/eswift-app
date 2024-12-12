import {
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
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
import { FcGoogle } from "react-icons/fc";
import Btn from "@/components/Btn";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { Background } from "../home/Background";
import { AuthBackground } from "./authBackground";

export const SignUpcreen = () => {
  const navigate = useRouter();

  const [show, setShow] = React.useState<boolean>(false);
  const [emailValidation, setEmailValidation] = useState<boolean>(true);
  const [passWordValidation, setPasswordValidation] = useState<boolean>(true);

  const [isSignup, setIsSignup] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setIsSignup({ ...isSignup, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post("/api/auth/signup", isSignup)
      .then((res) => {
        // const Data = res?.data?.data as {};
        // const token = res?.data?.data?.token as string;
        // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        // localStorage.setItem('userData', JSON.stringify(Data));
        // navigate.push('/dashboard')
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const HandleGoogleSubmit = async () => {
    let requestId = "";
    const allowedOrigin = "https://accounts.google.com";
    // axios.get('/api/auth/google')
    //     .then((res)=>{
    //         console.log(res.data)
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })

    const authWindow = window.open(
      `/api/auth/google`,
      "_blank",
      "width=500, height=500"
    );

    if (!authWindow || !authWindow.focus) {
      console.error(`Can't access server at the moment`);
      return;
    }

    window.addEventListener("message", async (event) => {
      if (event.origin !== allowedOrigin) {
        return console.log("not from google");
      }

      if (
        event.data &&
        event.data.type === "googleAuthCode" &&
        event.data.requestId === requestId
      ) {
        const googleAuthCode = event.data.code;

        try {
          const response = await axios.get("api/auth/google", googleAuthCode);
          console.log(response.data);
        } catch (err) {
          console.error("Error verifying Google auth code:", err);
        } finally {
          authWindow.close();
          navigate.push("/properties");
        }
      }
    });
  };

  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      bg="transparent"
      justifyContent={"space-between"}
      w={"100%"}
      minH={"100vh"}
      px={{ base: "16px", lg: "44px" }}
      py={'24px'}
      className="robotoF"
    >
      <AuthBackground/>
      <Box h={"fit-content"}>
        <Image width={200} height={100} src={"/Logo.svg"} alt={"e-Swift"} />
      </Box>
      <Flex justifyContent={"center"} alignItems={"center"}>
        <Box
          w={{ base: "100%", sm: "440px" }}
          h={"fit-content"}
          p={{ base: "16px", md: "32px" }}
          border={"1px solid var(--soft200)"}
          boxShadow={"lg"}
          borderRadius={"20px"}
          bg={"white"}
        >
          <AuthHeaderProps
            icon="/LoginIcon.png"
            title="Create an account to access exclusive features and benefits."
            description=""
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
                  Full Name
                </FormLabel>
                <InputGroup
                  onFocus={() => setEmailValidation(false)}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  border={"1px"}
                  borderRadius={"10px"}
                  borderColor={"var(--soft200)"}
                  cursor={"text"}
                  fontSize={14}
                  textColor={"var--(sub600)"}
                  w="100%"
                  h="40px"
                  _placeholder={{
                    textColor: "var--(soft400)",
                    fontSize: { base: 8, lg: 12 },
                  }}
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
                    type="text"
                    placeholder="Enter your full name"
                    name="text"
                    onChange={handleInput}
                  />
                </InputGroup>
              </FormControl>

              <FormControl w={"100%"}>
                <FormLabel
                  fontWeight={500}
                  fontSize={"14px"}
                  textColor={"var(--strong950)"}
                >
                  Email address
                </FormLabel>
                <InputGroup
                  onFocus={() => setEmailValidation(false)}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  border={"1px"}
                  borderRadius={"10px"}
                  borderColor={"var(--soft200)"}
                  cursor={"text"}
                  fontSize={14}
                  textColor={"var--(sub600)"}
                  w="100%"
                  h="40px"
                  _placeholder={{
                    textColor: "var--(soft400)",
                    fontSize: { base: 8, lg: 12 },
                  }}
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
                    onChange={handleInput}
                  />
                </InputGroup>
                {emailValidation ? (
                  <></>
                ) : (
                  <FormHelperText color={"var(--errorBase)"} fontSize={"12px"}>
                    {isSignup ? "Enter a valid email address*" : ""}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl w={"100%"}>
                <FormLabel
                  fontWeight={500}
                  fontSize={"14px"}
                  textColor={"var(--strong950)"}
                >
                  Phone Number
                </FormLabel>
                <InputGroup
                  onFocus={() => setEmailValidation(false)}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  border={"1px"}
                  borderRadius={"10px"}
                  borderColor={"var(--soft200)"}
                  cursor={"text"}
                  fontSize={14}
                  textColor={"var--(sub600)"}
                  w="100%"
                  h="40px"
                  _placeholder={{
                    textColor: "var--(soft400)",
                    fontSize: { base: 8, lg: 12 },
                  }}
                >
                  <InputLeftAddon
                    pointerEvents="none"
                    bg={"transparent"}
                    color={"var(--soft400)"}
                    width={"fit-content"}
                    height={"100%"}
                  >
                    +234
                  </InputLeftAddon>
                  <Input
                    w={"100%"}
                    h={"100%"}
                    type="tel"
                    placeholder="123-456-789"
                    name="address"
                    onChange={handleInput}
                  />
                </InputGroup>
              </FormControl>
              {/* <FormControl w={'100%'}>
                    <FormLabel
                        fontWeight={500} fontSize={'14px'}
                        textColor={'var(--strong950)'}
                    >
                        Residential Address
                    </FormLabel>
                    <InputGroup onFocus={()=> setEmailValidation(false)}
                        display={'flex'} justifyContent={'center'} alignItems={'center'}
                        border={'1px'} borderRadius={'10px'} 
                        borderColor={'var(--soft200)'}
                        cursor={'text'}
                        fontSize={14} textColor={'var--(sub600)'}
                        w='100%' h='40px'
                        _placeholder={{textColor:'var--(soft400)', fontSize:{base:8,lg:12}}}
                    >
                        <InputLeftElement pointerEvents='none' color={'var(--soft400)'}>
                            <MdOutlineEmail className="formicon"/>
                        </InputLeftElement>
                        <Input 
                            w={'100%'} h={'100%'}
                            type='text' 
                            placeholder='Enter your address'  
                            name="address"
                            onChange={handleInput}          
                        />
                    </InputGroup>
                </FormControl> */}
              <FormControl w={"100%"}>
                <FormLabel
                  fontWeight={500}
                  fontSize={"14px"}
                  textColor={"var(--strong950)"}
                >
                  Password
                </FormLabel>
                <InputGroup
                  onFocus={() => setPasswordValidation(false)}
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
                  _placeholder={{
                    textColor: "var--(soft400)",
                    fontSize: { base: 8, lg: 12 },
                  }}
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
                    onChange={handleInput}
                  />
                  <InputRightElement
                    width="fit-content"
                    marginRight={"20px"}
                    cursor={"pointer"}
                  >
                    <Box onClick={() => setShow(!show)} h={"fit-content"}>
                      {!show ? (
                        <BsEyeSlash className="formicon" />
                      ) : (
                        <BsEye className="formicon" />
                      )}
                    </Box>
                  </InputRightElement>
                </InputGroup>
                {passWordValidation ? (
                  <></>
                ) : (
                  <FormHelperText color={"var(--errorBase)"} fontSize={"12px"}>
                    {isSignup?.password.length < 8
                      ? "minimum of 8 characters*"
                      : ""}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl w={"100%"}>
                <FormLabel
                  fontWeight={500}
                  fontSize={"14px"}
                  textColor={"var(--strong950)"}
                >
                  Confirm Password
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
                  _placeholder={{
                    textColor: "var--(soft400)",
                    fontSize: { base: 8, lg: 12 },
                  }}
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
                    onChange={handleInput}
                  />
                  <InputRightElement
                    width="fit-content"
                    marginRight={"20px"}
                    cursor={"pointer"}
                  >
                    <Box onClick={() => setShow(!show)} h={"fit-content"}>
                      {!show ? (
                        <BsEyeSlash className="formicon" />
                      ) : (
                        <BsEye className="formicon" />
                      )}
                    </Box>
                  </InputRightElement>
                </InputGroup>
                {
                  <FormHelperText color={"var(--errorBase)"} fontSize={"12px"}>
                    {isSignup?.confirmPassword !== isSignup?.password ? "" : ""}
                  </FormHelperText>
                }
              </FormControl>
            </Flex>
            <Flex w="100%" my={"10px"} justifyContent={"space-between"}>
              <Text
                fontWeight={400}
                fontSize={{ base: "10px", lg: "14px" }}
                textColor={"var(--strong950)"}
              >
                Already have an account?
              </Text>
              <Link href={"/login"}>
                <Text
                  fontWeight={500}
                  fontSize={"14px"}
                  textColor={"var(--sub600)"}
                  textDecor={"underline"}
                >
                  Login
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
              fontSize={{ base: "12px", lg: "14px" }}
            >
              Sign Up
            </Btn>
            <Btn
              onClick={HandleGoogleSubmit}
              bg={"transparent"}
              my={2}
              borderColor={"var(--primaryBase)"}
              display={"flex"}
              alignItems={"center"}
              w={"100%"}
              h={"40px"}
              border={"1px"}
              borderRadius={"10px"}
              textColor={"var(--primaryBase)"}
              fontSize={{ base: "12px", lg: "14px" }}
              gap={"4px"}
            >
              <FcGoogle /> Sign In with Google
            </Btn>
          </form>
        </Box>
      </Flex>
      <Text fontSize={"14px"} fontWeight={400} textColor={"var(--sub600)"}>
        © {new Date().getFullYear()} e-Swift Property Mart
      </Text>
    </Box>
  );
};
