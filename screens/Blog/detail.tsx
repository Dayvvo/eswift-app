"use client"
import NavBar from "@/components/navBar";
import { Box, Flex, Text, TextProps } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Btn from "@/components/Btn";
import useBlog from "@/hooks/useBlog";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

interface BlogContentProps extends TextProps {
  richText: string | Node
}
const BlogContent = ({ richText, ...rest }:BlogContentProps) => {

  const domPurify = typeof window !== 'undefined'? DOMPurify(window).sanitize(richText)  :  '' ;
  return <Text {...rest}>{parse(domPurify)}</Text>;
};

type blog = {
  id?: string | number;
  header_image?: string;
  title?: string;
  introduction?: string;
  body_image?: string;
  body?: string;
};

export const BlogDetailScreen = () => {
  const navigate = useRouter();
  const fetchBlog = useBlog();
  const { id } = navigate.query;
  const [blog, setBlog] = useState<any>(null);

  useEffect(() => {
    const fetchBlogFn = async () => {
      const blogDetails = await fetchBlog.getBlogByID(id as string);
      setBlog(blogDetails.data);
    };
    id && fetchBlogFn();
  }, [id]);

  console.log("blog", blog);

  return (
    <>
      <NavBar />
      <Flex w={"100%"} h={{ base: "86px", lg: "96px" }} />
      <Box
        w={"100%"}
        bg={"white"}
        px={{ base: "1rem", lg: "4rem" }}
        py={"60px"}
        className="mulish"
      >
        <Box w={"100%"} mb={"36px"} px={{ base: "20px", lg: "60px" }}>
          <Box w={"100%"} h={"402px"}>
            <Image
              src={`/`}
              alt={"blog"}
              width={1000}
              height={1000}
              layout="responsive"
            />
          </Box>
          <Flex
            bg={"#2EC4B605"}
            w={"100%"}
            h={{ base: "96px", lg: "128px" }}
            alignItems={"center"}
            justifyContent={"center"}
            className="mulish"
          >
            <Text
              fontWeight={700}
              fontSize={{ base: "28px", lg: "32px" }}
              textColor={"#4D4D4D"}
            >
              {blog?.title || "title"}
            </Text>
          </Flex>
        </Box>
        <Box w={"100%"} px={{ base: "20px", lg: "60px" }}>
          <Box w={"100%"} mb={{ base: "40px", lg: "80px" }}>
            <Text
              fontWeight={700}
              fontSize={{ base: "28px", lg: "32px" }}
              textColor={"#303030"}
            >
              Inroduction:
            </Text>
            <BlogContent
              fontWeight={400}
              fontSize={{ base: "14px", lg: "16px" }}
              textColor={"#4D4D4D"}
              richText={ blog?.introduction}
            />
          </Box>
          <Image
            src={`/`}
            alt={"blog"}
            width={1000}
            height={1000}
            layout="responsive"
          />
          <Box w={"100%"} mt={{ base: "40px", lg: "80px" }}>
          <BlogContent
            fontWeight={400}
            fontSize={{ base: "14px", lg: "16px" }}
            textColor={"#4D4D4D"}
            richText={blog?.body}
          />
          </Box>
        </Box>
        <Btn
          onClick={() => navigate.back()}
          w={"100%"}
          h={"48px"}
          border={"1px solid #848484"}
          borderRadius={0}
          mt={"60px"}
          bg={"white"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          className="robotoF"
          textColor={"#848484"}
          fontSize={"16px"}
          fontWeight={600}
          _hover={{ border: "2px solid #848484" }}
        >
          BACK TO BLOG PAGE
        </Btn>
      </Box>
    </>
  );
};
