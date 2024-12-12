import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import Image from "next/image";
import { TextHeader } from "./textHeader";
import { FaStar } from "react-icons/fa6";
import { HiAcademicCap, HiMiniUserGroup } from "react-icons/hi2";

export const SectionTwo = () => {
  return (
    <>
      <Flex id="main"
        bg={"transparent"}
        flexDir="column"
        py={"80px"}
        width={"100%"}
        gap={{ base: "32px", md: "48px" }}
        alignItems={"center"}
        px={{ base: "1rem", lg: "4rem" }}
      >
        <Box w={"100%"}>
          <TextHeader
            Header={"Navigating the e-Swift Experience"}
            sub={
              "At e-Swift, we've designed a straightforward process to help you find and purchase your dream property with ease. Here's a step-by-step guide to how it works."
            }
          />
          <Steps />

          <Flex
            w={"100%"}
            flexDir={{ base: "column", lg: "row" }}
            gap={"20px"}
            alignItems={"center"}
          >
            <Flex w={{ base: "100%", lg: "60%" }} alignItems={"center"}>
              <Box maxW={"420px"}>
                <TextHeader
                  Header={"Our Values"}
                  sub={
                    "Our story is one continuous growth and evolution. We started as a small team with big dreams, determined to create a real estate platform that transcended the ordinary."
                  }
                />
              </Box>
            </Flex>
            <Value />
          </Flex>
        </Box>

        <Text
          className="antic"
          fontSize={{ base: "24px", md: "32px", lg: "48px" }}
          textColor={"#3A3148"}
          fontWeight={400}
          maxW={"1240px"}
        >
          Are you an Affiliate Marketer seeking the opportunity to earn money
          from the comfort of your home?
        </Text>
        <Text
          className="roboto"
          fontSize={{ base: "16px", md: "24px", lg: "32px" }}
          fontWeight={300}
          textColor={"#525866"}
          maxW={"1000px"}
        >
          e-Swift PropertyMart is calling on diligent Affiliate Marketers who
          would be rewarded with the best commissions on referrals for land or
          property sales and purchase deals. <br />
          Earn up to 2% Commissions on every successful referral.
        </Text>
      </Flex>
    </>
  );
};

export const Steps = () => {
  const Card = [
    {
      id: 1,
      title: "Discover a World of Possibilities",
      description:
        "Your journey begins with exploring our carefully curated property listings.",
    },
    {
      id: 2,
      title: "Narrowing Down your Choices",
      description:
        "Once you`ve found properties that catch your eye, save them to your account or make a shortlist. This allows you to compare and revisit your favourites as you make your decisions",
    },
    {
      id: 3,
      title: "Personalized Guidance",
      description:
        "Have questions about a property or need more information? Our dedicated team of real estate experts is just a message away",
    },
    {
      id: 4,
      title: "See it for Yourself",
      description:
        "Arrange viewings of the properties you`re interested in. We`ll coordinate with the property owners and accompany you to ensure you get a firsthand look at your potential new home.",
    },
    {
      id: 5,
      title: "Making Informed Decisions",
      description:
        "Befor making an offer, our team will assist you with due diligence, including property inspections, legal checks, and market analysis. We want you to be fully informed.",
    },
    {
      id: 6,
      title: "Getting the Best Deal",
      description:
        "We`ll help you negotiate the best terms and prepare your offer. Our goal is to secure the property at the right price and on favorable terms.",
    },
  ];

  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        md: "repeat(1, 1fr)",
        lg: "repeat(2, 1fr)",
        xl: "repeat(3, 1fr)"
      }}
      gap={"20px"}
      my={20}
      placeItems={"center"}
    >
      {Card.map((item) => (
        <Box
          key={item?.id}
          w={{ base: "100%", sm:"400px", md:'500px', lg:'100%' }}
          h={"298px"}
          className="urbanist"
        >
          <Flex
            w={"100%"}
            h={"52px"}
            px={"16px"}
            borderLeft={"1px solid #703BF7"}
          >
            <Text fontSize={"16px"} fontWeight={500} textColor={"black"}>
              Step 0{item?.id}
            </Text>
          </Flex>
          <Flex
            className="gradient"
            w={"100%"}
            h={"246px"}
            border={"1px solid #262626"}
            borderEndRadius={"10px"}
            borderBottomLeftRadius={"10px"}
            borderLeftColor={""}
            flexDir={"column"}
            alignItems={"start"}
            gap={"16px"}
            px={{ base: "20px", sm: "40px" }}
            py={{ base: "20px", sm: "40px" }}
          >
            <Text fontSize={"20px"} fontWeight={600} textColor={"black"}>
              {item?.title}
            </Text>
            <Text
              fontSize={{ base: "14px", sm: "16px" }}
              fontWeight={500}
              textColor={"#999"}
            >
              {item?.description}
            </Text>
          </Flex>
        </Box>
      ))}
    </Grid>
  );
};

