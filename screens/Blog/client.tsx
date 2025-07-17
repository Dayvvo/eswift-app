import { HeroPropsVideo } from "@/components/heroPropsVideo";
import NavBar from "@/components/navBar";
import { Box, Grid, Text } from "@chakra-ui/react";
import { BlogCard } from "./blogsCard";
import { useEffect, useState } from "react";
import useBlog from "@/hooks/useBlog";
import { Background } from "../home/Background";
import { LoadMore } from "@/components/LoadMore";
import { Footer } from "@/components/footer";

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
  const [blogPost, setBlogPost] = useState<BlogPostProps[]>([]);

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<number>(1);
  const { getBlog } = useBlog();

  function scrollToSection() {
    setTimeout(() => {
      const section = document.querySelector("#blogs") as HTMLElement;
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      } else {
        console.error("Section not found!");
      }
    }, 100);
  }

  useEffect(() => {
    const getBlogFn = async () => {
      setLoading(true);
      try {
        const req = await getBlog("");
        setBlogPost(req?.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    getBlogFn();
  }, []);

  return (
    <Box>
      <NavBar />
      <Box pt={{ base: "10px" }}>
        <HeroPropsVideo
          bg={"#00000070"}
          header={"Blog"}
          details={"Your Source for Real Estate Insights and Tips"}
          buttonPos={null}
          w={"100%"}
          h={"100vh"}
          video={"/PropertiesVideo.mp4"}
          click={scrollToSection}
        />
      </Box>
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
        {blogPost && blogPost?.length > 0 ? (
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
