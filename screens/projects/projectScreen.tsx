import { HeroPropsVideo } from "@/components/heroPropsVideo";
import NavBar from "@/components/navBar";
import {
  Box,
  Card,
  CardBody,
  Grid,
  Input,
  InputGroup,
  InputRightElement,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Background } from "../home/Background";
import Btn from "@/components/Btn";
import { RiSearch2Line } from "react-icons/ri";
import { TextHeader } from "../home/textHeader";
import { Footer } from "@/components/footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDebounce } from "@/hooks/useDebounce";
import { PropertyCardProps } from "../Property/propertyCard";
import { PropertiesCard } from "../properties/propertiesCard";
import useProperty from "@/hooks/useProperty";

const ProjectScreen = () => {
  const [inputValue, setInputValue] = useState<string>("");
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
          `/api/property?keyword=${inputValue}&PageNumber=${page}`
        );
        setFetchData(data?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    debounce(() => getPropertyFunction());
  }, [page, inputValue]);

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
          <InputGroup
            display={"flex"}
            alignItems={"center"}
            border={"1px"}
            borderRadius={"10px"}
            bg={"#E2EDF3"}
            borderColor={"#26262630"}
            _focusWithin={{ border: "1.5px solid #3170A6" }}
            cursor={"search"}
            fontSize={{ base: 12, lg: 14 }}
            textColor={"var--(sub600)"}
            maxW="1020px"
            h={{ base: "52px", lg: "80px" }}
            className="urbanist"
            overflow={"hidden"}
          >
            <Input
              w={"80%"}
              h={"100%"}
              _placeholder={{
                textColor: "#666666",
                fontSize: { base: "10px", md: "14px", lg: "20px" },
              }}
              border={"none"}
              _focusVisible={"none"}
              type="search"
              placeholder="Search for a property by title, description or category"
              value={inputValue}
              onChange={(e: any) => setInputValue(e.target.value)}
            />
            <InputRightElement
              pointerEvents="none"
              w={"fit-content"}
              h={"max-content"}
              mt={{ base: 2.5, lg: 4 }}
              mx={{ base: 1, lg: 3 }}
              zIndex={30}
            >
              <Btn
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                W={{ base: "60px", lg: "148px" }}
                h={{ base: "32px", lg: "48px" }}
                bg={"#3170A6"}
                borderRadius={"8px"}
                textColor={"white"}
                gap={"8px"}
                _hover={{ opacity: 0.5 }}
                fontSize={{ base: "8px", lg: "14px" }}
              >
                <RiSearch2Line /> Find Prjects
              </Btn>
            </InputRightElement>
          </InputGroup>

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
              .filter((project) => project.isProject)
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

            {!isLoading && !fetchData && (
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
