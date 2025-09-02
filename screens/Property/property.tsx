import {
  Flex,
  Box,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Grid,
  Stack,
  Skeleton,
  Card,
  CardBody,
} from "@chakra-ui/react";
import Btn from "@/components/Btn";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { SearchIcon } from "../../components/svg";
import useProperty from "@/hooks/useProperty";
import { PropertyCard, PropertyCardProps } from "./propertyCard";
import { DocumentTypes } from "@/utils/types";
import { IoFilter } from "react-icons/io5";
import { AddProperties } from "./Add";
import useUser from "@/hooks/useUser";
import { useAppContext } from "@/context";

interface User {
  _id: any;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  avatar: any;
  role: string;
}

export type Documents = {
  [K in DocumentTypes]: File | null;
};

export const PropertyScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [getProperty, setGetProperty] = useState<PropertyCardProps[]>([]);
  const [propertyEl, setPropertyEl] = useState<PropertyCardProps[]>([]);
  const [page, setPage] = useState<any>(1);
  const [totalPages, setTotalPages] = useState<any>(1);
  const [inputValue, setInputValue] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const { getAdminProperty } = useProperty();

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const getPropertyFunction = async () => {
    setLoading(true);
    try {
      const { data } = await getAdminProperty(inputValue, page);

      const propertiesToAdd = data?.data.filter((prop: PropertyCardProps) => {
        return getProperty.findIndex((index) => index._id === prop._id) === -1;
      });

      setGetProperty((prev) => [...prev, ...propertiesToAdd]);
      setPropertyEl(data?.data);

      setTotalPages(data?.pagination.pages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      getPropertyFunction();
    }
  };

  const { getUser, getUserById } = useUser();
  const { setGlobalContext } = useAppContext();
  const getUserFn = async () => {
    try {
      const res: any = await getUser("");
      setUsers(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserFn();
  }, [showModal, inputValue, page]);

  useEffect(() => {
    getPropertyFunction();
  }, [showModal, inputValue, page]);

  return (
    <>
      <AddProperties showModal={showModal} setShowModal={setShowModal} />
      <Box className="robotoF" px={{ base: "16px", lg: "20px" }} width={"100%"}>
        <Flex
          mb={"24px"}
          // mt={"10px"}
          gap={"12px"}
          w={"100%"}
          h={{ base: "fit-content", md: "36px" }}
          position="sticky"
          top="0"
          zIndex="10"
          bg="white"
          mt="2em"
        >
          <Flex w={{ base: "100%", lg: "60%", xl: "100%" }}>
            <InputGroup
              display={"flex"}
              alignItems={"center"}
              border={"1px"}
              borderRadius={"8px"}
              borderColor={"var(--soft200)"}
              cursor={"search"}
              fontSize={14}
              textColor={"var--(sub600)"}
              w="100%"
              h={{ base: "36px", md: "100%" }}
              _placeholder={{ textColor: "var--(soft400)" }}
            >
              <InputLeftElement
                color={"var(--soft400)"}
                h="100%"
                display={"flex"}
                alignItems={"center"}
              >
                <Box onClick={getPropertyFunction}>
                  <SearchIcon />
                </Box>
              </InputLeftElement>
              <Input
                w={"100%"}
                h={"100%"}
                type="search"
                placeholder="Search..."
                value={inputValue}
                onChange={(e: any) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </InputGroup>
          </Flex>
          <Flex
            gap={"12px"}
            flexDir={{ base: "column", sm: "row" }}
            alignItems={"end"}
          >
            <Btn
              onClick={toggleModal}
              display={"flex"}
              gap={"4px"}
              alignItems={"center"}
              bg={"#fff"}
              h={{ base: "36px", md: "100%" }}
              w={"131px"}
              border={"1px solid var(--soft200)"}
              borderRadius={"8px"}
              textColor={"var--(sub600)"}
              fontWeight={500}
              fontSize={"14px"}
              px={"6px"}
              pt={"0"}
              pb={"0"}
              _hover={{
                bg: "#1A1D66",
                textColor: "#FFF",
              }}
            >
              <Text fontSize={"14px"}>Add Listing</Text>
              <BsPlus className="icon" />
            </Btn>
            <Btn
              onClick={() => setPage(inputValue)}
              display={"flex"}
              gap={"4px"}
              alignItems={"center"}
              bg={"#fff"}
              h={{ base: "36px", md: "100%" }}
              w={"80px"}
              border={"1px solid var(--soft200)"}
              borderRadius={"8px"}
              textColor={"var--(sub600)"}
              fontWeight={500}
              fontSize={"14px"}
              px={"6px"}
              pt={"0"}
              pb={"0"}
              _hover={{
                bg: "#1A1D66",
                textColor: "#FFF",
              }}
            >
              <IoFilter className="icon" />
              <Text>Filter</Text>
            </Btn>
          </Flex>
        </Flex>

        {/* Scrollable Property Cards Container */}
        <Box
        // overflowY={{ xl: "auto" }}
        // height={{ xl: "520px" }}
        // mt={4}
        >
          {loading && (
            <Stack>
              <Skeleton height="40px" />
              <Skeleton height="40px" />
              <Skeleton height="40px" />
            </Stack>
          )}

          {!loading && propertyEl?.length > 0 && (
            <Grid
              w={"fit-content"}
              templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
                xl: "repeat(3, 1fr)",
                "2xl": "repeat(4, 1fr)",
              }}
              gap={{ base: "24px", lg: "28px" }}
              paddingY={"2rem"}
            >
              {propertyEl.map((property, index) => {
                const user = users.find((u) => u._id === property?.creatorID);

                return (
                  <PropertyCard
                    key={index}
                    _id={property?._id}
                    images={property?.images}
                    title={property?.title}
                    price={property?.price}
                    address={property?.address}
                    verificationState={property?.verification}
                    userImage={user?.avatar || "/"}
                    email={user?.email}
                    user={user?.firstName}
                    count={page}
                  />
                );
              })}
            </Grid>
          )}
          {!loading && propertyEl?.length === 0 && (
            <Card>
              <CardBody>
                <Text>No property available or reload</Text>
              </CardBody>
            </Card>
          )}
        </Box>
      </Box>
      {!loading && propertyEl?.length > 0 && (
        <Box
          display={"flex"}
          alignItems={"center"}
          flexDir={{ base: "column", md: "row" }}
          justifyContent={{ base: "center", md: "space-between" }}
          mt={{ base: "14px", md: "10px" }}
          gap={{ base: "1rem", md: "0rem" }}
          px={"20px"}
          py={"20px"}
        >
          <Text
            fontSize={"14px"}
            color={"#525866"}
            className="inter"
          >{`page ${page} of ${totalPages}`}</Text>

          <Box></Box>
        </Box>
      )}
    </>
  );
};
