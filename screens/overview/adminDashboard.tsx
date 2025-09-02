import {
  Box,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Select,
  Skeleton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";

import React, {  useEffect, useState } from "react";
import useUser from "@/hooks/useUser";
import Btn from "@/components/Btn";
import { Modal } from "@/components/modal";
import UserDrawer from "./UserDrawer";
import { HiOutlineHome } from "react-icons/hi2";
import { LuUser2, LuUsers2 } from "react-icons/lu";
import { useRouter } from "next/router";
import { PropertyCard, PropertyCardProps } from "../Property/propertyCard";
import useProperty from "@/hooks/useProperty";
import useToast from "@/hooks/useToast";

const DashboardScreen = () => {
  const navigate = useRouter();

  const [getProperty, setGetProperty] = useState<PropertyCardProps[]>([]);
  const [page, setPage] = useState<any>(1);
  const [totalPages, setTotalPages] = useState<any>(1);
  const [inputValue, setInputValue] = useState<any>("");
  const [showScreen, setShowScreen] = useState(1);
  const [loading, setLoading] = useState(false);
  const [table, setTable] = useState<any>(null);
  const [userEl, setUserEl] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "CLIENT",
  });
  const [propCount, setPropCount] = useState<Record<string, number>>({})
  const [loadingUser, setLoadingUser] = useState(false);
  const { addUser } = useUser();
    const toast = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name) {
      setUserData((prevDetails) => ({
        ...prevDetails,
        [name]: value, // Use the name from the target as the key
      }));
    }
  };

  const createUser = async () => {
    try {
      setUserData({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        role: "CLIENT",
      });
      const res = await addUser(userData);
      return res;
    } catch (err) {
      console.log("err", err);
    }
  };

  const { getUser, getUserById } = useUser();

  const getUserFn = async () => {
    setLoadingUser(true);
    try {
      const res: any = await getUser('');
      setTable(res?.data?.data);
    } catch (error) {
      toast.toast({
        status: "error",
        title: "Failed to fech users",
        description: 'An error occurred while fetching users',
      });
    } finally {
      setLoadingUser(false);
    }

  };

  useEffect(() => {
    getUserFn();
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const openDrawer = async (userId: string) => {
    onOpen();
    const res: any = await getUserById(userId);
    setUserEl(res?.data?.data);
  };

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const { getAdminProperty } = useProperty();

  const getPropertyFunction = async () => {
    setLoading(true);
    try {
      const getAllProperties = await getAdminProperty(inputValue, page);
      if (getAllProperties?.data?.data) {
        setGetProperty(getAllProperties?.data?.data);
        setTotalPages(getAllProperties.data?.pagination.pages);
      }
    } catch (error) {
      toast.toast({
        status: "error",
        title: "Failed to fech Properties",
        description: 'An error occurred while fetching Properties',
      });
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    const counts: Record<string, number> = {};
    table?.forEach((user: any) =>{
      const propertyCount = getProperty.filter((property) => {
        return property.creatorID === user._id;
      }).length;
      counts[user._id] = propertyCount 
    })
    setPropCount(counts)
  }, [getProperty, table])

  useEffect(() => {
    getPropertyFunction();
  }, [showModal]);

    const Affiliates = table?.filter((item:{role:string;}) => item?.role !== 'AFFILIATE');
  
  let PropertiesCount = getProperty?.length as number;
  let UsersCount = table?.length as number;
  let AffiliatesCount = Affiliates?.length as number;

  return (
    <Box w={"100%"}>
      <Flex w={"100%"} flexWrap={"wrap"} gap={"6px"} mb={"24px"}>
        <Flex
          w={{ base: "100%", md: "320px", xl: "340px" }}
          h={"90px"}
          borderBottom={"3px solid #3170A6"}
          px={"12px"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Flex w={"fit-content"} flexDir={"column"}>
            <Flex alignItems={"center"} gap={"24px"}>
              <Text
                fontWeight={500}
                fontSize={"15px"}
                className="montserrat"
                textColor={"#172B4C"}
              >
                {PropertiesCount}
              </Text>
            </Flex>
            <Text
              fontWeight={400}
              fontSize={"18px"}
              className="robotoF"
              textColor={"#808080"}
            >
              Properties
            </Text>
          </Flex>
          <Box fontSize={"40px"} fontWeight={500}>
            <HiOutlineHome />
          </Box>
        </Flex>
        <Flex
          w={{ base: "100%", md: "320px", xl: "340px" }}
          h={"90px"}
          borderBottom={"3px solid #3170A6"}
          px={"12px"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Flex w={"fit-content"} flexDir={"column"}>
            <Flex alignItems={"center"} gap={"24px"}>
              <Text
                fontWeight={500}
                fontSize={"15px"}
                className="montserrat"
                textColor={"#172B4C"}
              >
                {UsersCount}
              </Text>
            </Flex>
            <Text
              fontWeight={400}
              fontSize={"18px"}
              className="robotoF"
              textColor={"#808080"}
            >
              Users
            </Text>
          </Flex>
          <Box fontSize={"40px"} fontWeight={500}>
            <LuUsers2 />
          </Box>
        </Flex>
        <Flex
          w={{ base: "100%", md: "320px", xl: "340px" }}
          h={"90px"}
          borderBottom={"3px solid #3170A6"}
          px={"12px"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Flex w={"fit-content"} flexDir={"column"}>
            <Flex alignItems={"center"} gap={"24px"}>
              <Text
                fontWeight={500}
                fontSize={"15px"}
                className="montserrat"
                textColor={"#172B4C"}
              >
                {AffiliatesCount}
              </Text>
            </Flex>
            <Text
              fontWeight={400}
              fontSize={"18px"}
              className="robotoF"
              textColor={"#808080"}
            >
              Affiliates
            </Text>
          </Flex>
          <Box fontSize={"40px"} fontWeight={500}>
            <LuUser2 />
          </Box>
        </Flex>
      </Flex>
      <Flex gap={"20px"} w={"100%"}>
        <Flex w="100%" justifyContent={"space-between"} alignItems={"center"}>
          <Box w={"100%"} className="robotoF" mb={"24px"}>
            <Text
              fontWeight={500}
              textColor={"var(--strong950)"}
              fontSize={{ base: "14px", lg: "18px" }}
            >
              NEW USERS
            </Text>
            <Text
              fontWeight={400}
              textColor={"var(--sub600)"}
              fontSize={{ base: "10px", lg: "14px" }}
            >
              List of New Users on the platform
            </Text>
          </Box>
          <Btn
            onClick={() => navigate.push("/users")}
            w="68px"
            h="36px"
            bg={"white"}
            border="1px solid var(--soft200)"
            borderRadius={"8px"}
            textColor="(var--sub600)"
            fontSize={"14px"}
            fontWeight={500}
            className="robotoF"
          >
            See All
          </Btn>
        </Flex>
        <Modal onClose={toggleModal} isVisible={showModal} label="Add User">
          <FormControl>
            <Box pt="15px">
              <FormLabel className="robotoF" fontSize={".875rem"}>
                First Name
              </FormLabel>
              <Input
                className="robotoF"
                type="text"
                w="314px"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
              />
            </Box>
            <Box pt="15px">
              <FormLabel className="robotoF" fontSize={".875rem"}>
                Last Name
              </FormLabel>
              <Input
                className="robotoF"
                type="text"
                w="314px"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
              />
            </Box>
            <Box>
              <FormLabel className="robotoF" fontSize={".875rem"}>
                Email
              </FormLabel>
              <Input
                className="robotoF"
                type="email"
                w="314px"
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
            </Box>
            <Box pt="15px">
              <FormLabel className="robotoF" fontSize={".875rem"}>
                Password
              </FormLabel>
              <Input
                className="robotoF"
                type="text"
                w="314px"
                name="password"
                value={userData.password}
                onChange={handleChange}
              />
            </Box>
            <Box pt="15px" mb="20px">
              <FormLabel className="robotoF" fontSize={".875rem"}>
                User Type
              </FormLabel>
              <Select
                className="robotoF"
                name="role"
                w="314px"
                value={userData.role}
                onChange={handleChange}
              >
                <option value="CLIENT">ADMIN</option>
                <option value="GUEST">AFFILIATE</option>
              </Select>
            </Box>
            <Btn
              className="robotoF"
              type={"submit"}
              w="full"
              onClick={createUser}
            >
              Create User
            </Btn>
          </FormControl>
        </Modal>
      </Flex>
      <TableContainer mt="30px">
       {!loadingUser && table?.length > 0 && <Table size="sm">
          <Thead>
            <Tr bgColor={"#F5F7FA"}>
              {[
                "Full Name",
                "Email",
                "Phone No.",
                "Date Created",
                "Property",
                "User Type",
              ].map((item, key) => (
                <Th key={key} textTransform={"none"} p="8px">
                  <Text
                    className="robotoF"
                    color={"#525866"}
                    fontWeight={400}
                    fontSize={".875rem"}
                  >
                    {item}
                  </Text>
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody fontSize={".875rem"} fontWeight={400} className="robotoF">
            {table &&
              table.slice(0, 5).map((item: any) => (
                <Tr
                  key={item._id}
                  cursor={"pointer"}
                  onClick={() => openDrawer(item._id)}
                >
                  <Td color={"#0E121B"} py="12px">{`${item.firstName
                    .slice(0, 1)
                    .toUpperCase()}${item.firstName.slice(
                    1,
                    item.firstName.length
                  )} ${item.lastName
                    .slice(0, 1)
                    .toUpperCase()}${item.lastName.slice(
                    1,
                    item.firstName.length
                  )}`}</Td>
                  <Td color={"#525866"} py="12px">
                    {item.email}
                  </Td>
                  <Td color={"#525866"} py="12px">
                    {item.phoneNumber || "N/A"}
                  </Td>
                  <Td color={"#525866"} py="12px">
                    {item.createdAt.split("T")[0]}
                  </Td>
                  <Td color={"#525866"} py="12px">
                    {propCount[item._id] ?? 0}
                  </Td>
                  <Td color={"#525866"} py="12px">
                    {item.role}
                  </Td>
                </Tr>
              ))}
            <UserDrawer
              isOpen={isOpen}
              onClose={onClose}
              btnRef={btnRef}
              userEl={userEl}
              propCount={propCount}
            />
          </Tbody>
        </Table>}
      {loadingUser && (
        <Stack spacing={4} mt="30px">
          <Skeleton height='30px' />
          <Skeleton height='30px' />
          <Skeleton height='30px' />
        </Stack>
      )}
      {table?.length === 0 && !loadingUser && (
        <Container>
          <Text fontSize={".875rem"} color={"#525866"} mt="30px">
            No user found
          </Text>
        </Container>
      )}
      </TableContainer>
      <Box w={"100%"} my={"24px"}>
        <Flex w="100%" justifyContent={"space-between"} alignItems={"center"}>
          <Box w={"100%"} className="robotoF" mb={"24px"}>
            <Text
              fontWeight={500}
              textColor={"var(--strong950)"}
              fontSize={{ base: "14px", lg: "18px" }}
            >
              Verified Properties
            </Text>
            <Text
              fontWeight={400}
              textColor={"var(--sub600)"}
              fontSize={{ base: "10px", lg: "14px" }}
            >
              Preview of some verified properties
            </Text>
          </Box>
          <Btn
            onClick={() => navigate.push("/property")}
            w="68px"
            h="36px"
            bg={"white"}
            border="1px solid var(--soft200)"
            borderRadius={"8px"}
            textColor="(var--sub600)"
            fontSize={"14px"}
            fontWeight={500}
            className="robotoF"
          >
            See All
          </Btn>
        </Flex>
        <Box
        // overflowY={{ xl: "scroll" }}
        // height={{ xl: "calc(80vh - 100px)" }}
        // mt={4}
        >
          {!loading && getProperty?.length > 0 && (
            <Grid
              overflowY={{ base: "scroll" }}
              w={"fit-content"}
              mt={4}
              templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
                xl: "repeat(3, 1fr)",
              }}
              gap={{ base: "24px", lg: "28px" }}
              paddingBottom={{ base: "20rem", lg: "3rem", xl: "6rem" }}
              placeItems={"center"}
            >
              {getProperty.slice(0, 3).map((property, index) => {
                const user = table?.find((u: any) => u._id === property?.creatorID);
                
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
          {loading && (
            <Stack spacing={4} mt="30px">
              <Skeleton height='30px' />
              <Skeleton height='30px' />
              <Skeleton height='30px' />
            </Stack>
          )}
          {getProperty?.length === 0 && !loading && (
            <Container>
              <Text fontSize={".875rem"} color={"#525866"} mt="30px">
                No verified property found
              </Text>
            </Container>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardScreen;
