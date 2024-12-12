"use client";
import React from "react";
import Btn from "@/components/Btn";
import {
  Box,
  Flex,
  // Grid,
  // GridItem,
  // SimpleGrid,
  Text,
  Image,
  Grid,
  // Heading,
} from "@chakra-ui/react";
// import { BsDot } from "react-icons/bs";
// import { HiOutlineLocationMarker } from "react-icons/hi";
// import { FaRegImages } from "react-icons/fa";
import useProperty, { Favourite } from "@/hooks/useProperty";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context";
import { R } from "@/utils/types";
import { PropertyCardProps } from "../Property/propertyCard";
import { useRouter } from "next/router";
import { MdLocationOn } from "react-icons/md";
import { ZigiZagaIcon } from "../../components/svg";
import { AxiosError, AxiosResponse } from "axios";
import useToast from "@/hooks/useToast";
import useAuth from "@/hooks/useAuth";
import { TbCurrencyNaira } from "react-icons/tb";
import { FaCheckCircle } from "react-icons/fa";

export const PropertyDetails = ({ clientView }: { clientView?: boolean }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const router = useRouter()
  const pathName = router.pathname;

  const {authProtectedFn} = useAuth()

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const [loadingBtn, setLoadingBtn] = useState<boolean>(false);

  const { globalContext, setGlobalContext } = useAppContext();

  const toast = useToast();

  const { user } = globalContext;

  const [detailsData, setDetailsData] = useState<PropertyCardProps | null>(
    null
  );

  const { getPropertyDetails, addToFavorites, deleteFromFavorites } =
    useProperty();

  const { query, isReady } = useRouter();

  const addToFave = async (id: string) => {
    try {
      const { data } = (await addToFavorites(id)) as AxiosResponse;
      if (data) {
        toast.toast({
          title: "Request successful",
          status: "success",
          description: "Property added to favoriites",
        });
        setGlobalContext &&
          setGlobalContext((prev) => ({
            ...prev,
            favourites: [...prev.favourites, data as Favourite],
          }));
      }
    } catch (err) {
      let error = err as AxiosError;
      if (error?.response) {
        toast.toast({
          status: "error",
          title: "Request successful",
          description: "Failed to add property added to favoriites",
        });
      }
    }
  };

  const deleteFromFave = async (id: string) => {
    try {
      const { data } = (await deleteFromFavorites(id)) as AxiosResponse;
      if (data) {
        toast.toast({
          title: "Request successful",
          status: "success",
          description: "Property removed from favoriites",
        });
        setGlobalContext &&
          setGlobalContext((prev) => ({
            ...prev,
            favourites: prev.favourites.filter(
              (prop) => prop?.favoriteId !== id
            ),
          }));
      }
    } catch (err) {
      let error = err as AxiosError;
      if (error?.response) {
        toast.toast({
          title: "Request successful",
          description: "Failed to remove property from favoriites",
        });
      }
    }
  };

  useEffect(() => {
    if (isReady) {
      (async () => {
        try {
          const request = await getPropertyDetails(query?.id as string);
          const data = request.data as R;
          setDetailsData(data?.data);
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [isReady]);

  const isAdmin = user?.role === "Admin";

  if(!detailsData) {
    return(<></>);
  }


  return (
    <Box bg={"#FFF"} w={clientView ? "80%" : "100%"} pb={'4rem'}>
      <Flex justifyContent={"space-between"} alignItems={"center"} py={'1rem'}>
        <Flex gap={"16px"}>
          <Text
            className="urbanist"
            fontWeight="600"
            fontSize="40px"
            whiteSpace="nowrap"
          >
            {detailsData?.title}
          </Text>
          {/* <Flex
            w={"100%"}
            h={"37px"}
            alignItems={"center"}
            px={"8px"}
            borderRadius={"6px"}
            border={"1px solid #262626"}
            gap={"4px"}
            textColor={"black"}
            fontSize={"14px"}
            className="urbanist"
            fontWeight={500}
          >
            <MdLocationOn />
            <Text
              fontSize="14px"
              maxW={"90%"}
              overflow={"hidden"}
              textOverflow={"ellipsis"}
              className="urbanist"
              whiteSpace={"nowrap"}
            >
              {detailsData?.address}
            </Text>
          </Flex>
        */}
        </Flex>
      </Flex>
      <Flex
        gap="15px"
        overflow="auto"
        wrap="nowrap"
        justifyContent={"center"}
        bgColor={"#E2EDF3"}
        mt={"20px"}
        border={"1.5px solid #262626"}
        padding="10px"
        borderRadius={"12px"}
        css={{
          "&::-webkit-scrollbar": {
            height: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: "4px",
          },
        }}
      >
        {detailsData?.images?.map((image, index) => (
          <Box
            key={index}
            h="74px"
            borderRadius="6px"
            cursor="pointer"
            flexShrink="0"
            width="122.22px"
            onClick={() => handleImageClick(index)}
          >
            <Image
              h="100%"
              w="100%"
              src={image}
              alt=""
              borderRadius="6px"
              objectFit="cover"
              border={
                index === selectedImageIndex ? "2px solid #335CFF" : "none"
              }
            />
          </Box>
        ))}
      </Flex>

      {
        <Box
          border="1.5px solid #262626"
          borderRadius={"12px"}
          padding={"40px"}
          mt="24px"
          display={"flex"}
          gap={"10px"}
        >
          <Box w={"585px"} h={"507px"}>
            <Image
              w={"100%"}
              h={"100%"}
              src={detailsData?.images[selectedImageIndex]}
              alt={``}
              borderRadius={"10px"}
            />
          </Box>
          <Box w={"585px"} h={"507px"}>
            <Image
              w={"100%"}
              h={"100%"}
              src={
                selectedImageIndex - 1 >= 0
                  ? detailsData?.images[selectedImageIndex - 1]
                  : detailsData?.images[selectedImageIndex + 1]
              }
              alt={``}
              borderRadius={"10px"}
            />
          </Box>
        </Box>
      }
      <Flex direction={{base:'column', lg:'row'}} gap={"16px"} mt={"16px"}>
        <Box
          display={"flex"}
          flexDir={"column"}
          borderRadius={"10px"}
          border="1.5px solid #262626"
          padding={"40px"}
          w={{lg:"630px"}}
          h={"514px"}
        >
          <Box flex={"1"}>
            <Text
              as={"h2"}
              fontWeight={"600"}
              fontSize={"20px"}
              className="robotoF"
              color={"#000"}
            >
              Property Type
            </Text>
            <Text
              mt={"6px"}
              color="#999999"
              className="robotoF"
              fontWeight={"500"}
              fontSize={"16px"}
            >
              {detailsData?.category}
            </Text>
          </Box>

          {detailsData?.lga && (
            <Box flex={"1"}>
              <Text
                as={"h2"}
                fontWeight={"600"}
                fontSize={"20px"}
                className="robotoF"
                color={"#000"}
              >
                State
              </Text>
              <Text
                mt={"6px"}
                color="#999999"
                className="robotoF"
                fontWeight={"500"}
                fontSize={"16px"}
              >
                {detailsData?.state}
              </Text>
            </Box>
          )}
          {/* {detailsData?.state && (
            <Box flex={"1"}>
              <Text
                as={"h2"}
                fontWeight={"600"}
                fontSize={"20px"}
                className="robotoF"
                color={"#000"}
              >
                State
              </Text>
              <Text
                mt={"6px"}
                color="#999999"
                className="robotoF"
                fontWeight={"500"}
                fontSize={"16px"}
              >
                {detailsData?.state}
              </Text>
            </Box>
          )} */}

          <Box flex={"1"}>
            <Text
              as={"h2"}
              fontWeight={"600"}
              fontSize={"20px"}
              className="robotoF"
              color={"#000"}
            >
              Address
            </Text>
            <Flex alignItems={'center'} gap={'4px'}>
              <Box fontSize={'14px'}>
                <MdLocationOn />
              </Box>
              
              <Text
                fontSize="14px"
                maxW={"90%"}
                overflow={"hidden"}
                textOverflow={"ellipsis"}
                className="urbanist"
                whiteSpace={"nowrap"}
              >
                {detailsData?.address}
              </Text>
            </Flex>
          </Box>

          <Box flex={"1"}>
            <Text
              as={"h2"}
              fontWeight={"600"}
              fontSize={"20px"}
              className="robotoF"
              color={"#000"}
            >
              Price
            </Text>

            <Flex alignItems={'center'}>
              <Box fontSize={'14px'}>
                <TbCurrencyNaira />
              </Box>
              <Text
                className="urbanist"
                fontSize={"20px"}
                fontWeight={600}
                color={"#000"}
              >
                {detailsData?.price?.amount}
              </Text>
            </Flex>
          </Box>

          {/* <Flex
            borderTop={"1px solid #262626"}
            justifyContent={"space-between"}
            pt={"10px"}
          >
            <Box>
              <Flex gap={"8px"}>
                <BedroomsIcon />
                <Text
                  color={"#999999"}
                  className="robotoF"
                  fontSize="14px"
                  fontWeight="500"
                >
                  Bedrooms
                </Text>
              </Flex>
              <Text
                color={"#000"}
                className="robotoF"
                fontSize="20px"
                fontWeight="600"
              >
                04
              </Text>
            </Box>
            <Box borderLeft={"1px solid #262626"} pl={"16px"}>
              <Flex gap={"8px"}>
                <BathroomsIcon />
                <Text
                  color={"#999999"}
                  className="robotoF"
                  fontSize="14px"
                  fontWeight="500"
                >
                  Bethrooms
                </Text>
              </Flex>
              <Text
                color={"#000"}
                className="robotoF"
                fontSize="20px"
                fontWeight="600"
              >
                03
              </Text>
            </Box>
            <Box borderLeft={"1px solid #262626"} pl={"16px"}>
              <Flex gap={"8px"}>
                <AreaIcon />
                <Text
                  color={"#999999"}
                  className="robotoF"
                  fontSize="14px"
                  fontWeight="500"
                >
                  Areas
                </Text>
              </Flex>
              <Text
                color={"#000"}
                className="robotoF"
                fontSize="20px"
                fontWeight="600"
              >
                2,500 Square Feet
              </Text>
            </Box>
          </Flex> */}
          <Flex direction={{base:'column', lg:'row'}} gap={"8px"} mt={"20px"}>
            <Btn
              border="1px solid #335CFF"
              borderRadius={"10px"}
              padding={"10px"}
              color="#335CFF"
              bgColor="transparent"
              className="robotoF"
              w="100%"
              as='a'
              href='https://wa.me/message/GI7M6PJK4RGPL1'
              target='_blank'
            >
              Contact
            </Btn>

            {!detailsData?.isInFavorites ? (
              <Btn
                border="1px solid #FB3748"
                borderRadius={"10px"}
                padding={"10px"}
                color="#FB3748"
                className="robotoF"
                bgColor="transparent"
                w="100%"
                onClick={() => 
                  authProtectedFn(()=> addToFave(detailsData?._id as string), pathName )
                }
                isLoading={loadingBtn}
              >
                Add to favorites
              </Btn>
            ) : (
              <Btn
                border="1px solid #FB3748"
                borderRadius={"10px"}
                padding={"10px"}
                color="#FB3748"
                className="robotoF"
                bgColor="transparent"
                w="100%"
                isLoading={loadingBtn}
                onClick={() =>
                  deleteFromFave(detailsData?.favoriteId as string)
                }
              >
                Remove from favorites
              </Btn>
            )}
          </Flex>
        </Box>
        <Box
          borderRadius={"10px"}
          border="1.5px solid #262626"
          padding={"40px"}
          w={{lg:"630px"}}
        >
          <Text
            fontWeight={"600"}
            fontSize={"20px"}
            className="robotoF"
            color={"#000"}
          >
            Key Features and Amenities
          </Text>
          <Box display={"flex"} gap="14px" flexDir="column" mt={"10px"}>
            {detailsData?.features?.map((feature: string, index: number) => {
              return (
                <Box
                  bgGradient="linear(to-r, #E2EDF3, #FFFFFF00)"
                  p={"14px 16px"}
                  display={"flex"}
                  gap={"10px"}
                  key={index}
                  borderLeft="1px solid #703BF7"
                >
                  <ZigiZagaIcon />
                  <Text
                    fontSize={"16px"}
                    color={"#000"}
                    fontWeight={500}
                    className="robotoF"
                  >
                    {feature}
                  </Text>
                </Box>
              );
            })}
          </Box>
        </Box>
        
      </Flex>
      <Box
        display={"flex"}
        flexDir={"column"}
        borderRadius={"10px"}
        border="1.5px solid #262626"
        padding={"40px"}
        w={'100%'}
        mt={'20px'}
        gap={'24px'}
      >
          <Text
              as={"h2"}
              fontWeight={"600"}
              fontSize={"20px"}
              className="robotoF"
              color={"#000"}
            >
              Documents
            </Text>
            <Grid templateColumns={{base:'repeat(1, 1fr)', md:'repeat(2, 1fr)', xl:'repeat(3, 1fr)'}} 
              gap={'20px'} placeContent={'center'}
            >
              {detailsData?.documents?.map((item)=>(
                  <Flex key={item?._id}
                    borderRadius={"6px"}
                    border="1px solid #262626"
                    padding={"10px"}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                  >
                    <Text
                      className="urbanist"
                      fontSize={"20px"}
                      fontWeight={600}
                      color={"#00000090"}
                      whiteSpace={'nowrap'}
                      overflow={'ellipsis'}
                    >
                      {item?.type}
                    </Text>
                    <Box fontSize={'20px'} color={'#282'}>
                      <FaCheckCircle />
                    </Box>
                  </Flex>
                ))
              }
            </Grid>
              
      </Box>
      {/* <Flex flexDir={"column"} w={"100%"} p={"20px"} gap={"24px"}>
        <Flex flexDir={"column"} w={"100%"} gap={"18px"} className="roboto">
          <Flex w="100%" justify={"space-between"}>
            <Flex fontSize={{ base: "20px", lg: "28px" }}>
              <HiOutlineLocationMarker />
              <Text>{detailsData?.address}</Text>
            </Flex>

            <Btn
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              bg={"#3170A6"}
              borderRadius={"6px"}
              px="2em"
              h={"48px"}
              textColor={"#FFF"}
              fontWeight={500}
              className="roboto"
              fontSize={"16px"}
            >
              Contact us
            </Btn>
          </Flex>

          <Text
            textColor={"#626871"}
            fontWeight={400}
            fontSize={"18px"}
            className="roboto"
          >
            {detailsData?.description}
          </Text>
          <Box fontSize={"18px"} fontWeight={300} textColor={"#626871"}>
            <Text>Key Features</Text>
            {detailsData?.features.map((feature: string, key: number) => {
              return (
                <Flex key={feature + key} alignItems={"center"} gap={"4px"}>
                  <BsDot />
                  <Text>{feature}</Text>
                </Flex>
              );
            })}
          </Box>
          {isAdmin ? (
            <Flex
              bg={"var(--weak50)"}
              w={"100%"}
              alignItems={"center"}
              px={"20px"}
              py={"6px"}
              className="robotoF"
            >
              <Text
                fontSize={"12px"}
                fontWeight={500}
                textColor={"var(--soft400)"}
              >
                DOCUMENTS
              </Text>
            </Flex>
          ) : null}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
            {Documents.map((document) => {
              return (
                <Flex
                  key={document?.id}
                  alignItems={"center"}
                  position={"relative"}
                  borderRadius={"8.5px"}
                  border={"0.71px solid var(--soft200)"}
                  px={"10px"}
                  w={"100%"}
                  h={"52px"}
                >
                  <Btn
                    pos={"absolute"}
                    bg={"transparent"}
                    display={"flex"}
                    w={"38px"}
                    h={"24px"}
                    alignItems={"center"}
                    borderRadius={"6px"}
                    border={"0.71px solid var(--soft200)"}
                    className="inter"
                    textColor={"var(--sub600)"}
                    fontSize={"10px"}
                    fontWeight={500}
                    insetEnd={4}
                  >
                    View
                  </Btn>
                </Flex>
              );
            })}
          </SimpleGrid>
        </Flex>

        {isAdmin ? (
          <Flex
            flexDir={"column"}
            w={{ base: "100%", lg: "20%" }}
            gap={"16px"}
            className="robotoF"
          >
            <Btn
              bg={"transparent"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              w="100%"
              border="1px solid var(--primaryBase)"
              borderRadius={"10px"}
              h={"40px"}
              textColor={"var(--primaryBase)"}
            >
              Resume
            </Btn>
            <Btn
              bg={"transparent"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              w="100%"
              border="1px solid var(--errorBase)"
              borderRadius={"10px"}
              h={"40px"}
              textColor={"var(--errorBase)"}
            >
              Delete
            </Btn>
            <Flex
              bg={"var(--weak50)"}
              w={"100%"}
              alignItems={"center"}
              px={"20px"}
              py={"6px"}
              className="robotoF"
            >
              <Text
                fontSize={"12px"}
                fontWeight={500}
                textColor={"var(--soft400)"}
              >
                USER
              </Text>
            </Flex>
            <Flex
              flexDir={"column"}
              gap={"16px"}
              w={"100%"}
              p={"20px"}
              className="robotoF"
            >
              <Flex alignItems={"center"} gap={4}>
                <Box
                  overflow={"hidden"}
                  borderRadius={"100%"}
                  h={"40px"}
                  w={"42px"}
                >
                  <Image width={42} height={40} src={"/profile.png"} alt="" />
                </Box>
                <Text fontWeight={500} fontSize={"18px"}>
                  John Doe
                </Text>
              </Flex>
              <Box textColor={"#626871"} fontWeight={500}>
                <Text mb={"4px"} textColor={"var(--soft400)"} fontSize={"12px"}>
                  EMAIL
                </Text>
                <Text fontSize={"14px"}>Johndoe@gmail.com</Text>
              </Box>
              <Flex w={"100%"} gap={"28px"}>
                <Box textColor={"#626871"} fontWeight={500}>
                  <Text
                    mb={"4px"}
                    textColor={"var(--soft400)"}
                    fontSize={"12px"}
                  >
                    PHONE NO.
                  </Text>
                  <Text fontSize={"14px"}>08123456786</Text>
                </Box>
                <Box textColor={"#626871"} fontWeight={500}>
                  <Text
                    mb={"4px"}
                    textColor={"var(--soft400)"}
                    fontSize={"12px"}
                  >
                    USER TYPE
                  </Text>
                  <Text fontSize={"14px"}>Affiliate</Text>
                </Box>
              </Flex>
              <Box textColor={"#626871"} fontWeight={500}>
                <Text mb={"4px"} textColor={"var(--soft400)"} fontSize={"12px"}>
                  PROPERTY
                </Text>
                <Text fontSize={"14px"}>2</Text>
              </Box>
            </Flex>
          </Flex>
        ) : null}
      </Flex> */}
      {/* 
      {isAdmin ? (
        <Flex
          w={"100%"}
          justifyContent={"center"}
          gap={{ base: "24px", lg: "28px" }}
          flexWrap={"wrap"}
          mt={{ base: "60px", lg: "120px" }}
        >
          {properties.map((property) => {
            return (
              <PropertyCard
                key={property?.id}
                image={property?.image}
                title={property?.title}
                pricing={property?.pricing}
                location={property?.location}
                userImage={property?.userImage}
                email={property?.email}
                user={property?.user}
              />
            );
          })}
        </Flex>
      ) : null} */}
    </Box>
  );
};
