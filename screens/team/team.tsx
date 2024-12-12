import { HeroPropsVideo } from "@/components/heroPropsVideo";
import NavBar from "@/components/navBar";
import { Box, Text, Grid, Image as ChakraImage } from "@chakra-ui/react";
import { Footer } from "@/components/footer";
import { Background } from "../home/Background";
import Image from "next/image";

const TeamScreen = () => {
  function scrollToSection() {
    const section = document.querySelector("#main") as HTMLElement;
    section.scrollIntoView({ behavior: "smooth" });
  }

  const Sales: any[] = [
    {
      id: 1,
      person: "Eziekel Omolayo",
      title: "Chief Executive Officer",
      department: "Managing Director",
      picture: "/ceo.png",
    },
    {
      id: 2,
      person: "Dare Adelaja",
      title: "Human Resources Manager",
      department: "Human Resources Department",
      picture: "/hr.png",
    },
    {
      id: 3,
      person: "Oluwatobi Omolayo",
      title: "Administrative Manager",
      department: "Administrative Department",
      picture: "/admin-manager.png",
    },

    {
      id: 4,
      person: "Alale Olatunbosun",
      title: "Field Manager",
      department: "Field & Construction Department",
      picture: "/field-manager.png",
    },
    {
      id: 5,
      person: "Linus Omotosho",
      title: "Sales & Marketing Executive",
      department: "Sales & marketing Department",
      picture: "/sales-marketing-exec.png",
    },
    {
      id: 6,
      person: "Ayobami busayo",
      title: "Sales and Marketing Executive",
      department: "Sales and marketing department",
      picture: "/sales-marketing.png",
    },
    {
      id: 7,
      person: "Jumoke Orimoloye",
      title: "Front desk officer",
      department: "Administrative department",
      picture: "/sales-rep.png",
    },
  ];

  return (
    <>
      <Box>
        <NavBar />
        <HeroPropsVideo
          bg={"#00000070"}
          header={"The e-Swift Team"}
          details={"Meet our dedicated team of real estate professionals."}
          buttonPos={null}
          w={"100%"}
          h={"100vh"}
          video={"/AboutVideo.mp4"}
          click={scrollToSection}
        />
        <Background />
        <Box
          id="main"
          py={"120px"}
          px={{ base: "1rem", lg: "4rem" }}
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          gap={"24px"}
          mb={"120px"}
        >
          <Box
            bg={"transparent"}
            w={"100%"}
            h={"fit-content"}
            className="antic"
            display={"flex"}
            alignItems={"center"}
            flexDir={"column"}
            py={{ base: "14px", md: "24px" }}
            borderRadius={"12px"}
            border={"1px solid #262626"}
            px={"20px"}
          >
            <Box maxW={"920px"} h={""}>
              <ChakraImage
                width={"100%"}
                height={"600px"}
                src={"/team/team.png"}
                alt="photo"
              />
            </Box>
          </Box>

          <Box
            w={"100%"}
            h={""}
            py={"54px"}
            className="antic"
            display={"flex"}
            alignItems={"center"}
            flexDir={"column"}
            my={"120"}
          >
            <Grid
              templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(1, 1fr)" }}
              gap={{ base: "24px", lg: "40px" }}
              mt={"80px"}
            >
              {Sales.slice(0, 1).map((item) => (
                <Box
                  key={item.id}
                  display={"flex"}
                  flexDir={"column"}
                  gap={"24px"}
                  maxW={"308px"}
                  h={"fit-content"}
                  p={"16px"}
                  borderRadius={"12px"}
                  border={"1px solid #262626"}
                  mx={"auto"} // Center the first item
                >
                  <Box
                    w={"100%"}
                    h={"290px"}
                    borderRadius={"15px"}
                    overflow={"hidden"}
                  >
                    <Image
                      src={`/team${item?.picture}`}
                      alt=""
                      width={275}
                      height={290}
                    />
                  </Box>
                  <Box
                    display={"flex"}
                    flexDir={"column"}
                    textAlign={"center"}
                    justifyContent={"start"}
                  >
                    <Text
                      fontWeight={700}
                      fontSize={"24px"}
                      textColor={"#000"}
                      className="robotoF"
                    >
                      {item?.person}
                    </Text>
                    <Text
                      textAlign={"center"}
                      fontWeight={400}
                      fontSize={"20px"}
                      textColor={"#000"}
                      className="robotoF"
                    >
                      {item?.title}
                    </Text>
                    <Text
                      textAlign={"center"}
                      fontWeight={400}
                      fontSize={"18px"}
                      textColor={"#000"}
                      className="antic"
          
                    >
                      {item?.department}
                    </Text>
                  </Box>
                </Box>
              ))}
              <Grid
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(3, 1fr)",
                }}
                gap={{ base: "24px", lg: "40px" }}
              >
                {Sales.slice(1).map((item) => (
                  <Box
                    key={item.id}
                    display={"flex"}
                    flexDir={"column"}
                    gap={"24px"}
                    maxW={"308px"}
                    h={"fit-content"}
                    p={"16px"}
                    borderRadius={"12px"}
                    border={"1px solid #262626"}
                  >
                    <Box
                      w={"100%"}
                      h={"290px"}
                      borderRadius={"15px"}
                      overflow={"hidden"}
                    >
                      <Image
                        src={`/team${item?.picture}`}
                        alt=""
                        width={275}
                        height={290}
                      />
                    </Box>
                    <Box
                      display={"flex"}
                      flexDir={"column"}
                      textAlign={"center"}
                      justifyContent={"start"}
                    >
                      <Text
                        fontWeight={700}
                        fontSize={"24px"}
                        textColor={"#000"}
                        className="robotoF"
                      >
                        {item?.person}
                      </Text>
                      <Text
                        textAlign={"center"}
                        fontWeight={400}
                        fontSize={"20px"}
                        textColor={"#000"}
                        className="robotoF"
                      >
                        {item?.title}
                      </Text>
                      <Text
                        textAlign={"center"}
                        fontWeight={400}
                        fontSize={"18px"}
                        textColor={`${item?.title === item?.department ?'transparent' :'#000'}`}
                        className="antic"
                      >
                        {item?.department}
                      </Text>
                    </Box>
                  </Box>
                ))}
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default TeamScreen;
