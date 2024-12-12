import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { ActionIcon, FilterIcon, SearchIcon } from "./svg";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useApiUrl } from "@/hooks/useApi";
import moment from 'moment';


interface Users {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  createdAt: string | number;
  property: string;
  role: string;
  action: HTMLButtonElement;


}

const UserComponent = () => {
  // const tableData = [
  //   {
  //     name: "Oronnaye Ayomide"
  //     email: "oronnayeayomide@gmail.com",
  //     phoneNum: "09094631170",
  //     dateCreated: "12 September 2024",
  //     property: "Nil",
  //     userType: "Buyer",
  //     action: <ActionIcon />,
  //   },
  //   {
  //     name: "Opeyemi Adeyemi",
  //     email: "oronnayeayomide@gmail.com",
  //     phoneNum: "09094631170",
  //     dateCreated: "12 September 2024",
  //     property: "10",
  //     userType: "Seller",
  //     action: <ActionIcon />,
  //   },
  //   {
  //     name: "Anigboro Napoleon",
  //     email: "anigboronapoleon@gmail.com",
  //     phoneNum: "09094631170",
  //     dateCreated: "12 September 2024",
  //     property: "8",
  //     userType: "Affiliate",
  //     action: <ActionIcon />,
  //   },
  //   {
  //     name: "Anigboro Napoleon",
  //     email: "anigboronapoleon@gmail.com",
  //     phoneNum: "09094631170",
  //     dateCreated: "12 September 2024",
  //     property: "5",
  //     userType: "Affiliate",
  //     action: <ActionIcon />,
  //   },
  //   {
  //     name: "Oronnaye Ayomide",
  //     email: "oronnayeayomide@gmail.com",
  //     phoneNum: "09094631170",
  //     dateCreated: "12 September 2024",
  //     property: "Nil",
  //     userType: "Buyer",
  //     action: <ActionIcon />,
  //   },
  //   {
  //     name: "Oronnaye Ayomide",
  //     email: "oronnayeayomide@gmail.com",
  //     phoneNum: "09094631170",
  //     dateCreated: "12 September 2024",
  //     property: "Nil",
  //     userType: "Buyer",
  //     action: <ActionIcon />,
  //   },
  //   {
  //     name: "Oronnaye Ayomide",
  //     email: "oronnayeayomide@gmail.com",
  //     phoneNum: "09094631170",
  //     dateCreated: "12 September 2024",
  //     property: "Nil",
  //     userType: "Buyer",
  //     action: <ActionIcon />,
  //   },
  //   {
  //     name: "Oronnaye Ayomide",
  //     email: "oronnayeayomide@gmail.com",
  //     phoneNum: "09094631170",
  //     dateCreated: "12 September 2024",
  //     property: "Nil",
  //     userType: "Buyer",
  //     action: <ActionIcon />,
  //   },
  //   {
  //     name: "Oronnaye Ayomide",
  //     email: "oronnayeayomide@gmail.com",
  //     phoneNum: "09094631170",
  //     dateCreated: "12 September 2024",
  //     property: "Nil",
  //     userType: "Buyer",
  //     action: <ActionIcon />,
  //   },
  // ];


  const [userData, setUserData] = useState<Users[]>([]);
  const [error, setError] = useState<boolean>(false);

  const client = useApiUrl();
  
  useEffect(()=>{
    client.get('/user/users') 
      .then(
        (res:AxiosResponse<unknown, any>) => {
          console.log(res?.data)
          const response = res as AxiosResponse<{data: Users[]}>
          const users = response?.data?.data;
          setUserData(users)
        }
      )
      .catch(
        (err:AxiosError)=> {
          console.log(err)
          setError(true);
        }
      )
  },[])



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
            <MenuList>
              {/* <MenuItem>Download</MenuItem>
              <MenuItem>Create a Copy</MenuItem>
              <MenuItem>Mark as Draft</MenuItem>
              <MenuItem>Delete</MenuItem>
              <MenuItem>Attend a Workshop</MenuItem> */}
            </MenuList>
          </Menu>
        </Flex>
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
                "Action",
              ].map((item,key) => (
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
          <Tbody fontSize={'.875rem'} fontWeight={400} className="robotoF">
            {userData.map((item, key) => (
              <Tr key={key}>
                <Td color={'#0E121B'} py='12px'>{item?.firstName} {item?.lastName}</Td>
                <Td color={'#525866'} py='12px'>{item?.email}</Td>
                <Td color={'#525866'} py='12px'>{item?.phoneNumber}</Td>
                <Td color={'#525866'} py='12px'>{moment(item?.createdAt).format('D MMM, YYYY')}</Td>
                <Td color={'#525866'} py='12px'></Td>
                <Td color={'#525866'} py='12px'>{item?.role}</Td>
                <Td color={'#525866'} py='12px'>
                  <Menu>
                    <MenuButton as={"button"} className="robotoF">
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
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserComponent;
function setData(users: any) {
  throw new Error("Function not implemented.");
}

