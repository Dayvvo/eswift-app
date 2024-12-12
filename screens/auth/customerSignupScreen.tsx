import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { AuthHeaderProps } from "./authheader";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import Btn from "@/components/Btn";
import Link from "next/link";
import { useRouter } from "next/router";
import { AuthBackground } from "./authBackground";

export const CustomerSignUpcreen = () => {
  
  const router = useRouter();

  const {query} = router;

  const refCode = query?.refCode as string;
  
  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      bg="transparent"
      justifyContent={"space-between"}
      w={"100%"}
      minH={"100vh"}
      px={{ base: "16px", lg: "44px" }}
      py={"24px"}
      className="robotoF"
    >
      <AuthBackground />
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

          <Btn
            onClick={() => router.push(`/api/auth/google${refCode?`?state=${refCode}`:''}` )}
            bg={"transparent"}
            my={2}
            borderColor={"#D0DDD5"}
            display={"flex"}
            alignItems={"center"}
            w={"100%"}
            h={"40px"}
            border={"1px"}
            borderRadius={"10px"}
            textColor={"#667085"}
            fontSize={{ base: "12px", lg: "14px" }}
            gap={"4px"}
          >
            Sign in with Google <FcGoogle />
          </Btn>
          {/* <Flex w="100%" my={"10px"} justifyContent={"space-between"}>
            <Text
              fontWeight={400}
              fontSize={{ base: "10px", lg: "14px" }}
              textColor={"var(--strong950)"}
            >
              Already have an account?
            </Text>
            <Link href={"/admin"}>
              <Text
                fontWeight={500}
                fontSize={"14px"}
                textColor={"var(--sub600)"}
                textDecor={"underline"}
              >
                Log In
              </Text>
            </Link>
          </Flex> */}
        </Box>
      </Flex>
      <Text fontSize={"14px"} fontWeight={400} textColor={"var(--sub600)"}>
        © {new Date().getFullYear()} e-Swift Property Mart
      </Text>
    </Box>
  );
};
