import {
  Box,
  Flex,
  Img,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { PlusIcon, SearchIcon } from "./svg";
import Btn from "./Btn";
import { useRouter } from "next/router";
import useBlog from "@/hooks/useBlog";

const BlogComponent = () => {
  const blogData = [
    {
      img: "/img1.png",
      title: "Myths and Facts about Development",
      description:
        "Using our algorithm, we carry out a preliminary assessment to understand the state of your health and determine how best to serve you!",
      dateCreated: "March 10, 2024",
    },
    {
      img: "/img2.png",
      title: "Area and Aspects of Real Estate",
      description:
        "Using our algorithm, we carry out a preliminary assessment to understand the state of your health and determine how best to serve you!",
      dateCreated: "March 10, 2024",
    },
    {
      img: "/img1.png",
      title: "Points of Real Estate Change",
      description:
        "Using our algorithm, we carry out a preliminary assessment to understand the state of your health and determine how best to serve you!",
      dateCreated: "March 10, 2024",
    },
    {
      img: "/img2.png",
      title: "Myths and Facts about Development",
      description:
        "Using our algorithm, we carry out a preliminary assessment to understand the state of your health and determine how best to serve you!",
      dateCreated: "March 10, 2024",
    },
    {
      img: "/img1.png",
      title: "Myths and Facts about Development",
      description:
        "Using our algorithm, we carry out a preliminary assessment to understand the state of your health and determine how best to serve you!",
      dateCreated: "March 10, 2024",
    },
    {
      img: "/img2.png",
      title: "Myths and Facts about Development",
      description:
        "Using our algorithm, we carry out a preliminary assessment to understand the state of your health and determine how best to serve you!",
      dateCreated: "March 10, 2024",
    },
  ];

  const { deleteBlog, getBlog } = useBlog();

  useEffect(() => {
    const getBlogFn = async () => {
      const req = await getBlog();
    }
    getBlogFn();
  }, [])

  const deleteBlogFn = async (blogPostId:number) => {
    try {
      const req = await deleteBlog(blogPostId);
      console.log('req', req);
    }
    catch (err) {
      console.log("error calling post", err);
    }
  }

  const route = useRouter();

  return (
    <>
      <Flex gap={"20px"}>
        <InputGroup>
          <InputLeftElement>
            <SearchIcon />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search..."
            border={"1px solid #E1E4EA"}
          />
        </InputGroup>
        <Box>
          <Btn
            className="inter"
            fontWeight={500}
            fontSize={".875rem"}
            rightIcon={<PlusIcon />}
            bgColor="#1A1D66"
            borderRadius={"8px"}
            onClick={() => route.push('/blog/add')}
          >
            Add Blog
          </Btn>
        </Box>
      </Flex>
      <SimpleGrid columns={3} spacing={5} mt="20px">
        {blogData.map((item, index) => {
          return (
            <Box
              bgColor={"#fff"}
              maxW={"340px"}
              boxShadow={"0px 17.579px 52.738px 0px rgba(133, 133, 133, 0.10)"}
              key={index}
            >
              <Box w="100%" borderRadius={"7px 7px 0 0"}>
                <Img src={item.img} w="100%" />
              </Box>
              <Box p="20px 25px">
                <Text
                  className="mulish"
                  fontWeight={700}
                  color={"#4D4D4D"}
                  fontSize={".937rem"}
                >
                  {item.title}
                </Text>
                <Text
                  className="mulish"
                  fontWeight={400}
                  color={"#797979"}
                  fontSize={".75rem"}
                  my="20px"
                >
                  {item.description}
                </Text>
                <Text
                  className="mulish"
                  fontWeight={400}
                  color={"#797979"}
                  fontSize={".75rem"}
                >
                  {item.dateCreated}
                </Text>
              </Box>
              <Flex p='10px' justify={'space-between'}>
                <Btn
                  bgColor="#6AFFB0"
                  borderRadius={"50px"}
                  className="robotoF"
                  fontWeight={400}
                  fontSize={".937rem"}
                  w='144px'
                  h='28px'
                >
                  Edit
                </Btn>
                <Btn
                  bgColor="#FF5764"
                  borderRadius={"50px"}
                  className="robotoF"
                  fontWeight={400}
                  fontSize={".937rem"}
                  w='144px'
                  h='28px'
                  onClick={() => deleteBlogFn(index)}
                >
                  Delete
                </Btn>
              </Flex>
            </Box>
          );
        })}
      </SimpleGrid>
    </>
  );
};

export default BlogComponent;
