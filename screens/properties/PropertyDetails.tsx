"use client";
import React from "react";
import Btn from "@/components/Btn";
import {
  Box,
  Flex,
  Text,
  Image,
  Grid,
  Stack,
  Skeleton,
  Card,
  CardBody,
} from "@chakra-ui/react";
import useProperty, { Favourite } from "@/hooks/useProperty";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context";
import { R } from "@/utils/types";
import { PropertyCardProps } from "../Property/propertyCard";
import { useRouter } from "next/router";
import { MdLocationOn } from "react-icons/md";
import { BackIcon, ZigiZagaIcon } from "../../components/svg";
import { AxiosError, AxiosResponse } from "axios";
import useToast from "@/hooks/useToast";
import useAuth from "@/hooks/useAuth";
import { TbCurrencyNaira } from "react-icons/tb";
import { FaCheckCircle } from "react-icons/fa";

export const PropertyDetails = ({ clientView }: { clientView?: boolean }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
   const [favoritesUpdated, setFavoritesUpdated] = useState(false);
  const router = useRouter()
  const pathName = router.pathname;

  const {authProtectedFn} = useAuth()

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const [loadingBtn, setLoadingBtn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { globalContext, setGlobalContext } = useAppContext();

  const toast = useToast();

  const { user } = globalContext;

  const [detailsData, setDetailsData] = useState<PropertyCardProps | null>(
    null
  );

  const { getPropertyDetails, addToFavorites, deleteFromFavorites } =
    useProperty();

  const { query, isReady } = useRouter();

  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const addToFave = async (id: string) => {
    try {
      const { data } = (await addToFavorites(id)) as AxiosResponse;
      if (data) {
        setFavoritesUpdated((prev => !prev))
        setIsFavorite(true);
        toast.toast({
          title: "Request successful",
          status: "success",
          description: "Property added to favoriites",
        });
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
        setFavoritesUpdated((prev => !prev))
        setIsFavorite(false);
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


  const getPropertyFunction = async () => {
    setLoading(true); // Set loading to true before fetching data
    try {
      const request = await getPropertyDetails(query?.id as string);
      const data = request.data as R;
      setDetailsData(data?.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };
  
  useEffect(() => {
    if (detailsData) {
      setIsFavorite(detailsData.isInFavorites || false);
    }
  }, [detailsData, favoritesUpdated]);

  useEffect(() => {
    if (isReady) {
      getPropertyFunction();
    }
  }, [isReady, query?.id, favoritesUpdated]);

  const isAdmin = user?.role === "Admin";

  // if(!detailsData) {
  //   return(<></>);
  // }


  return (
    <Box bg={"#FFF"} w={clientView ? "80%" : "100%"} pb={'4rem'}>
    <Box  
    cursor={"pointer"} 
    alignItems={"center"}
    justifyContent={"center"}
    display={'flex'}
    border={"1px solid #E1E4EA"}
    borderRadius={"50%"}
    maxW={"30px"}
    h="30px"
    onClick={() => router.back()}
    >
      <BackIcon color="black" />
  </Box>
   
    {loading && !detailsData && (
        <Stack spacing={4} p={4}>
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
        </Stack>
      )}

      {!loading && detailsData && <>
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

              {!detailsData || !isReady ? null : !isFavorite ? (
              <Btn
                border="1px solid #FB3748"
                borderRadius={"10px"}
                padding={"10px"}
                color="#FB3748"
                className="robotoF"
                bgColor="transparent"
                w="100%"
                onClick={() =>
                  authProtectedFn(() => addToFave(detailsData?._id as string), pathName)
                }
                isLoading={loadingBtn}
              >
                Add to favorites
              </Btn>
              ) : (
                <Btn
                  border="1px solid #FB3748"
                  borderRadius={"10px"}
                  py={"10px"}
                  px={'2rem'}
                  color="#FB3748"
                  className="robotoF"
                  bgColor="transparent"
                  w="100%"
                  isLoading={loadingBtn}
                  onClick={() => deleteFromFave(detailsData?.favoriteId as string)}
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
      </>}
      {!loading && !detailsData && (
      <Card mt={'60px'}>
        <CardBody>
          <Text>Property details not available please try again</Text>
        </CardBody>
      </Card>
        )}
     </Box>
  );
};
