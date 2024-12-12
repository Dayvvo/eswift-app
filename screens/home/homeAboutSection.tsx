import { Box, Flex, Link, Text, Image } from "@chakra-ui/react";
import { HiMiniBuildingStorefront } from "react-icons/hi2";
import { FaMoneyBills } from "react-icons/fa6";
import { PiBuildingOfficeFill } from "react-icons/pi";
import { MdArrowOutward, MdLightMode } from "react-icons/md";

export const AboutSection = () => {
  const card = [
    {
      id: 1,
      icon: <HiMiniBuildingStorefront />,
      title: "Find Your Dream Home",
      navigate: "/login",
    },
    {
      id: 2,
      icon: <FaMoneyBills />,
      title: "Unlock Property Value",
      navigate: "",
    },
    {
      id: 3,
      icon: <PiBuildingOfficeFill />,
      title: "Effortless Property Search",
      navigate: "",
    },
    {
      id: 4,
      icon: <MdLightMode />,
      title: "Smart Investments, Informed Decisions",
      navigate: "",
    },
  ];

  return (
    <>
      <Box width={"100%"} className="robotoF" overflow={"clip"}>
        <Flex
          bg={"transparent"}
          flexDir="column"
          pb={"60px"}
          width={"100%"}
          gap={{ base: "32px", md: "48px" }}
          alignItems={"center"}
          px={{ base: "1rem", lg: "2rem" }}
          textAlign={"center"}
        >
          <Flex
            w={"fit-content"}
            bg={"#FFF"}
            flexWrap={"wrap"}
            gap={"10px"}
            justifyContent={"center"}
            p="15px"
            borderRadius={"10px"}
          >
            {card.map((item) => (
              <Flex
                key={item?.id}
                bg={"#3170A6"}
                borderRadius={"10px"}
                w={{ base: "100%", md: "320px" }}
                h={"160px"}
                p={"20px"}
                textColor={"white"}
                className="robotoF"
                flexDir={"column"}
                alignItems={"center"}
                // _hover={{ bg: "#3170A690" }}
              >
                <Flex w={"100%"} justifyContent={"end"}>
                  <Link href={item?.navigate}>
                    <Box fontSize={"26px"}>
                      <MdArrowOutward />
                    </Box>
                  </Link>
                </Flex>
                <Flex
                  position={"relative"}
                  w={"60px"}
                  h={"60px"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  fontSize={"24px"}
                >
                  <Image
                    src="/Icon-Container.png"
                    alt=""
                    w={"60px"}
                    h={"60px"}
                    position={"absolute"}
                  />
                  {item?.icon}
                </Flex>
                <Text mt={"16px"} fontSize={"14px"} fontWeight={600}>
                  {item?.title}
                </Text>
              </Flex>
            ))}
          </Flex>

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
            textColor={"#3A3148"}
            maxW={"1000px"}
          >
            At e-Swift PropertyMart, we understand that finding your dream home
            is more than just a transaction; it is about finding the perfect
            space to create memories and build your future. With our dedicated
            team of real estate professionals, we are committed to helping you
            every step of the way.
          </Text>
          <Text
            className="roboto"
            fontSize={{ base: "16px", md: "24px", lg: "32px" }}
            fontWeight={500}
            textColor={"#3A3148"}
          >
            Your Trusted Partner in Real Estate Solutions
          </Text>
          <Image src={"/Company.gif"} alt="/" width={116} height={114} />
        </Flex>
      </Box>
    </>
  );
};

export const Stats = () => {
  const Stats = [
    {
      id: 1,
      statistic: "200",
      title: "Happy Customers",
    },
    {
      id: 2,
      statistic: "10k",
      title: "Happy Customers",
    },
    {
      id: 1,
      statistic: "16",
      title: "Happy Customers",
    },
  ];

  return (
    <>
      <Flex
        w={{ base: "100%", lg: "fit-content" }}
        flexWrap={"wrap"}
        gap={"10px"}
        px="15px"
        py={"12px"}
        borderRadius={"10px"}
        justifyContent={{ base: "center", lg: "start" }}
      >
        {Stats.map((item) => (
          <Flex
            key={item?.id}
            bg={"#3170A6"}
            borderRadius={"10px"}
            w={"160px"}
            h={"90px"}
            p={"20px"}
            textColor={"white"}
            className="urbanist"
            flexDir={"column"}
          >
            <Text fontWeight={700} fontSize={"24px"}>
              {item?.statistic}+
            </Text>
            <Text className="urbanist" fontSize={"14px"} fontWeight={500}>
              {item?.title}
            </Text>
          </Flex>
        ))}
      </Flex>
    </>
  );
};
