import Btn from "@/components/Btn";
import ImageUpload, { ImageData } from "@/components/ImageUpload";
import { PlusIcon, UploadIcon } from "@/components/svg";
import Wrapper from "@/components/Wrapper";
import useBlog from "@/hooks/useBlog";
import useToast from "@/hooks/useToast";
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

const EditBlog = () => {
  const [headerImage, setHeaderImage] = useState<File | undefined>();
  const [bodyImage, setBodyImage] = useState<File | undefined>();
  const [blogDetails, setBlogDetails] = useState<any>({});
  const [introValue, setIntroValue] = useState(blogDetails?.introduction ?? "");
  const [articleTitle, setArticleTitle] = useState(blogDetails?.title || "");
  const [bodyValue, setBodyValue] = useState(blogDetails?.body || "");
  const [conclusionValue, setConclusionValue] = useState(
    blogDetails?.conclusion || ""
  );
  const [loading, setLoading] = useState(false);
  const [headerImageFile, setHeaderImageFile] = useState("");
  const [bodyImageFile, setBodyImageFile] = useState("");

  const { getBlogByID, updateBlog } = useBlog();
  const { toast } = useToast();

  const route = useRouter();

  const { blogId } = route.query;

  const blogData = {
    title: articleTitle || blogDetails?.title,
    introduction: introValue || blogDetails?.introduction,
    body: bodyValue || blogDetails?.body,
    conclusion: conclusionValue || blogDetails?.conclusion,
    header_image: headerImageFile || blogDetails?.header_image,
    body_image: bodyImageFile || blogDetails?.body_image,
  };

  const newBlogId = blogId as string;

  console.log("blogDetails", blogDetails);

  useEffect(() => {
    const getBlogByIdFn = async () => {
      try {
        const req: any = await getBlogByID(newBlogId);
        // console.log('req', req);
        setBlogDetails(req?.data);
      } catch (err) {
        console.log("err", err);
      }
    };

    getBlogByIdFn();
  }, [blogId]);

  const EditBlog = async () => {
    try {
      setLoading(true);
      const req = await updateBlog(blogDetails._id, blogData);
      // console.log('req', req);
      toast({
        status: "success",
        title: "Edit successful",
      });
      route.push("/blog");
    } catch (err) {
      // console.log("err", err);
      toast({
        status: "error",
        title: "Edit bog post failed",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleHeaderImageChange = (url: string) => {
    setBlogDetails({
      ...blogDetails,
      header_image: url,
    });
  };

  const handleBodyImageChange = (url: string) => {
    setBlogDetails({
      ...blogDetails,
      body_image: url,
    });
  };

  // console.log("articleTitle", articleTitle);
  // console.log("bodyValue", bodyValue);
  // console.log("introValue", introValue);
  // console.log("conclusionValue", conclusionValue);

  // const toPreview = () => {
  //   localStorage.setItem("previewData", JSON.stringify(previewData));
  //   route.push('/blog/preview');
  // }

  // const headerImageChange = (image: any) => {
  //   localStorage.setItem("headerImage", image?.dataUrl);
  // };

  // const bodyImageChange = (image: any) => {
  //   localStorage.setItem("bodyImage", image?.dataUrl);
  // };

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
          value={articleTitle || blogDetails?.title}
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
        <ImageUpload
          initialImageUrl={blogDetails?.header_image}
          setImageFile={setHeaderImageFile}
        />
      </Flex>
      <Flex align={"center"} justify={"space-between"} mb="20px">
        <Text fontWeight={500} fontSize={".875rem"} className="mulish">
          Introduction
        </Text>
        <Box pos={"relative"} mb="20px" w="700px">
          <ReactQuill
            value={introValue || blogDetails?.introduction}
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
            value={bodyValue || blogDetails?.body}
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
        <ImageUpload
          initialImageUrl={blogDetails?.body_image}
          setImageFile={setBodyImageFile}
        />
      </Flex>
      <Flex align={"center"} justify={"space-between"} mb="20px">
        <Text fontWeight={500} fontSize={".875rem"} className="mulish">
          Conclusion
        </Text>
        <Box pos={"relative"} mb="20px" w="700px">
          <ReactQuill
            value={conclusionValue || blogDetails?.conclusion}
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
            onClick={EditBlog}
            isLoading={loading}
          >
            Edit
          </Btn>
        </Flex>
      </Flex>
    </>
  );
};

const index = () => {
  return (
    <Wrapper>
      <EditBlog />
    </Wrapper>
  );
};

export default index;
