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
  const [headerImage, setHeaderImage] = useState<File | undefined>();
  const [bodyImage, setBodyImage] = useState<File | undefined>();
  const [introValue, setIntroValue] = useState("");
  const [articleTitle, setArticleTitle] = useState("");
  const [bodyValue, setBodyValue] = useState("");
  const [conclusionValue, setConclusionValue] = useState("");
  const [headerImageFile, setHeaderImageFile] = useState("");
  const [bodyImageFile, setBodyImageFile] = useState("");

  const route = useRouter();

  console.log("headerImageFile", headerImageFile);
  console.log("bodyImageFile", bodyImageFile);
  useEffect(() => {
    localStorage.setItem("headerImageFile", headerImageFile);
  }, [headerImageFile]);

  useEffect(() => {
    localStorage.setItem("bodyImageFile", bodyImageFile);
  }, [bodyImageFile]);


  // const imageChangeHandler = (
  //   e: ChangeEvent<HTMLInputElement>,
  //   setImage: any
  // ) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     const file = e.target.files[0];

  //     console.log('file', file)
  //     setImage(file);

  //     if (file) {
  //       const reader = new FileReader();
  //       reader.onload = (event: ProgressEvent<FileReader>) => {
  //         const dataUrl = event.target?.result as string;
  //         localStorage.setItem("headerImage", dataUrl);
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   }
  // };
  
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
      <Flex align={"center"} justify={"space-between"}>
        <Text fontWeight={500} fontSize={".875rem"} className="mulish">
          Article Title
        </Text>
        <Input
          type="text"
          width={"700px"}
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
      <Flex align={"center"} justify={"space-between"} my="16px">
        <Text fontWeight={500} fontSize={".875rem"} className="mulish">
          Header Image
        </Text>
        <ImageUpload onImageChange={headerImageChange} setImageFile={setHeaderImageFile} />
      </Flex>
      <Flex align={"center"} justify={"space-between"} mb="20px">
        <Text fontWeight={500} fontSize={".875rem"} className="mulish">
          Introduction
        </Text>
        <Box pos={"relative"} mb="20px" w="700px">
          <ReactQuill
            value={introValue}
            onChange={setIntroValue}
            modules={modules}
            className="quill-style"
          />
        </Box>
      </Flex>
      <Flex align={"center"} justify={"space-between"} mb="20px">
        <Text fontWeight={500} fontSize={".875rem"} className="mulish">
          Body
        </Text>
        <Box pos={"relative"} mb="20px" w="700px">
          <ReactQuill
            value={bodyValue}
            onChange={setBodyValue}
            modules={modules}
            className="quill-style"
          />
        </Box>
      </Flex>
      <Flex align={"center"} justify={"space-between"} my="16px">
        <Text fontWeight={500} fontSize={".875rem"} className="mulish">
          Body Image
        </Text>
        <ImageUpload onImageChange={bodyImageChange} setImageFile={setBodyImageFile} />
      </Flex>
      <Flex align={"center"} justify={"space-between"} mb="20px">
        <Text fontWeight={500} fontSize={".875rem"} className="mulish">
          Conclusion
        </Text>
        <Box pos={"relative"} mb="20px" w="700px">
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
