import { HeroPropsVideo } from "@/components/heroPropsVideo";
import NavBar from "@/components/navBar";
import {
  Box,
  Card,
  CardBody,
  Grid,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Background } from "../home/Background";
import { TextHeader } from "../home/textHeader";
import { Footer } from "@/components/footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDebounce } from "@/hooks/useDebounce";
import { PropertyCardProps } from "../Property/propertyCard";
import { PropertiesCard } from "../properties/propertiesCard";
import useProperty from "@/hooks/useProperty";

const ProjectScreen = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [fetchData, setFetchData] = useState<PropertyCardProps[]>([]);
  const [page, setPage] = useState<number>(0);

  const debounce = useDebounce();
  const { getFavorites } = useProperty();
  useEffect(() => {
    const getPropertyFunction = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `/api/property?keyword=${""}&PageNumber=${page}`
        );
        setFetchData(data?.data?.filter((item: any) => item?.verification === "Verified" && item?.isProject));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    debounce(() => getPropertyFunction());
  }, [page]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const { data } = await getFavorites();
      } catch (error) {
        console.error("Failed to load favorites", error);
      }
    };

    fetchFavorites();
  }, []);
  function scrollToSection() {
    const section = document.querySelector("#main") as HTMLElement;
    section.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <>
      <Box>
        <NavBar />
        <Box pt={{ base: "10px" }}>
          <HeroPropsVideo
            bg={"#00000070"}
            fontSize={{ base: "30px", md: "42px", lg: "72px", xl: "80px" }}
            header={"Investment Opportunities"}
            details={
              "Secure your position in our carefully curated collection of high-potential developments."
            }
            buttonPos={null}
            w={"100%"}
            h={"100vh"}
            video={"/PropertiesVideo.mp4"}
            click={scrollToSection}
          />
        </Box>

        <Background />
        <Box
          id="main"
          py={"120px"}
          px={{ base: "1rem", lg: "5rem" }}
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          gap={"20px"}
        >
          <TextHeader
            Header={"Building Tomorrow's Landmarks Today"}
            sub={
              "Join our portfolio of exclusive investment opportunities where premium locations meet exceptional returns. Partner with us to transform visionary projects into lasting wealth."
            }
          />

          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              xl: "repeat(3, 1fr)",
            }}
            gap={"20px"}
            placeContent={"center"}
          >
            {isLoading && !fetchData && (
              <Stack spacing={4} p={4}>
                <Skeleton height="40px" />
                <Skeleton height="40px" />
                <Skeleton height="40px" />
              </Stack>
            )}

            {fetchData
              .map((data) => {
                return (
                  <PropertiesCard
                    key={data?._id}
                    {...data}
                    _id={data?._id}
                    view="client"
                  />
                );
              })}

            {!isLoading && fetchData?.length === 0 && (
              <Card mt={"60px"}>
                <CardBody>
                  <Text>No project found please try again</Text>
                </CardBody>
              </Card>
            )}
          </Grid>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default ProjectScreen;
