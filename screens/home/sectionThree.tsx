import { Box, Flex, Text, Image, Grid } from "@chakra-ui/react";
import { TextHeader } from "./textHeader";
import { FaStar } from "react-icons/fa6";

export const SectionThree = () => {
  const clientReview = [
    {
      id: 1,
      title: "Exceptional Service!",
      review:
        "Our experience with e-Swift was outstanding. Their team`s dedication and professionalism made finding our dream home a breeze. Higly recommended!",
      user: "Wade Warren",
      location: "Lagos, Nigeria",
    },
    {
      id: 1,
      title: "Efficient and Reliable",
      review:
        "e-Swift provided us with top-notch service. They helped us sell our property quickly and at a great price. We couldn`t be happier with the results.",
      user: "Emilie Thompson",
      location: "Lagos, Nigeria",
    },
    {
      id: 1,
      title: "Trusted Advisors",
      review:
        "The e-Swift team guided us through the entire buying process. Their knowledge and commitment to our needs were impressive. Thank you for your support!",
      user: "John Mans",
      location: "Lagos, Nigeria",
    },
  ];

  const copies = 5;

  return (
    <>
      <Flex flexDir="column" width={"100%"} gap={"50px"}>
        <TextHeader
          Header="What Our Clients Say..."
          sub={
            "Read the success stories and heartfelt testimonials from our valued clients. Discover why they chose e-Swift for their real estate needs."
          }
        />

        <Flex
          w={"100%"}
          gap={"20px"}
          flexDir={{ base: "column", xl:"row" }}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {clientReview.map((item) => (
            <Box
              key={item?.id}
              bg={"#3170A6"}
              borderRadius={"10px"}
              width={{ base: "100%", sm: "400px" }}
              p={{ base: "24px", lg: "40px" }}
              textColor={"white"}
              className="urbanist"
            >
              <Flex alignItems={"center"} gap={"8px"} mb={"30px"}>
                {Array(copies)
                  .fill(null)
                  .map((_, index) => (
                    <Flex
                      key={index}
                      w={"38px"}
                      h={"38px"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      fontSize={{ base: "20px" }}
                      bg={"#1A1D66"}
                      borderRadius={"999px"}
                      textColor={"#FFE500"}
                    >
                      <FaStar />
                    </Flex>
                  ))}
              </Flex>
              <Text fontSize={"20px"} fontWeight={600}>
                {item?.title}
              </Text>
              <Text fontSize={"16px"} fontWeight={400}>
                {item?.review}
              </Text>
              <Flex mt={"30px"} gap={"10px"} alignItems={"center"}>
                <Box
                  w={"38px"}
                  h={"38px"}
                  borderRadius={"999px"}
                  overflow={"hidden"}
                >
                  <Image
                    src={"/avatar1.png"}
                    width={"100%"}
                    height={"100%"}
                    alt=""
                  />
                </Box>
                <Box className="urbanist">
                  <Text fontSize={"18px"} fontWeight={500} textColor={"white"}>
                    {item?.user}
                  </Text>
                  <Text
                    fontSize={"16px"}
                    fontWeight={400}
                    textColor={"#E1E4EA"}
                  >
                    {item?.location}
                  </Text>
                </Box>
              </Flex>
            </Box>
          ))}
        </Flex>

        <FAQ />
      </Flex>
    </>
  );
};

const FAQ = () => {
  const FAQ = [
    {
      id: 1,
      title: "How do I search for properties on e-Swift?",
      response:
        "Learn how to use our user-friendly search tools to find properties that match your criteria.",
    },
    {
      id: 2,
      title: "What documents do I need to sell my property throught e-Swift?",
      response:
        "Find out about the necessary documenttation for listing your property with us.",
    },
    {
      id: 3,
      title: "How can I contact an e-Swift agent?",
      response:
        "Discover the different ways you can get in touch with our experienced agents.",
    },
  ];
  return (
    <Box w="100%">
      <TextHeader
        Header="Frequently Asked Questions"
        sub="Find answers to common questions about e-Swift's Services, property listings, and the real estate process. We're here to provide clarity and assist you in every step of the way."
      />

      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          xl: "repeat(3, 1fr)",
        }}
        gap={"20px"}
      >
        {FAQ.map((item) => (
          <Box
            key={item?.id}
            border={"1px solid #262626"}
            borderRadius={"10px"}
            p={{ base: "24px", lg: "40px" }}
            className="antic"
          >
            <Text
              fontSize={{ base: "18px", lg: "20px" }}
              fontWeight={400}
              mb={{ base: "18px", lg: "24px" }}
            >
              {item?.title}
            </Text>
            <Text
              fontSize={{ base: "14px", lg: "16px" }}
              fontWeight={300}
              className="robotoF"
            >
              {item?.response}
            </Text>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

{
  /* // <SectionThreeProps mobile={"column"} web={"row"} view={"/Left.png"} gap={'40px'} w={"40%"} h={""} wid={"60%"}  hei={"fit-content"} listData={data} />
    // <SectionThreeProps mobile={"column"} web={"row-reverse"} view={"/Right.png"} gap={'40px'} w={"40%"} h={""} wid={"60%"}  hei={"fit-content"} listData={specification} /> */
}

// const data = [
//     {
//         id:1,
//         point: 'Swift & Efficient Sales Process: At e-Swift, our mission is to provide fast solutions for property sellers seeking a swift and efficient sales process. We understand the urgency associated with selling properties and we are committed to delivering prompt and reliable services.',
//     },
//     {
//         id:2,
//         point: 'Residential Sales: From cozy apartments to spacious family homes, we have a wide range of residential properties to suit every lifestyle and budget. (see our website)',
//     },
//     {
//         id:3,
//         point: 'Commercial Properties: Whether you`re looking for office space, retail locations, or investment opportunities, we have the expertise to help you find the right commercial property. (see our website)',
//     }
// ]

// const specification:any[] = [
//     {
//         id:1,
//         point:'Property Management: Let us handle the hassle. We offer expert property management, including tenant screening, rent collection, and maintenance.',
//     },
//     {
//         id:2,
//         point: 'Contemporary Construction: Build for the future. Our focus on modern design ensures your property remains stylish and valuable',
//     },
//     ,
//     {
//         id:3,
//         point: 'Property Services: Buy, sell, rent, or lease with ease. Our team provides expert guidance and support throughout the process.',
//     },
//     {
//         id:4,
//         point: 'Accurate Valuations: Get expert valuations for your property from our experienced team.',
//     },
// ]
