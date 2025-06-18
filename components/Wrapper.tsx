"use client";
import { Box, Flex, Grid, Image, Img, Text } from "@chakra-ui/react";
import Link from "next/link";
import React, { ReactNode, useEffect, useState } from "react";
import Divider from "./Divider";
import Btn from "./Btn";
import { BlogIcon, DashboardIcon, SettingsIcon, UserIcon } from "./svg";
import { FiHome } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { NextRouter, useRouter } from "next/router";
// import axios from "axios";
import useAuth from "@/hooks/useAuth";
import useProfile from "@/hooks/useProfile";
import { GiHamburgerMenu } from "react-icons/gi";
// import { token } from "morgan";

const Wrapper = ({
  children,
  noPadding,
}: {
  children: ReactNode;
  noPadding?: boolean;
}) => {
  const [route, setRoute] = useState("");
  const [path, setPath] = useState("");
  const isUser = "An overview of activities, verify users and properties.";

  const { isWindow, user } = useAuth();

  const navigate = useRouter() as NextRouter;
  const router = useRouter();

  const navData = [
    {
      label: "Dashboard",
      icon: (color: string) => <DashboardIcon color={color} />,
      url: "/dashboard",
    },
    ...(user?.role === "ADMIN"
      ? [
          {
            label: "Users",
            icon: (color: string) => <UserIcon color={color} />,
            url: "/users",
          },
          {
            label: "Listing",
            icon: (color: string) => <FiHome size={"1rem"} color={color} />,
            url: "/listing",
          },
          {
            label: "Blog",
            icon: (color: string) => <BlogIcon color={color} />,
            url: "/blog",
          },
        ]
      : [
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
        ]),
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

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate.push("/auth");
  };

  const casedPath = `${path.slice(0, 1).toUpperCase()}${path.slice(1)}`;

  const userFromLocalStorage =
    typeof window !== "undefined"
      ? window?.localStorage.getItem("userData")
      : null;

  const token = userFromLocalStorage
    ? JSON.parse(userFromLocalStorage)?.token
    : "";

  const userData = userFromLocalStorage
    ? JSON.parse(userFromLocalStorage)?.user
    : null;

  useEffect(() => {
    const restrictedPaths = ["/property", "/users", "/blog"];

    const isRestrictedPath = restrictedPaths.some((path) =>
      router.pathname.startsWith(path)
    );

    if (isRestrictedPath && userData?.role !== "ADMIN") {
      console.log(`Unauthorized access to ${router.pathname}. Logging out...`);
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      router.push("/auth");
    }

    // Ensure token presence to keep the user logged in
    if (!token) {
      console.log("No token found. Redirecting to /auth...");
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      router.push("/auth");
    }
  }, [router.pathname, userData?.role, token, router]);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  let finalImage = user?.avatar;
  if (finalImage) {
    if (!finalImage.startsWith("http") && !finalImage.startsWith("https")) {
      finalImage = `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${user?.avatar}`;
    } else {
      finalImage = user?.avatar;
    }
  }

  return (
    <Box
      w={"100%"}
      // py={{ base: "0", lg: "10px" }}
      h={isOpen ? "100vh" : "auto"}
      overflowX={"hidden"}
      overflowY={`${isOpen ? "clip" : "auto"}`}
    >
      <Box
        onClick={openDrawer}
        w={"100%"}
        h={"100%"}
        display={{ base: `${isOpen ? "block" : "none"}`, lg: "none" }}
        position={"absolute"}
        bg={"#00000080"}
        backdropFilter={"blur(6px)"}
        zIndex={80}
      />
      <Box w={"100%"}>
        <Box
          className={`${isOpen ? "slideOpen" : "slideClose"}`}
          borderRight={"1px solid #E1E4EA"}
          maxW={"270px"}
          bg={"white"}
          pos={"fixed"}
          // top={0}
          // left={0}
          h={"100vh"}
          px="24px"
          py="40px"
          overflowY={"auto"}
          display={{ base: "flex", lg: "flex" }}
          flexDir={"column"}
          zIndex={80}
          backdropFilter={"blur(4px)"}
        >
          <Box
            onClick={openDrawer}
            display={{ base: "flex", lg: "none" }}
            fontSize={"20px"}
            alignSelf={"end"}
            my={"8px"}
          >
            <IoClose />
          </Box>
          <Link href={"/"}>
            <Image src="/logo.svg" width="226px" height="40px" alt="logo" />
          </Link>
          <Box my="2rem">
            <Divider w="100%" color="#1A1D66" />
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
                    onClick={openDrawer}
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
          <Box mt={{ base: "2rem", md: "5rem" }}>
            <Divider color="#E1E4EA" mb={"20px"} w="100%" />
            <Grid
              gridTemplateColumns={"1fr 2fr"}
              gridTemplateRows={"1fr 1fr"}
              w={"full"}
              rowGap={"20px"}
            >
              <Img
                src={finalImage ? finalImage : "/profile.png"}
                alt={"profile"}
                borderRadius={"50%"}
                h={"30px"}
                w={"50px"}
              />
              <Flex direction={"column"}>
                <Text
                  color="#0E121B"
                  className="inter"
                  fontSize={"0.875rem"}
                  fontWeight={500}
                  // whiteSpace={'nowrap'}
                >
                  {`${user?.firstName} ${user?.lastName}`}
                </Text>
                <Text
                  color="#525866"
                  className="inter"
                  fontSize={"0.65rem"}
                  fontWeight={400}
                  whiteSpace={"wrap"}
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
        <Box>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            borderBottom={"1px solid #E1E4EA"}
            // padding={"40px 30px 40px 60px"}
            px={{ base: "12px", lg: "40px" }}
            py={{ base: "20px", lg: "40px" }}
            pos="relative"
            top={"20px"}
            left={{ base: "2px", lg: "256px" }}
            maxW={{ base: "full", lg: "80vw" }}
            zIndex={70}
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
                display={{ base: "none", lg: "flex" }}
              >
                <DashboardIcon />
              </Flex>
              <Flex
                onClick={openDrawer}
                border={"1px solid #E1E4EA"}
                borderRadius={"50%"}
                maxW={"30px"}
                h="30px"
                alignItems={"center"}
                justifyContent={"center"}
                mt="4%"
                display={{ base: "flex", lg: "none" }}
              >
                <GiHamburgerMenu />
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
          </Flex>
        </Box>
        <Box
          position={"relative"}
          top={"20px"}
          left={{ base: "0px", lg: "265px" }}
          w={{ base: "full", lg: "80vw" }}
          {...(noPadding ? {} : { px: "20px", pt: "20px", pb: "40px" })}
        >
          {route ? children : <></>}
        </Box>
      </Box>
    </Box>
  );
};

export default Wrapper;
