import { HeroPropsVideo } from "@/components/heroPropsVideo";
import NavBar from "@/components/navBar";
import {
  Box,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { BlogCard } from "./blogsCard";
import { useEffect, useState } from "react";
import useBlog from "@/hooks/useBlog";
import { Background } from "../home/Background";
import { LoadMore } from "@/components/LoadMore";
import { Footer } from "@/components/footer";
import { useRouter } from "next/router";

export interface BlogPostProps {
  _id: any;
  title: string;
  header_image: string;
  introduction: string;
  body: string;
  body_image: string;
  createdAt: any;
}

const BlogspotScreen = () => {
  const navigate = useRouter();
  const [blogPost, setBlogPost] = useState<BlogPostProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<number>(1);
  const { getBlog } = useBlog();

  function scrollToSection() {
    const section = document.querySelector("#main") as HTMLElement;
    section.scrollIntoView({ behavior: "smooth" });
  }

  console.log("blogPost", blogPost);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (blogPost.length === 0) {
      onOpen();
    }
  }, [blogPost, onOpen]);

  useEffect(() => {
    const getBlogFn = async () => {
      setLoading(true);
      try {
        const req = await getBlog();

        setBlogPost(req?.data);
        setLoading(false);
        console.log("req", req);
      } catch (error) {
        setLoading(false);
      }
    };

    getBlogFn();
  }, []);
  return (
    <Box>
      <NavBar />
      <HeroPropsVideo
        bg={"#00000070"}
        click={scrollToSection}
        header={"Blog"}
        details={"Your Source for Real Estate Insights and Tips"}
        buttonPos={null}
        w={"100%"}
        h={"100vh"}
        video={"/PropertiesVideo.mp4"}
      />
      <Background />
      <Box
        id="blogs"
        py={"70px"}
        px={{ base: "1rem", lg: "4rem" }}
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
        gap={"20px"}
        mb={"120px"}
      >
        {blogPost.length > 0 ? (
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
            gap={{ base: "24px", lg: "60px" }}
          >
            {blogPost &&
              blogPost.map((item) => {
                return (
                  <BlogCard
                    key={item?._id}
                    id={item?._id}
                    picture={item?.header_image}
                    title={item?.title}
                    details={item?.introduction}
                    date={item?.createdAt}
                  />
                );
              })}
          </Grid>
        ) : (
          <>
            <Text className="robotoF">No Blogs Found</Text>
          </>
        )}

        <LoadMore click={() => page + 1} />
      </Box>
      <Footer />
    </Box>
  );
};

export default BlogspotScreen;
