import { Box, Flex, Image, Text, Tooltip } from "@chakra-ui/react";
import { TbCurrencyNaira } from "react-icons/tb";
import router from "next/router";
import { MdLocationOn } from "react-icons/md";
import Btn from "@/components/Btn";
import useToast from "../../hooks/useToast";
import { PropertyCardProps } from "../Property/propertyCard";
import { IoIosHeartEmpty, IoIosHeartDislike } from "react-icons/io";
import useAuth from "@/hooks/useAuth";
import useProperty, { Favourite } from "@/hooks/useProperty";
import { AxiosError, AxiosResponse } from "axios";
import { useAppContext } from "@/context";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { R } from "@/utils/types";
interface PropertiesCardProps extends PropertyCardProps {
  view?: "client" | "admin";
  isInFavorites?: boolean;
  onClick?: () => void;
  favoriteId?: string;
}

export const PropertiesCard = ({
  images,
  title,
  price,
  description,
  address,
  _id,
  onClick,
  view,
  favoriteId,
  isInFavorites,
}: PropertiesCardProps) => {
  const toast = useToast();
  const { setGlobalContext, globalContext } = useAppContext();
  const { authProtectedFn } = useAuth();
  const { addToFavorites, deleteFromFavorites, getFavorites } = useProperty();

  const [isFavorite, setIsFavorite] = useState<boolean>(isInFavorites || false);
  const [favId, setFavId] = useState<string | undefined>(favoriteId);

  const pathName = router.pathname; // ✅ Ensure route is defined

  useEffect(() => {
    (async () => {
      try {
        const { data: res } = await getFavorites();

        const favorites = {
          ...res,
          data: res?.data?.map(
            (res: R) =>
              ({
                ...res?.property,
                _id: res?.property?._id,
                favoriteId: res?._id,
                isFavorite: true,
              } as Favourite)
          ),
        };

        setGlobalContext &&
          setGlobalContext((prev) => ({
            ...prev,
            favourites: favorites?.data,
          }));
      } catch (err) {
        console.log("err", err);
      }
    })();
  }, [isFavorite]);
  useEffect(() => {
    const fav = globalContext.favourites.find((fav) => fav._id === _id);
    setIsFavorite(!!fav);
    setFavId(fav?.favoriteId); // Ensure favoriteId is available
  }, [globalContext.favourites, _id]);

  const addToFave = async (id: string) => {
    try {
      const { data } = (await addToFavorites(id)) as AxiosResponse;

      if (data) {
        setIsFavorite(true);
        setFavId(data._id); // Store favoriteId

        toast.toast({
          title: "Added to favorites",
          status: "success",
          description: "Property added to favorites",
        });

        setGlobalContext &&
          setGlobalContext((prev) => ({
            ...prev,
            favourites: [...prev.favourites, data as Favourite],
          }));
      }
    } catch (err) {
      let error = err as AxiosError;
      toast.toast({
        status: "error",
        title: "Error",
        description: "Failed to add property to favorites",
      });
    }
  };

  const deleteFromFave = async (id: string) => {
    if (!id) return; // Prevent deleting undefined ID

    try {
      await deleteFromFavorites(id);
      setIsFavorite(false);
      setFavId(undefined); // Clear stored favoriteId

      toast.toast({
        title: "Removed from favorites",
        status: "success",
        description: "Property removed from favorites",
      });

      setGlobalContext &&
        setGlobalContext((prev) => ({
          ...prev,
          favourites: prev.favourites.filter((prop) => prop.favoriteId !== id),
        }));
    } catch (err) {
      toast.toast({
        title: "Error",
        description: "Failed to remove property from favorites",
      });
    }
  };

  return (
    <Box
      className="roboto"
      bg={"#fff"}
      maxW={"400px"}
      h={"fit-content"}
      p={{ base: "14px", sm: "20px" }}
      borderRadius={"12px"}
      border={"1px solid #262626"}
      overflow={"hidden"}
      cursor={"pointer"}
      display="flex"
      flexDirection="column"
      minH="550px"
    >
      <Flex
        position={"relative"}
        w="100%"
        h="250px"
        borderRadius={"10px"}
        overflow={"hidden"}
      >
        <Image width={"100%"} src={images?.[0]} alt={"property"} />
      </Flex>

      <Flex
        className="robotoF"
        flexDir={"column"}
        gap={"16px"}
        w={"100%"}
        my={"24px"}
        flex="1"
      >
        <Flex
          w={"100%"}
          h={"32px"}
          alignItems={"center"}
          px={"12px"}
          borderRadius={"28px"}
          border={"1px solid #262626"}
          gap={"4px"}
          textColor={"black"}
          fontSize={"16px"}
          className="robotoF"
          fontWeight={500}
        >
          <MdLocationOn />
          <Text
            fontSize="14px"
            maxW={"90%"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            whiteSpace={"nowrap"}
            isTruncated
          >
            {address}
          </Text>
        </Flex>
        <Text
          fontSize={{ base: "16px", lg: "20px" }}
          fontWeight={600}
          isTruncated
        >
          {title}
        </Text>
        <Text
          h={"48px"}
          overflow={"hidden"}
          textOverflow={"ellipsis"}
          fontSize={"16px"}
          fontWeight={500}
          textColor={"#999999"}
          className="roboto"
        >
          {description}
        </Text>
      </Flex>

      <Flex
        w={"100%"}
        justifyContent={"space-between"}
        alignItems={"end"}
        gap={"10px"}
        className="robotoF"
        mt="auto"
      >
        <Flex flexDir={"column"} justifyContent={"space-between"}>
          <Text fontWeight={500} fontSize={"14px"} textColor={"#999999"}>
            Price
          </Text>
          <Text
            display={"flex"}
            alignItems={"center"}
            fontSize={"20px"}
            fontWeight={600}
            textColor={"#191919"}
          >
            <TbCurrencyNaira />
            {price?.amount}
          </Text>
        </Flex>

        <Flex gap="1em" align={"center"}>
          {!isFavorite ? (
            <Tooltip content="Add to favorites">
              <IoIosHeartEmpty
                onClick={() =>
                  authProtectedFn(() => addToFave(_id as string), pathName)
                }
                cursor={"pointer"}
                className="empty"
                fontSize={"30px"}
                color="#3170A6"
              />
            </Tooltip>
          ) : (
            <Tooltip content="Remove from favorites">
              <IoIosHeartDislike
                onClick={() => favId && deleteFromFave(favId)}
                cursor={"pointer"}
                className="dislike"
                fontSize={"30px"}
                color="#3170A6"
              />
            </Tooltip>
          )}

          <Btn
            onClick={() => router.push(`/properties/${_id}`)}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            maxW={"208px"}
            h="48px"
            bg={"#3170A6"}
            borderRadius={"8px"}
            textColor={"white"}
            className="robotoF"
            fontSize={{ base: "10px", xl: "14px" }}
            fontWeight={500}
          >
            View Details
          </Btn>
        </Flex>
      </Flex>
    </Box>
  );
};
