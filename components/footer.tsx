import { Box, Flex, Text, Image } from "@chakra-ui/react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export const Footer = () => {
  const socials = [
    {
      id: 1,
      page: "",
      logo: <FaInstagram />,
    },
    {
      id: 2,
      page: "",
      logo: <FaLinkedinIn />,
    },
    {
      id: 3,
      page: "",
      logo: <FaFacebookF />,
    },
  ];

  const NavLink = [
    {
      id: 1,
      Navigator: "Properties",
      Link: "/properties",
    },
    {
      id: 2,
      Navigator: "Gallery",
      Link: "/gallery",
    },
    {
      id: 3,
      Navigator: "About Us",
      Link: "/about",
    },
    {
      id: 4,
      Navigator: "Our Team",
      Link: "/team",
    },
    {
      id: 5,
      Navigator: "Blog",
      Link: "/blogspot",
    },
    {
      id: 6,
      Navigator: "Contact Us",
      Link: "/contact",
    },
  ];

  const LegalLink = [
    {
      id: 1,
      Navigator: "Legal Disclaimer",
      Link: "",
    },
    {
      id: 2,
      Navigator: "Terms and Conditions",
      Link: "",
    },
    {
      id: 3,
      Navigator: "Cookies Policy",
      Link: "",
    },
  ];
  return (
    <>
      <Box
        bg={"#E2EDF3"}
        w={"100%"}
        h={"fit-content"}
        px={{ base: "1rem", lg: "2rem", xl: "4rem" }}
        py={"60px"}
      >
        <Flex
          flexDirection={{ base: "column", lg: "row" }}
          w="100%"
          gap={{ base: "40px", lg: "10px" }}
          justifyContent={{ base: "center", lg: "space-between" }}
        >
          <Box
            display={{ base: "flex", lg: "none" }}
            flexDirection={"column"}
            alignItems={"center"}
            gap={"12"}
            w={{ base: "fit-content", lg: "20%" }}
          >
            <Image src={"/footer.png"} alt="logo" w={"175px"} h={"130px"} />
            <Flex w={"fit-content"} gap={"30px"} alignItems={"center"}>
              {socials.map((item) => (
                <Link href={`${item.page}`} key={item?.id}>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    w={"38px"}
                    h={"38px"}
                    border={"1.5px solid #1A1D66"}
                    borderRadius={"999px"}
                    fontSize={"16px"}
                    textColor={"#827053"}
                  >
                    {item?.logo}
                  </Box>
                </Link>
              ))}
            </Flex>
          </Box>
          <Box w={{ base: "100%", lg: "20%" }}>
            <Box mb={2} className="roboto">
              <Text fontWeight={500} fontSize={"16px"} textColor={"#1A1D66"}>
                Address
              </Text>
              <Text
                fontWeight={400}
                fontSize={"16px"}
                textColor={"var(--TextCol)"}
                w={"180px"}
              >
                Opposite Royal, Bird Hotel, at Ijapo Estate, Akure
              </Text>
            </Box>
            <Box mb={2} className="roboto">
              <Text fontWeight={500} fontSize={"16px"} textColor={"#1A1D66"}>
                Email
              </Text>
              <Link href="mailto:">
                <Text
                  fontWeight={400}
                  fontSize={"16px"}
                  textColor={"var(--TextCol)"}
                >
                  eswiftpropertymart@gmail.com
                </Text>
              </Link>
            </Box>
          </Box>
          <Box w={{ base: "100%", lg: "20%" }}>
            <Box mb={2} className="roboto">
              <Text fontWeight={500} fontSize={"16px"} textColor={"#1A1D66"}>
                Phone
              </Text>
              <Text
                fontWeight={400}
                fontSize={"16px"}
                textColor={"var(--TextCol)"}
              >
                Call O8066895363 <br />
                Whatsapp <br />
                08059112878
              </Text>
            </Box>
          </Box>
          <Box
            display={{ base: "none", lg: "flex" }}
            flexDirection={"column"}
            alignItems={"center"}
            gap={"12"}
            w={{ base: "fit-content", lg: "20%" }}
          >
            <Image src={"/footer.png"} alt="logo" w={"175px"} h={"130px"} />
            <Flex w={"fit-content"} gap={"30px"} alignItems={"center"}>
              {socials.map((item) => (
                <Link href={`${item.page}`} key={item?.id}>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    w={"38px"}
                    h={"38px"}
                    border={"1.5px solid #1A1D66"}
                    borderRadius={"999px"}
                    fontSize={"16px"}
                    textColor={"#827053"}
                  >
                    {item?.logo}
                  </Box>
                </Link>
              ))}
            </Flex>
          </Box>
          <Box className="roboto" w={{ base: "100%", lg: "20%" }}>
            {NavLink.map((item, index) => (
              // eslint-disable-next-line react/jsx-key
              <Link href={`${item?.Link}`} key={index}>
                <Text
                  fontWeight={400}
                  fontSize={"16px"}
                  textColor={"var(--TextCol)"}
                >
                  {item?.Navigator}
                </Text>
              </Link>
            ))}
          </Box>
          <Box className="roboto" w={{ base: "100%", lg: "20%" }}>
            {LegalLink.map((item) => (
              // eslint-disable-next-line react/jsx-key

              <Text
                key={item?.id}
                width={"fit-content"}
                fontWeight={500}
                fontSize={"16px"}
                textColor={"var(--TextCol)"}
                mb={2}
              >
                <Link href={`${item?.Link}`} className="width">
                  {item?.Navigator}
                </Link>
              </Text>
            ))}
          </Box>
        </Flex>
        <Flex w={"100%"} justifyContent={"center"} className="roboto" mt={6}>
          <Text fontSize={"14px"} fontWeight={300} textColor={"var(--TextCol)"}>
            © E-Swift property mart
          </Text>
        </Flex>
      </Box>
    </>
  );
};
