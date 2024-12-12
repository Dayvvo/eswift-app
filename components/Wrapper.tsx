"use client";
import { Box, Flex, Grid, Image, Img, Text } from "@chakra-ui/react";
import Link from "next/link";
import React, { ReactNode, useEffect, useState } from "react";
import Divider from "./Divider";
import Btn from "./Btn";
import { BlogIcon, DashboardIcon, SettingsIcon, UserIcon } from "./svg";
import { FiHome } from "react-icons/fi";
import { NextRouter, useRouter } from "next/router";
// import axios from "axios";
import useAuth from "@/hooks/useAuth";
import useProfile from "@/hooks/useProfile";
import { token } from "morgan";

const Header = ({ casedPath }: { casedPath: string }) => {
  const isUser = "An overview of activities, verify users and properties.";
  const { isWindow, user } = useAuth();
  if (user?.role === "ADMIN") {
    return isUser;
  }
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      borderBottom={"1px solid #E1E4EA"}
      // padding={"40px 30px 40px 60px"}
      px={{ base: "12px", lg: "40px" }}
      py={{ base: "20px", lg: "40px" }}
      pos="relative"
      left={{ base: "2px", lg: "256px" }}
      maxW={{ base: "full", lg: "80vw" }}
      zIndex={99}
    >
      <Grid gridTemplateColumns={"40px 2fr"} gap={0}>
        <Flex
          border={"1px solid #E1E4EA"}
          borderRadius={"50%"}
          maxW={"30px"}
          h="30px"
          alignItems={"center"}
          justifyContent={"center"}
          mt="4%"
        >
          <DashboardIcon />
        </Flex>
        <Flex direction={"column"}>
          <Text
            className="robotoF"
            color="#0E121B"
            fontSize={".875rem"}
            fontWeight={500}
          >
            {casedPath || "Dashboard"}
          </Text>
          <Text
            className="robotoF"
            color="#525866"
            fontSize={".75rem"}
            fontWeight={400}
          >
            {isUser &&
              "Overview of your favourite properties and profile settings"}
          </Text>
        </Flex>
      </Grid>
      <Flex gap={"20px"} alignItems={"center"}>
        {/* <SearchIcon />
        <NotifIcon /> */}
      </Flex>
    </Flex>
  );
};

