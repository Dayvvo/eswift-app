import {
  Box,
  Card,
  CardBody,
  Flex,
  HStack,
  Img,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { PlusIcon, SearchIcon } from "../../components/svg";
import Btn from "../../components/Btn";
import { useRouter } from "next/router";
import useBlog from "@/hooks/useBlog";
import DOMPurify from "dompurify";
import useToast from "@/hooks/useToast";
import { useDebounce } from "@/hooks/useDebounce";
import Pagination from "@/components/Pagination";
import { Modal } from "@/components/modal";
import { TruncatedText } from "@/components/TruncatedText";
import Image from "next/image";
// import { useAppContext } from "@/context";

interface BlogPostProps {
  _id: any;
  title: string;
  header_image: string;
  introduction: string;
  body: string;
  body_image: string;
  createdAt: any;
}

const BlogScreen = () => {
  const [blogPost, setBlogPost] = useState<BlogPostProps[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<BlogPostProps | null>(null);
  const [isAdmin, setIsAdmin] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState<string>("");
  const { toast } = useToast();

  // const { check } = useAppContext();
  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };
  const { deleteBlog, getBlog } = useBlog();

  const debounce = useDebounce();

  const getBlogFn = async () => {
    setLoading(true);
    try {
      const req = await getBlog(search);
      let data = req?.data as BlogPostProps[];
      setBlogPost(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
    // console.log("req", req?.data);
  };

  useEffect(() => {
    // debounce(() => getBlogFn())
    getBlogFn();
  }, [search]);

  const [currentPage, setCurrentPage] = useState(1);
  const totalCount = 9;
  const lastRowsIndex = currentPage * totalCount;
  const firstRowsIndex = lastRowsIndex - totalCount;
  const currentBlogsInView =
    blogPost && blogPost?.slice(firstRowsIndex, lastRowsIndex);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      getBlogFn();
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("userData") || null;

    if (userData) {
      const parsedData = JSON.parse(userData);
      setIsAdmin(parsedData.user.role);
    }
  }, []);

  const deleteBlogModal = () => {};

  const deleteBlogFn = async (blogPostId: any) => {
    try {
      const req = (await deleteBlog(blogPostId)) as any;

      // if(req.statusCode)
      // const req = (await addBlog(data)) as any;
      if (req.data?.statusCode === 200) {
        toast({
          status: "success",
          description: "Blog post deleted",
          title: "Success",
          position: "top",
          duration: 5000,
        });
        setShowModal(false);
        setBlogPost((prevBlogPost) =>
          prevBlogPost.filter((post) => post._id !== blogPostId)
        );
      }
    } catch (err) {
      console.log("error calling post", err);
      toast({
        status: "error",
        description: "Failed to delete blog post",
        title: "Failed",
        position: "top",
        duration: 5000,
      });
    }
  };

  const route = useRouter();

  return (
    <>
      <Flex gap={"20px"} mt={"20px"}>
        <InputGroup>
          <InputLeftElement onClick={getBlogFn}>
            <SearchIcon />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search..."
            border={"1px solid #E1E4EA"}
            value={search}
            onChange={(e: any) => setSearch(e.target.value)}
            onKeyDown={handleKeyPress}
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
            onClick={() => route.push("/blog/add")}
          >
            Add Blog
          </Btn>
        </Box>
      </Flex>
      {loading && (
        <Stack marginTop={"50px"}>
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
        </Stack>
      )}
      {!loading && blogPost?.length > 0 && (
        <>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5} mt="20px">
            {currentBlogsInView.map((item, index) => {
              const dateString = new Date(item.createdAt);
              const formattedDate = dateString.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              });
              return (
                <Box key={index}>
                  <Modal
                    onClose={toggleModal}
                    isVisible={showModal}
                    label={`Delete ${selectedBlog?.title}`}
                  >
                    <Box className="robotoF">
                      <Text>
                        Are you sure you want to delete{" "}
                        <strong>{selectedBlog?.title}</strong> blog post?
                      </Text>
                      <HStack justify={"center"} mt="15px">
                        <Btn
                          bgColor="#6AFFB0"
                          borderRadius={"50px"}
                          className="urbanist"
                          fontWeight={400}
                          fontSize={".937rem"}
                          w="144px"
                          h="28px"
                          onClick={() => deleteBlogFn(selectedBlog?._id)}
                        >
                          Yes
                        </Btn>
                        <Btn
                          bgColor="#FF5764"
                          borderRadius={"50px"}
                          className="urbanist"
                          fontWeight={400}
                          fontSize={".937rem"}
                          w="144px"
                          h="28px"
                          onClick={toggleModal}
                        >
                          No
                        </Btn>
                      </HStack>
                    </Box>
                  </Modal>
                  <Box
                    key={index}
                    bgColor={"#fff"}
                    maxW={{ base: "100%", sm: "340px" }}
                    borderTopRadius={"12px"}
                    // boxShadow={
                    //   "0px 17.579px 52.738px 0px rgba(133, 133, 133, 0.10)"
                    // }
                    // boxShadow="0 6px 18px rgba(0, 0, 0, 0.06)"
                    boxShadow="0 8px 30px rgba(0, 0, 0, 0.1)"
                    // boxShadow="4px 4px 10px rgba(0, 0, 0, 0.1), -4px -4px 10px rgba(255, 255, 255, 0.6)"
                    // border={"1px solid #E1E4EA"}
                    // borderRadius={"12px"}
                    display="flex"
                    flexDirection="column" // Ensure the content stacks vertically
                    flexBasis={1}
                  >
                    {/* <Box w="100%" borderRadius={"7px 7px 0 0"}>
                      <Img src={item.header_image} alt={item.title} w="100%" />
                    </Box> */}
                    <Flex
                      position={"relative"}
                      w="100%"
                      h={{ base: "280px", lg: "306px" }}
                      mb={{ base: "20px", lg: "40px" }}
                    >
                      <Image
                        style={{ borderRadius: "12px 12px 0 0" }}
                        width={1000}
                        height={1000}
                        src={item.header_image || "/blogdumy.png"}
                        alt={"project"}
                      />
                      {/* <Img src={picture} alt={title} w="100%" /> */}
                    </Flex>
                    <Box
                      flex="1"
                      // p="10px"
                      display="flex"
                      flexDirection="column"
                      justifyContent="space-between"
                    >
                      {/* Flex and justify space-between ensure the buttons stay at the bottom */}
                      <Box flex={1} p="20px 10px">
                        <Text
                          className="mulish"
                          fontWeight={700}
                          color={"#4D4D4D"}
                          fontSize={".937rem"}
                        >
                          {item.title}
                        </Text>
                        {/* <Text
                        className="mulish"
                        fontWeight={400}
                        color={"#797979"}
                        fontSize={".75rem"}
                        my="20px"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(item.introduction),
                        }}
                      /> */}
                        <TruncatedText
                          text={item.introduction}
                          maxLength={50}
                        />
                        <Text
                          className="mulish"
                          fontWeight={400}
                          color={"#797979"}
                          fontSize={".75rem"}
                        >
                          {formattedDate}
                        </Text>
                      </Box>
                      {isAdmin === "ADMIN" && (
                        <Flex
                          justify={"space-between"}
                          gap={"6px"}
                          mt="auto"
                          py="20px"
                          px="10px"
                        >
                          <Btn
                            bgColor="#6AFFB0"
                            borderRadius={"50px"}
                            className="robotoF"
                            cursor={"pointer"}
                            fontWeight={400}
                            fontSize={".937rem"}
                            w="144px"
                            h="28px"
                            onClick={() =>
                              route.push(`/blog/edit?blogId=${item._id}`)
                            }
                          >
                            Edit
                          </Btn>
                          <Btn
                            bgColor="#FF5764"
                            borderRadius={"50px"}
                            className="robotoF"
                            fontWeight={400}
                            fontSize={".937rem"}
                            w="144px"
                            h="28px"
                            onClick={() => {
                              setSelectedBlog(item);
                              toggleModal();
                            }}
                          >
                            Delete
                          </Btn>
                        </Flex>
                      )}
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </SimpleGrid>
        </>
      )}
      {blogPost?.length > totalCount && (
        <VStack align={"start"} gap="15px" mt="10px">
          <div className="">
            Showing {firstRowsIndex + 1} to {lastRowsIndex}
          </div>

          <Pagination
            rowsPerPage={5}
            totalPostLength={blogPost?.length}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </VStack>
      )}
      {!loading && blogPost?.length === 0 && (
        <Card mt="1em">
          <CardBody>
            <Text>No blog post available please wait</Text>
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default BlogScreen;
