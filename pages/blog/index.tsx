import Wrapper from "@/components/Wrapper";
import useAuth from "@/hooks/useAuth";
import BlogScreen from "@/screens/Blog/admin";
import { useRouter } from "next/router";
// import { Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";



const Blog = () => {
 
  return (
    <Wrapper>
      <BlogScreen />
    </Wrapper>
  );
};

export default Blog;
