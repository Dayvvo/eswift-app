import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { TextHeader } from "../home/textHeader";
import { Stats } from "../home/homeAboutSection";
import { Steps, Value } from "../home/sectionTwo";

export const AboutSection = () => {
  return (
    <>
      <Box
        width={"100%"}
        bg="transparent"
        bgSize="cover"
        bgPosition="center"
        className="robotoF"
        overflow={"clip"}
        mt={20}
        mb={20}
      >
        <Flex
          px={{ base: "1rem", lg: "4rem" }}
          w={"100%"}
          flexDir={{ base: "column", lg: "row" }}
          gap={"60px"}
          mb={{ base: 20, lg: 40 }}
        >
          <Flex
            w={{ base: "100%", lg: "50%" }}
            flexDir={"column"}
            gap={{ lg: "30px" }}
            py={"20px"}
          >
            <TextHeader
              Header={"Our Journey"}
              sub={
                "Our story is one of continuous growth and evolution. We started as a small team with big dreams, determined to create a real estate platform that transcended the ordinary. Over the years, we've expanded our reach, forged valuable partnerships, and gained the trust of countless clients."
              }
            />
            <Stats />
          </Flex>
          <Flex
            w={{ base: "100%", lg: "100%" }}
            bgImage={"url('/journeybg.png')"}
            bgPos={"center"}
            bgSize="cover"
            borderRadius={"12px"}
            overflow={"hidden"}
          >
            <Image
              src={"/journey.png"}
              alt="our journey"
              width={1000}
              height={1000}
              layout="responsive"
            />
          </Flex>
        </Flex>
        <Flex
          bg={"transparent"}
          flexDir="column"
          py={{ base: "40px", lg: "60px" }}
          width={"100%"}
          gap={{ base: "24px", md: "48px" }}
          alignItems={"center"}
          px={{ base: "1rem", lg: "2rem" }}
          textAlign={"center"}
        >
          <Image src={"/Company.gif"} alt="/" width={116} height={114} />
          <Text
            className="antic"
            fontSize={{ base: "24px", md: "32px", lg: "48px" }}
            textColor={"#3A3148"}
            fontWeight={400}
            maxW={"1240px"}
          >
            e-Swift PropertyMart is a leading digital real estate company with
            branches in Akure, Lagos and Abuja offering a comprehensive range of
            services to buyers, sellers, landlords, and tenants through our
            innovative online platforms.
          </Text>
          <Text
            className="roboto"
            fontSize={{ base: "16px", md: "24px", lg: "32px" }}
            fontWeight={300}
            textColor={"#827053"}
            maxW={"1000px"}
          >
            At e-Swift PropertyMart, we understand that finding your dream home
            is more than just a transaction; it`s about finding the perfect
            space to create memories and build your future. With our dedicated
            team of real estate professionals, we are committed to helping you
            every step of the way.
          </Text>
        </Flex>
        <Flex
          px={{ base: "1rem", lg: "4rem" }}
          w={"100%"}
          flexDir={{ base: "column", lg: "row" }}
          gap={"60px"}
        >
          <Flex
            w={{ base: "100%", lg: "50%" }}
            flexDir={"column"}
            gap={"30px"}
            py={{ lg: "20px" }}
          >
            <TextHeader
              Header={"Our Values"}
              sub={
                "Our story is one of continuous growth and evolution. We started as a small team with big dreams, determined to creat a real estate platform that transcended the ordinary. Over the years, we've expanded our reach, forged valuable partnerships, and gained the trust of countless clients."
              }
            />
          </Flex>
          <Flex w={{ base: "100%", lg: "50%" }}>
            <Value />
          </Flex>
        </Flex>
        <Flex
          px={{ base: "1rem", lg: "4rem" }}
          w={"100%"}
          flexDir={{ base: "column" }}
          mt={{ base: 20, lg: 40 }}
        >
          <TextHeader
            Header={"Navigating the e-Swift Experience"}
            sub={
              "At e-Swift, we`ve designed a straightforward process to help you find and purchase your dream property with ease. Here's a step-by-step guide to how it all works."
            }
          />
          <Steps />
        </Flex>
      </Box>
    </>
  );
};
