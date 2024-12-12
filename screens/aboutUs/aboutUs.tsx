import { HeroPropsVideo } from "@/components/heroPropsVideo";
import NavBar from "@/components/navBar";
import { Box, Text } from "@chakra-ui/react";
import { Video } from "./video";
import { Footer } from "@/components/footer";
import { Background } from "../home/Background";
import { AboutSection } from "./AboutPageSection";
import { MoreDetails } from "./MoreDetails";


const AboutUsScreen = () => {

  function scrollToSection() {
    const section = document.querySelector("#main") as HTMLElement;
    section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Box>
        <NavBar />
        <HeroPropsVideo
          bg={"#00000070"}
          header={"The e-Swift Dream"}
          details={
            "Explore our story and how we've become a trusted leader in the industry."
          }
          buttonPos={null}
          w={"100%"}
          h={"100vh"}
          video={"https://eswift-space-bucket.lon1.cdn.digitaloceanspaces.com/assets/AboutVideo.mp4"}
          click={scrollToSection}
        />
        <Background />
        <AboutSection />
        <Video />
        <Box
          id="main"
          py={{ base: "60px", lg: "120px" }}
          px={{ base: "1rem", lg: "4rem" }}
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          gap={"20px"}
          mb={"120px"}
        >
          <Text
            className="antic"
            fontSize={{ base: "24px", md: "32px", lg: "48px" }}
            textColor={"#3A3148"}
            fontWeight={400}
            maxW={"1240px"}
          >
            Why you should be a part of our dream?
          </Text>
          <Text
            className="roboto"
            fontSize={{ base: "16px", md: "24px", lg: "32px" }}
            fontWeight={300}
            textColor={"#827053"}
            maxW={"1000px"}
          >
            Your trusted partner in real estate solutions
          </Text>
          <MoreDetails />
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default AboutUsScreen;