const Wrapper = ({
  children,
  noPadding,
}: {
  children: ReactNode;
  noPadding?: boolean;
}) => {
  const [route, setRoute] = useState("");
  const [path, setPath] = useState("");

  const { isWindow, user } = useAuth();
  const { getProfile } = useProfile();
  const navigate = useRouter() as NextRouter;

  const navData = [
    {
      label: "Dashboard",
      icon: (color: string) => <DashboardIcon color={color} />,
      url: "/dashboard",
    },
    ...user?.role ==='ADMIN'? [ 
      {
        label: "Users",
        icon: (color: string) => <UserIcon color={color} />,
        url: "/users",
      },
      {
        label: "Property",
        icon: (color: string) => <FiHome size={"1rem"} color={color} />,
        url: "/property",
      },
      {
        label: "Blog",
        icon: (color: string) => <BlogIcon color={color} />,
        url: "/blog",
      },
    ]:[
      {
        label: "Favorites",
        icon: (color: string) => <DashboardIcon color={color} />,
        url: "/favourites",
      },
      {
        label: "Browse Properties",
        icon: (color: string) => <FiHome size={"1rem"} color={color} />,
        url: "/properties",
      },
    ],
    {
      label: "Settings",
      icon: (color: string) => <SettingsIcon color={color} />,
      url: "/settings",
    },
  ];

  useEffect(() => {
    if (isWindow) {
      setRoute(window.location.href);
    }
  }, [isWindow]);

  useEffect(() => {
    if (route) {
      const fullPath = new URL(route).pathname;
      const pathSegments = fullPath.split("/").filter((segment) => segment);
      if (pathSegments.length > 0) {
        setPath(pathSegments[0]); // Always picks the first segment after the domain
      }
    }
  }, [route]);

  useEffect(() => {
    const getProfileFn = async () => {
      try {
        const res = await getProfile();
        console.log("res", res);
      } catch (err) {
        console.log("err", err);
      }
    };

    getProfileFn();
  }, []);
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate.push("/auth");
  };

  const casedPath = `${path.slice(0, 1).toUpperCase()}${path.slice(1)}`;

  if (!token) {
    return <></>;
  }
  return (
    <Box
      w={"100%"}
      py={{ base: "40px", lg: "10px" }}
      minH={"100vh"}
      overflowX={"hidden"}
    >
      <Box w={"100%"}>
        <Box
          borderRight={"1px solid #E1E4EA"}
          w={"244px"}
          bg={"white"}
          pos={"fixed"}
          // top={0}
          // left={0}
          h={"100vh"}
          px="24px"
          py="40px"
          overflowY={"auto"}
          display={{ base: "none", lg: "flex" }}
          flexDir={"column"}
        >
          <Link href={"/"}>
            <Image src="/logo.svg" width="226px" height="40px" alt="logo" />
          </Link>
          <Box my="2rem">
            <Divider w="196px" color="#1A1D66" />
          </Box>
          <Box
            display={"flex"}
            flexDir={"column"}
            gap={"1rem"}
            alignItems={"flex-start"}
            h={"100%"}
          >
            {navData.map((item) => {
              const isActive = path === item.label.toLowerCase();
              const iconColor = isActive ? "#335CFF" : "#525866";

              return (
                <Link href={item.url} key={item.url}>
                  <Box
                    className="robotoF"
                    cursor={"pointer"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"start"}
                    fontWeight={500}
                    w="196px"
                    borderRadius="6px"
                    fontSize={"0.875rem"}
                    p="8px 12px"
                    backgroundColor={isActive ? "#F5F7FA" : ""}
                    color={isActive ? "#0E121B" : "#525866"}
                    _hover={{
                      backgroundColor: "#F5F7FA",
                      color: "#000",
                    }}
                    // _selected={{ color: "white", bg: "#F18313" }}
                  >
                    <span
                      style={{ marginRight: "10px" }}
                      color={isActive ? "#335CFF" : "#525866"}
                    >
                      {item.icon(iconColor)}
                    </span>{" "}
                    {item.label}
                  </Box>
                </Link>
              );
            })}
          </Box>
          <Box mt={"5rem"}>
            <Divider color="#E1E4EA" mb={"20px"} w="204px" />
            <Grid
              gridTemplateColumns={"1fr 2fr"}
              gridTemplateRows={"1fr 1fr"}
              w={"full"}
              rowGap={"20px"}
            >
              <Img src="/profile.png" alt="profile" />
              <Flex direction={"column"}>
                <Text
                  color="#0E121B"
                  className="inter"
                  fontSize={"0.875rem"}
                  fontWeight={500}
                >
                  {`${user?.firstName} ${user?.lastName}`}
                </Text>
                <Text
                  color="#525866"
                  className="inter"
                  fontSize={"0.75rem"}
                  fontWeight={400}
                >
                  {`${user?.email}`}
                </Text>
              </Flex>
              <Btn
                onClick={logout}
                color="#fff"
                bgColor="#FF3B30BF"
                w="100%"
                fontSize={"0.875rem"}
                fontWeight={500}
                className="inter"
                gridColumn={"span 2"}
              >
                Logout
              </Btn>
            </Grid>
          </Box>
        </Box>
        <Header casedPath={casedPath} />
        <Box
          position={"relative"}
          top={"20px"}
          left={{ base: "0px", lg: "250px" }}
          w={{ base: "full", lg: "80vw" }}
          {...(noPadding ? {} : { px: "20px" })}
        >
          {route ? children : <></>}
        </Box>
      </Box>
    </Box>
  );
};

export default Wrapper;