export const Value = () => {
  return (
    <Flex
      w={{ base: "100%", lg: "100%" }}
      h={"fit-content"}
      flexDir={"column"}
      bg={"#3170A6"}
      borderRadius={"12px"}
      p={{ base: "8px", sm: "16px", lg: "50px" }}
      gap={{ base: "16px", lg: "24px" }}
      textColor={"white"}
      className="urbanist"
    >
      <Flex
        w={"100%"}
        h={"148px"}
        gap={{ base: "16px", lg: "24px" }}
        justifyContent={"space-between"}
      >
        <Flex flexDir={"column"} gap={"16px"} w={"50%"}>
          <Flex alignItems={"center"} gap={{ base: "6px", sm: "10px" }}>
            <Flex
              w={{ base: "40px", sm: "60px" }}
              h={{ base: "40px", sm: "60px" }}
              alignItems={"center"}
              justifyContent={"center"}
              fontSize={{ base: "20px", sm: "28px" }}
              bg={"#1A1D66"}
              borderRadius={"999px"}
            >
              <FaStar />
            </Flex>
            <Text
              fontWeight={600}
              fontSize={{ base: "10px", sm: "16px", md: "20px" }}
            >
              Trust
            </Text>
          </Flex>
          <Text
            fontWeight={500}
            fontSize={{ base: "8px", sm: "12px", xl: "16px" }}
          >
            Trust is the cornerstone of every successful real estate transaction
          </Text>
        </Flex>
        <Flex border={"1px solid #1A1D66"} h={"100%"} />
        <Flex flexDir={"column"} gap={"16px"} w={"50%"}>
          <Flex alignItems={"center"} gap={{ base: "6px", sm: "10px" }}>
            <Flex
              w={{ base: "40px", sm: "60px" }}
              h={{ base: "40px", sm: "60px" }}
              alignItems={"center"}
              justifyContent={"center"}
              fontSize={{ base: "20px", sm: "28px" }}
              bg={"#1A1D66"}
              borderRadius={"999px"}
            >
              <HiAcademicCap />
            </Flex>
            <Text
              fontWeight={600}
              fontSize={{ base: "10px", sm: "16px", md: "20px" }}
            >
              Excellence
            </Text>
          </Flex>
          <Text
            fontWeight={500}
            fontSize={{ base: "8px", sm: "12px", xl: "16px" }}
          >
            We set the bar high for ourselves. From the properties we list to
            the services we provide.
          </Text>
        </Flex>
      </Flex>
      <Flex border={"1px solid #1A1D66"} w={"100%"} />
      <Flex
        w={"100%"}
        h={"148px"}
        gap={{ base: "16px", lg: "24px" }}
        justifyContent={"space-between"}
      >
        <Flex flexDir={"column"} gap={"16px"} w={"50%"}>
          <Flex alignItems={"center"} gap={{ base: "6px", sm: "10px" }}>
            <Flex
              w={{ base: "40px", sm: "60px" }}
              h={{ base: "40px", sm: "60px" }}
              alignItems={"center"}
              justifyContent={"center"}
              fontSize={{ base: "20px", sm: "28px" }}
              bg={"#1A1D66"}
              borderRadius={"999px"}
            >
              <HiMiniUserGroup />
            </Flex>
            <Text
              fontWeight={600}
              fontSize={{ base: "10px", sm: "16px", md: "20px" }}
            >
              Client-Centric
            </Text>
          </Flex>
          <Text
            fontWeight={500}
            fontSize={{ base: "8px", sm: "12px", xl: "16px" }}
          >
            Your dreams and needs are at the center of our universe. We listen
            and understand.
          </Text>
        </Flex>

        <Flex border={"1px solid #1A1D66"} h={"100%"} />

        <Flex flexDir={"column"} gap={"16px"} w={"50%"}>
          <Flex alignItems={"center"} gap={{ base: "6px", sm: "10px" }}>
            <Flex
              w={{ base: "40px", sm: "60px" }}
              h={{ base: "40px", sm: "60px" }}
              alignItems={"center"}
              justifyContent={"center"}
              fontSize={{ base: "20px", sm: "28px" }}
              bg={"#1A1D66"}
              borderRadius={"999px"}
            >
              <FaStar />
            </Flex>
            <Text
              fontWeight={600}
              fontSize={{ base: "10px", sm: "16px", md: "20px" }}
            >
              Our Commitment
            </Text>
          </Flex>
          <Text
            fontWeight={500}
            fontSize={{ base: "8px", sm: "12px", xl: "16px" }}
          >
            We are dedicated to providing you with the highest level of service
            and professionalism.
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
