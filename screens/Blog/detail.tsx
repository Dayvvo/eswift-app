"use client";
import NavBar from "@/components/navBar";
import {
  Box,
  Flex,
  Text,
  TextProps,
  Image,
  Stack,
  Skeleton,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
// import Image from "next/image";
import { useRouter } from "next/router";
import Btn from "@/components/Btn";
import useBlog from "@/hooks/useBlog";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

interface BlogContentProps extends TextProps {
  richText: string | Node;
}
const BlogContent = ({ richText, ...rest }: BlogContentProps) => {
  const domPurify =
    typeof window !== "undefined" ? DOMPurify(window).sanitize(richText) : "";

  return (
    <Box as="div" {...rest}>
      {parse(domPurify)}
    </Box>
  );
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
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchBlogFn = async () => {
      setLoading(true);
      try {
        const blogDetails = await fetchBlog.getBlogByID(id as string);
        setBlog(blogDetails.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    id && fetchBlogFn();
  }, [id]);

  return (
    <Box>
      <NavBar />
      <Flex w={"100%"} h={{ base: "86px", lg: "96px" }} />
      <Box
        maxW={"1440px"}
        m={"auto"}
        w={"100%"}
        bg={"white"}
        px={{ base: "1rem" }}
        py={"60px"}
        className="mulish"
      >
        {isLoading && !blog && (
          <Stack spacing={4} p={4}>
            <Skeleton height="40px" />
            <Skeleton height="40px" />
            <Skeleton height="40px" />
          </Stack>
        )}
        {!isLoading && blog && (
          <>
            <Box w={"100%"} mb={"36px"} px={{ base: "20px", lg: "60px" }}>
              <Box
                width={"100%"}
                h={{ base: "300px", lg: "550px" }}
                mb={"36px"}
              >
                <Image
                  src={blog?.header_image || `/`}
                  width={"100%"}
                  height={"100%"}
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
                  richText={blog?.introduction}
                />
              </Box>
              <Box
                width={"100%"}
                h={{ base: "300px", lg: "550px" }}
                mb={"36px"}
              >
                <Image
                  src={blog?.body_image || `/`}
                  alt="blog"
                  width={"100%"}
                  height={"100%"}
                />
              </Box>
              <Box w={"100%"} mt={{ base: "40px", lg: "80px" }}>
                <BlogContent
                  fontWeight={400}
                  fontSize={{ base: "14px", lg: "16px" }}
                  textColor={"#4D4D4D"}
                  richText={blog?.body}
                />
              </Box>
              <Box w={"100%"} mt={{ base: "40px", lg: "80px" }}>
                <BlogContent
                  fontWeight={400}
                  fontSize={{ base: "14px", lg: "16px" }}
                  textColor={"#4D4D4D"}
                  richText={blog?.conclusion}
                />
              </Box>
            </Box>
          </>
        )}
        {!isLoading && !blog && (
          <Card mt={"60px"}>
            <CardBody>
              <Text>Blog post details not available please try again</Text>
            </CardBody>
          </Card>
        )}
        <Box w={"100%"} px={{ base: "20px", lg: "60px" }}>
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
      </Box>
    </Box>
  );
};
