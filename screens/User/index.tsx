import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
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

import React, { useEffect, useState } from "react";
import { ActionIcon, FilterIcon, SearchIcon } from "../../components/svg";
import UserDrawer from "./UserDrawer";
import useUser from "@/hooks/useUser";
import Btn from "@/components/Btn";
import { Modal } from "@/components/modal";
import useToast from "@/hooks/useToast";

const AddUser = ({ close, setTable }: { close: () => void,  setTable: React.Dispatch<React.SetStateAction<any>>;  }) => {
  const toast = useToast();

  const [userData, setUserData] = useState({
    email: "",
    // password: "",
    firstName: "",
    lastName: "",
    role: "CLIENT",
  });


  const [loading, setLoading] = React.useState<boolean>(false);

  const [errors, setErrors] = useState({
    email: "",
    // password:'',
    firstName: "",
    lastName: "",
    role: "CLIENT",
  });

  const { addUser } = useUser();

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

  // const validatePassword = () => {
  //   let isError = false;
  //   if(userData.password?.length < 8) {
  //     setErrors(prev=>({
  //       ...prev,
  //       password:'Password must not be lest than 8 characters'
  //     }));
  //     isError = true;
  //   };
  //   return isError;
  // }

  const validateRequired = () => {
    let isErr = false;
    let keys = Object.keys(userData);
    keys.map((key) => {
      const keyval = key as keyof typeof errors;
      if (!userData[keyval]) {
        setErrors((prev) => ({
          ...prev,
          [keyval]: `${keyval} is required`,
        }));
        isErr = true;
      }
    });
    return isErr;
  };

  const createUser = async () => {
    const isRequiredError = validateRequired();

    // const isRequiredPasswordLength = validatePassword();

    if (!isRequiredError) {
      try {
        setLoading(true);
        const res = await addUser(userData);

        setTable((prev: any) => [ {
          email: res.data.email,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          createdAt: new Date().toISOString(),
          phoneNumber: res.data.phoneNumber,
          role: res.data.role,
        }, ...prev]);
        setUserData({
          email: "",
          firstName: "",
          lastName: "",
          role: "CLIENT",
        });
        close();
        toast.toast({
          status: "success",
          title: "User created",
        });
        return res;
      } catch (err: any) {
        
        toast.toast({
          status: "error",
          title: "Error creating user",
          description: err?.response?.data?.message ||'An error occurred while creating user please try again!',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <FormControl>
      <Box pt="15px">
        <FormLabel
          className="robotoF"
          display={"flex"}
          gap={"4px"}
          fontSize={".875rem"}
        >
          <Text>First Name</Text>
          <Text color={"red"}>*</Text>
        </FormLabel>
        <Input
          className="robotoF"
          type="text"
          w="314px"
          name="firstName"
          value={userData.firstName}
          onChange={handleChange}
        />
        {
          <Text mt="0.3em" className="robotoF" color="red" fontSize={".825rem"}>
            {errors.firstName && errors.firstName}
          </Text>
        }
      </Box>
      <Box pt="15px">
        <FormLabel
          className="robotoF"
          fontSize={".875rem"}
          display={"flex"}
          gap={"4px"}
        >
          <Text>Last Name</Text>
          <Text color={"red"}>*</Text>
        </FormLabel>
        <Input
          className="robotoF"
          type="text"
          w="314px"
          name="lastName"
          value={userData.lastName}
          onChange={handleChange}
        />
        {
          <Text mt="0.3em" className="robotoF" color="red" fontSize={".825rem"}>
            {errors.lastName && errors.lastName}
          </Text>
        }
      </Box>

      <Box pt="15px">
        <FormLabel
          className="robotoF"
          fontSize={".875rem"}
          display={"flex"}
          gap={"4px"}
        >
          <Text>Email</Text>
          <Text color={"red"}>*</Text>
        </FormLabel>
        <Input
          className="robotoF"
          type="email"
          w="314px"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
        {
          <Text className="robotoF" color="red" mt="0.3em" fontSize={".825rem"}>
            {errors.email && errors.email}
          </Text>
        }
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

          <option value="AGENT">AGENT</option>
          <option value="AFFILIATE">AFFILIATE</option>
          <option value="ADMIN">ADMIN</option>
          <option value="CLIENT">CLIENT</option>
          <option value="STAFF">STAFF</option>
          <option value="GUEST">GUEST</option>
        </Select>
      </Box>
      <Btn
        className="robotoF"
        type={"submit"}
        w="full"
        onClick={createUser}
        isDisabled={loading}
        isLoading={loading}
      >
        Create User
      </Btn>
    </FormControl>
  );
};

const UserScreen = () => {
  const [table, setTable] = useState<any>([]);
  const [userEl, setUserEl] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [verify, setVerify] = useState("Pending");
  const [loading, setLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const { getUser, getUserById } = useUser();
  const getUserFn = async () => {
    setLoading(true);
    try {
      const res: any = await getUser(search);
      let data = res?.data?.data as any;
      setTable(data);
    } catch (err) {
      toast.toast({
        status: "error",
        title: "Failed to fech users",
        description: 'An error occurred while fetching users',
      });
    } finally {
      setLoading(false);
    }

  };
  useEffect(() => {
    getUserFn();
  }, [search]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      getUserFn();
    }
  };

  const btnRef = React.useRef();

  const openDrawer = async (userId: string) => {
    onOpen();
    const res: any = await getUserById(userId);
    setVerify(res.data.data.verification);
    setUserEl(res?.data?.data);
  };

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  return (
    <Box>
      <Flex gap={"20px"}>
        <InputGroup>
          <InputLeftElement>
            <SearchIcon />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search..."
            border={"1px solid #E1E4EA"}
            onChange={(e: any) => setSearch(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </InputGroup>
        <Flex
          border={"1px solid #E1E4EA"}
          borderRadius={"8px"}
          gap="4px"
          align={"center"}
          justify={"center"}
          p="8px"
        >
          <Menu>
            <MenuButton
              as={Button}
              leftIcon={<FilterIcon />}
              bgColor={"transparent"}
              h="20px"
              className="robotoF"
              fontSize={".875rem"}
              fontWeight={500}
              _hover={{ bgColor: "none" }}
            >
              Filter
            </MenuButton>
            <MenuList width="0" height="0">
              {/* <MenuItem>Download</MenuItem>
              <MenuItem>Create a Copy</MenuItem>
              <MenuItem>Mark as Draft</MenuItem>
              <MenuItem>Delete</MenuItem>
              <MenuItem>Attend a Workshop</MenuItem> */}
            </MenuList>
          </Menu>
        </Flex>
        <Btn className="robotoF" onClick={() => setShowModal(true)}
          fontSize={'.875rem'}
          fontWeight={500}
        >
          Add User
        </Btn>
        <Modal onClose={toggleModal} isVisible={showModal} label="Add User">
          <AddUser close={toggleModal} setTable={setTable}/>
        </Modal>
      </Flex>
      <TableContainer mt="30px">
       {!loading && table.length > 0 && <Table size="sm">
          <Thead>
            <Tr bgColor={"#F5F7FA"}>
              {[
                "Full Name",
                "Email",
                "Phone No.",
                "Date Created",
                "Property",
                "User Type",
                "Action",
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
              table.map((item: any) => (
                <Tr key={item._id} cursor={"pointer"}>
                  <Td color={"#0E121B"} py="12px">{`${item.firstName
                    .slice(0, 1)
                    .toUpperCase()}${item.firstName.slice(
                    1,
                    item.firstName.length
                  )} ${item.lastName
                    .slice(0, 1)
                    .toUpperCase()}${item.lastName.slice(
                    1,
                    item.lastName.length
                  )}`}</Td>
                  <Td color={"#525866"} py="12px">
                    {item.email}
                  </Td>
                  <Td color={"#525866"} py="12px">
                    {item.phoneNumber}
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
                  <Td color={"#525866"} py="12px">
                    <Menu>
                      <MenuButton
                        as={"button"}
                        className="robotoF"
                        onClick={() => openDrawer(item._id)}
                      >
                        <ActionIcon />
                      </MenuButton>
                      <MenuList>
                        <MenuItem>Edit</MenuItem>
                        <MenuItem>Delete</MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              ))}
          </Tbody>
          <UserDrawer
            isOpen={isOpen}
            verify={verify}
            setVerify={setVerify}
            onClose={onClose}
            btnRef={btnRef}
            userEl={userEl}
          />
        </Table>}
        {loading && (
        <Stack spacing={4} mt="30px">
          <Skeleton height='30px' />
          <Skeleton height='30px' />
          <Skeleton height='30px' />
        </Stack>
      )}
      {table.length === 0 && !loading && (
        <Container>
          <Text fontSize={".875rem"} color={"#525866"} mt="30px">
            No user found
          </Text>
        </Container>
      )}
      </TableContainer>
    </Box>
  );
};

export default UserScreen;
