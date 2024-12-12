import {
    Box,
    Button,
    Card,
    CardBody,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    Input,
    InputGroup,
    InputLeftElement,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
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
  
  import React, { FormEvent, useEffect, useState } from "react";
  import { ActionIcon, FilterIcon, SearchIcon } from "../../components/svg";
  import axios from "axios";
  import { useApiUrl } from "@/hooks/useApi";

  import useUser from "@/hooks/useUser";
  import Btn from "@/components/Btn";
  import { Modal } from "@/components/modal";
import UserDrawer from "./UserDrawer";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { HiOutlineHome } from "react-icons/hi2";
import { LuUser2, LuUsers2 } from "react-icons/lu";
import { useRouter } from "next/router";
import users from "@/pages/users";
import { PropertyCard, PropertyCardProps } from "../Property/propertyCard";
import useProperty from "@/hooks/useProperty";
  
interface MyData {
    _id: any;
    title: string;
    price: string;
    address: string;
    email: string;
    owner: string;
    userImage: string;
    verificationState: string;
    images: any;
    creatorID: any;
};
interface User {
    _id: any;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number;
    avatar: any;
};
  
  const DashboardScreen = () => {
    const navigate = useRouter()
    
  const [getProperty, setGetProperty] = useState<PropertyCardProps[]>([]);
  const [users, setUsers] = useState<User[]>([]);
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
 
  const { addUser } = useUser()
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    if (name) {
      setUserData((prevDetails) => ({
        ...prevDetails,
        [name]: value,  // Use the name from the target as the key
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
    }
    catch (err) {
      console.log('err', err)
    }
    
  }

  const { getUser, getUserById } = useUser();
  console.log("userEl", userEl);

  const getUserFn = async () => {
    const res: any = await getUser();
    setTable(res?.data?.data);
  };

  useEffect(() => {
    getUserFn();
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const openDrawer = async (userId: string) => {
    onOpen();
    const res: any = await getUserById(userId);
    console.log("res", res);
    setUserEl(res?.data?.data);
  };

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };
    
  const { addProperty, getAdminProperty } = useProperty();

  const getPropertyFunction = async () => {
      setLoading(true);
      try {
        setLoading(false);
        const getAllProperties = await getAdminProperty(inputValue);
        setGetProperty(getAllProperties?.data?.data);
        console.log(getAllProperties?.data?.data);
        setTotalPages(getAllProperties.data?.pagination.pages);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
  };

  useEffect(() => {
      getPropertyFunction();
  }, [showModal, loading]);
  
  let PropertiesCount = 100;
  let UsersCount = 20;
  let AffiliatesCount = 3000;

    return (
      <Box w={'100%'}>
        <Flex w={'100%'} flexWrap={'wrap'} gap={'6px'} mb={'24px'}>

            <Flex w={{base:'100%',md:'320px',xl:'340px'}} h={'90px'} borderBottom={'3px solid #3170A6'}
                px={'12px'} alignItems={'center'} justifyContent={'space-between'}
            >
                <Flex w={'fit-content'} flexDir={'column'}>
                    <Flex alignItems={'center'} gap={'24px'}>
                        <Text fontWeight={500} 
                            fontSize={'15px'}
                            className="montserrat"
                            textColor={'#172B4C'}
                        >
                            {PropertiesCount}
                        </Text>
                    </Flex>
                    <Text fontWeight={400} 
                        fontSize={'18px'}
                        className="robotoF"
                        textColor={'#808080'}
                    >
                        Properties
                    </Text>
                </Flex>
                <Box
                    fontSize={'40px'}
                    fontWeight={500}
                >
                    <HiOutlineHome />
                </Box>
            </Flex>
            <Flex w={{base:'100%',md:'320px',xl:'340px'}} h={'90px'} borderBottom={'3px solid #3170A6'}
                px={'12px'} alignItems={'center'} justifyContent={'space-between'}
            >
                <Flex w={'fit-content'} flexDir={'column'}>
                    <Flex alignItems={'center'} gap={'24px'}>
                        <Text fontWeight={500} 
                            fontSize={'15px'}
                            className="montserrat"
                            textColor={'#172B4C'}
                        >
                            {UsersCount}
                        </Text>
                    </Flex>
                    <Text fontWeight={400} 
                        fontSize={'18px'}
                        className="robotoF"
                        textColor={'#808080'}
                    >
                        Users
                    </Text>
                </Flex>
                <Box
                    fontSize={'40px'}
                    fontWeight={500}
                >
                    <LuUsers2 />
                </Box>
            </Flex>
            <Flex w={{base:'100%',md:'320px',xl:'340px'}} h={'90px'} borderBottom={'3px solid #3170A6'}
                px={'12px'} alignItems={'center'} justifyContent={'space-between'}
            >
                <Flex w={'fit-content'} flexDir={'column'}>
                    <Flex alignItems={'center'} gap={'24px'}>
                        <Text fontWeight={500} 
                            fontSize={'15px'}
                            className="montserrat"
                            textColor={'#172B4C'}
                        >
                            {AffiliatesCount}
                        </Text>
                    </Flex>
                    <Text fontWeight={400} 
                        fontSize={'18px'}
                        className="robotoF"
                        textColor={'#808080'}
                    >
                        Affiliates
                    </Text>
                </Flex>
                <Box
                    fontSize={'40px'}
                    fontWeight={500}
                >
                    <LuUser2 />
                </Box>
            </Flex>
            
        </Flex>
        <Flex gap={"20px"} w={'100%'}>
            <Flex w="100%" 
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                <Box w={'100%'} className="robotoF" mb={'24px'}>
                    <Text 
                        fontWeight={500}
                        textColor={'var(--strong950)'}
                        fontSize={{base:'14px',lg:'18px'}}
                    >
                        NEW USERS
                    </Text>
                    <Text 
                        fontWeight={400}
                        textColor={'var(--sub600)'}
                        fontSize={{base:'10px',lg:'14px'}}
                    >
                        List of New Users on the platform
                    </Text>
                </Box>
                <Btn onClick={()=> navigate.push('/users')}
                    w="68px" h="36px" bg={'white'}
                    border="1px solid var(--soft200)"
                    borderRadius={'8px'} textColor="(var--sub600)"
                    fontSize={'14px'} fontWeight={500} className="robotoF"
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
                <Input className="robotoF" type="text" w="314px" name="firstName" value={userData.firstName} onChange={handleChange} />
              </Box>
              <Box pt="15px">
                <FormLabel className="robotoF" fontSize={".875rem"}>
                  Last Name
                </FormLabel>
                <Input className="robotoF" type="text" w="314px" name="lastName" value={userData.lastName} onChange={handleChange} />
              </Box>
              <Box>
                <FormLabel className="robotoF" fontSize={".875rem"}>
                  Email
                </FormLabel>
                <Input className="robotoF" type="email" w="314px" name="email" value={userData.email} onChange={handleChange} />
              </Box>
              <Box pt="15px">
                <FormLabel className="robotoF" fontSize={".875rem"}>
                  Password
                </FormLabel>
                <Input className="robotoF" type="text" w="314px" name="password" value={userData.password} onChange={handleChange} />
              </Box>
              <Box pt="15px" mb="20px">
                <FormLabel className="robotoF" fontSize={".875rem"}>
                  User Type
                </FormLabel>
                <Select className="robotoF" name="role" w="314px" value={userData.role} onChange={handleChange}>
                  <option value="CLIENT">ADMIN</option>
                  <option value="GUEST">AFFILIATE</option>
                </Select>
              </Box>
              <Btn className="robotoF" type={"submit"} w="full" onClick={createUser}>
                Create User
              </Btn>
            </FormControl>
          </Modal>
        </Flex>
        <TableContainer mt="30px">
            <Table size="sm">
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
                    table.slice(0,5).map((item: any) => (
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
                        {"09094631170"}
                        </Td>
                        <Td color={"#525866"} py="12px">
                        {item.createdAt.split("T")[0]}
                        </Td>
                        <Td color={"#525866"} py="12px">
                        {item.propertyCount}
                        </Td>
                        <Td color={"#525866"} py="12px">
                        {item.role}
                        </Td>
                        {/* <Td color={"#525866"} py="12px">
                        <Menu>
                            <MenuButton as={"button"} className="robotoF">
                            <ActionIcon />
                            </MenuButton>
                            <MenuList>
                            <MenuItem>Edit</MenuItem>
                            <MenuItem>Delete</MenuItem>
                            </MenuList>
                        </Menu>
                        </Td> */}
                    </Tr>
                    ))}
                <UserDrawer
                    isOpen={isOpen}
                    onClose={onClose}
                    btnRef={btnRef}
                    userEl={userEl}
                />
                </Tbody>
            </Table>
        </TableContainer>
        <Box w={'100%'} my={'24px'}>
            <Flex w="100%" 
                justifyContent={'space-between'}
                alignItems={'center'} 
            >
                <Box w={'100%'} className="robotoF" mb={'24px'}>
                    <Text 
                        fontWeight={500}
                        textColor={'var(--strong950)'}
                        fontSize={{base:'14px',lg:'18px'}}
                    >
                        Verified Properties
                    </Text>
                    <Text 
                        fontWeight={400}
                        textColor={'var(--sub600)'}
                        fontSize={{base:'10px',lg:'14px'}}
                    >
                        Preview of some verified properties
                    </Text>
                </Box>
                <Btn onClick={()=> navigate.push('/property')}
                    w="68px" h="36px" bg={'white'}
                    border="1px solid var(--soft200)"
                    borderRadius={'8px'} textColor="(var--sub600)"
                    fontSize={'14px'} fontWeight={500} className="robotoF"
                >
                    See All
                </Btn>
            </Flex>
            <Box
            // overflowY={{ xl: "scroll" }}
            // height={{ xl: "calc(80vh - 100px)" }}
            // mt={4}
            >

            {!loading && (
                <Grid
                    overflowY={{ base: "scroll" }} 
                    w={'fit-content'}
                    mt={4}
                    templateColumns={{base:"repeat(1, 1fr)",md:"repeat(2, 1fr)",xl:"repeat(3, 1fr)"}}
                    gap={{ base: "24px", lg: "28px" }}
                    paddingBottom={{ base: "20rem", lg: "3rem", xl: "6rem" }}
                    placeItems={'center'}
                >
                    {getProperty.slice(0,3).map((property, index) => {
                        const user = users.find((u) => u._id === property?.creatorID);

                        return (
                        <PropertyCard
                            key={index}
                            _id={property?._id}
                            images={property?.images}
                            title={property?.title}
                            price={property?.price}
                            location={property?.address}
                            verificationState={property?.verificationState}
                            userImage={user?.avatar || "/"}
                            email={user?.email}
                            user={user?.firstName}
                            count={page}
                        />
                        );
                    })}
                </Grid>
            )}
            </Box>
        </Box>
      </Box>
    );
  };
  
  export default DashboardScreen;