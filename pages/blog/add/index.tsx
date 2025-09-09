import Btn from "@/components/Btn";
import ImageUpload, { ImageData } from "@/components/ImageUpload";
import { PlusIcon, UploadIcon } from "@/components/svg";
import Wrapper from "@/components/Wrapper";
import useBlog from "@/hooks/useBlog";
import { Box, Flex, Input, Text } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useState } from "react";
// import ReactQuill from "react-quill";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    // [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    // ["link", "image"],
    ["clean"],
  ],
};

const AddBlog = () => {
  const [introValue, setIntroValue] = useState("");
  const [articleTitle, setArticleTitle] = useState("");
  const [bodyValue, setBodyValue] = useState("");
  const [conclusionValue, setConclusionValue] = useState("");
  const [headerImageFile, setHeaderImageFile] = useState("");
  const [bodyImageFile, setBodyImageFile] = useState("");

  const route = useRouter();

  useEffect(() => {
    localStorage.setItem("headerImageFile", headerImageFile);
  }, [headerImageFile]);

  useEffect(() => {
    localStorage.setItem("bodyImageFile", bodyImageFile);
  }, [bodyImageFile]);

  
  const previewData = {
    articleTitle: articleTitle,
    introValue: introValue,
    bodyValue: bodyValue,
    conclusionValue: conclusionValue,
  }

  const toPreview = () => {
    localStorage.setItem("previewData", JSON.stringify(previewData));
    route.push('/blog/preview');
  }

  const headerImageChange = (image: any) => {
    localStorage.setItem("headerImage", image?.dataUrl);
  };

  const bodyImageChange = (image: any) => {
    localStorage.setItem("bodyImage", image?.dataUrl);
  };

  return (
    <>
      <Flex align={{base: 'start', xl:"center"}} justify={"space-between"} flexDirection={{base: 'column', xl: 'row'}}>
        <Text fontWeight={500} fontSize={".875rem"} className="mulish">
          Article Title
        </Text>
        <Input
          type="text"
          width={{base: '100%', lg:"700px"}}
          pl="25px"
          py="15px"
          borderRadius={"7px"}
          className="mulish"
          value={articleTitle}
          onChange={(e) => setArticleTitle(e.target.value)}
          bgColor={"#F5F7FA"}
          border={0}
          placeholder="Type something here..."
          _placeholder={{
            color: "#667085",
            className: "mulish",
            fontWeight: 300,
            fontSize: ".625rem",
          }}
        />
      </Flex>
      <Flex align={{base: 'start', xl:"center"}} justify={"space-between"} my="16px" flexDirection={{base: 'column', xl: 'row'}}>
        <Text fontWeight={500} fontSize={".875rem"} className="mulish">
          Header Image
        </Text>
        <Box width={{base: '100%', xl: 'initial'}}>
      
        <ImageUpload onImageChange={headerImageChange} setImageFile={setHeaderImageFile} title={articleTitle} />
        </Box>
      </Flex>
      <Flex 
        align={{ base: 'start', xl: "center" }} 
        justify={"space-between"} 
        mb="20px" 
        flexDirection={{ base: 'column', xl: 'row' }}
      >
          <Text 
            whiteSpace={'nowrap'} 
            fontWeight={500} 
            fontSize={".875rem"} 
            className="mulish"
          >
            Introduction
          </Text>
          
          <Box 
            pos={"relative"} 
            mb="20px" 
            w={{ base: '100%', sm: '100%', md: "700px" }}
          >
            <ReactQuill
              value={introValue}
              onChange={setIntroValue}
              modules={modules}
              className="quill-style"
            />
        </Box>
      </Flex>

      <Flex 
          align={{ base: 'start', xl: "center" }} 
          justify={"space-between"} 
          mb="20px" 
          flexDirection={{ base: 'column', xl: 'row' }}
      >
        <Text fontWeight={500} fontSize={".875rem"} className="mulish">
          Body
        </Text>
        <Box pos={"relative"} mb="20px"  w={{ base: '100%', sm: '100%', md: "700px" }}>
          <ReactQuill
            value={bodyValue}
            onChange={setBodyValue}
            modules={modules}
            className="quill-style"
          />
        </Box>
      </Flex>
      <Flex align={{base: 'start', xl:"center"}}  justify={"space-between"} my="16px" flexDirection={{base: 'column', xl: 'row'}}>
        <Text fontWeight={500} fontSize={".875rem"} className="mulish">
          Body Image
        </Text>
        <Box width={{base: '100%', xl: 'initial'}}>
        <ImageUpload onImageChange={bodyImageChange} setImageFile={setBodyImageFile} title={articleTitle} />
        </Box>
      </Flex>
      <Flex align={{ base: 'start', xl: "center" }} justify={"space-between"} mb="20px"   flexDirection={{ base: 'column', xl: 'row' }}>
        <Text fontWeight={500} fontSize={".875rem"} className="mulish">
          Conclusion
        </Text>
        <Box pos={"relative"} mb="20px"   w={{ base: '100%', sm: '100%', md: "700px" }}>
          <ReactQuill
            value={conclusionValue}
            onChange={setConclusionValue}
            modules={modules}
            className="quill-style"
          />
        </Box>
      </Flex>
      <Flex align={"center"} justify={"space-between"} mb="20px">
        <Text fontWeight={500} fontSize={".875rem"} className="mulish"></Text>
        <Flex align={"center"} justify="center" mb="20px" w="700px">
          <Btn
            bgColor="#1A1D66"
            borderRadius={"8px"}
            w="248px"
            color="#fff"
            fontSize={".875rem"}
            fontWeight={500}
            className="inter"
            onClick={toPreview}
          >
            Preview
          </Btn>
        </Flex>
      </Flex>
    </>
  );
};

const index = () => {
  return (
    <Wrapper>
      <AddBlog />
    </Wrapper>
  );
};

export default index;
