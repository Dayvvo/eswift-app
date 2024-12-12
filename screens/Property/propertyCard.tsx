import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { TbCurrencyNaira } from "react-icons/tb";
import { HiOutlineLocationMarker } from "react-icons/hi";
import Btn from "@/components/Btn";
import useToast from "@/hooks/useToast";
import useProperty from "@/hooks/useProperty";
import { useRouter } from "next/navigation";
import { useState } from "react";



export type PropertyCardProps = {
  _id?: string;
  images: string[];
  count?: number;
  cardWidth?: any;
  title?: string;
  price?: {
    mode?:string,
    amount?:string
  };
  category?:string;
  verification?: 'Pending' | 'Verified' | 'Rejected';
  features?: string[]
  documents?: {type:string, document:string, _id?: string}[];
  location?:string;
  description?: string;
  address?: string;
  email?: string;
  user?: string;
  state?:string;
  lga?:string;
  userImage?: string;
  onClick?: () => void;
  verificationState?: string;
  creatorID?:string;
  isInFavorites?: boolean;
  favoriteId?:string
};




export const PropertyCard = ({
  _id:id,
  images:image,
  title,
  count,
  price:pricing,
  address:location,
  cardWidth,
  email,
  user,
  userImage,
  onClick,
  verificationState,
}: PropertyCardProps) => {

  const [verificationStatus, setVerificationStatus] =
    useState(verificationState);
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();
  const { verifyProperty } = useProperty();
  const router = useRouter();

  const handleNavigation = () => {
    router.push("/property/" + id);
  };

  const data = {
    verification: "Verified",
  };
  
  
  const verifyPropertyFn = async () => {
    if (!id) {
      toast({
        status: "error",
        description: "Invalid property ID",
        title: "Error",
        position: "top",
        duration: 1000,
      });
      return;
    }
    setIsVerifying(true);
    try {
      const req = await verifyProperty(id, data);
      console.log(req);
      if (req.statusCode === 201) {
        setVerificationStatus(data.verification);
        toast({
          status: "success",
          description: "Property verified",
          title: "Success",
          position: "top",
          duration: 1000,
        });
      }
    } catch (err) {
      toast({
        status: 'error',
        description: "Failed to verify property",
        title: "Failed",
        position: "top",
        duration: 1000,
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const [image1]= image || []; 

  return (
    <Box
      className="RobotoF"
      bg={"#FFF"}
      maxW={'320px'}
      h={"420px"}
      // pb={"1px"}
      boxShadow={'md'}
      border={'1px solid #262626'} 
      borderRadius={"15px"}
      overflow={"hidden"}
      cursor={"pointer"}
      onClick={onClick}
    >
      <Flex position={"relative"} w="100%" h="60%">
        <Text
          className="montserrat"
          position={"absolute"}
          m={4}
          fontSize={"18px"}
          fontWeight={700}
          textColor={"#FFF"}
        >
          {/* {count || null} of 3 */}
        </Text>
        <Image
          width={'100%'}
          minWidth={{lg:'500px'}}
          src={`${image1}`}
          alt={"property"}
        />
        {/* <Img
                    width={'340px'}
                    src={`${image}`}
                    alt="property"
                /> */}
      </Flex>
      <Flex
        className=""
        flexDir={"column"}
        gap={"8px"}
        px={"16px"}
        w={"100%"}
        py={"8px"}
      >
        <Flex
          w={"100%"}
          justifyContent={"space-between"}
          alignItems={"center"}
          textColor={"#000"}
        >
          <Text fontSize={{ base: "16px", lg: "18px" }} fontWeight={600}>
            {title}
          </Text>
          <Text
            fontSize={{ base: "16px", lg: "18px" }}
            fontWeight={500}
            display={"flex"}
            alignItems={"center"}
            flexWrap={"nowrap"}
          >
            <TbCurrencyNaira />
            {pricing?.amount}
          </Text>
        </Flex>
        <Flex
          alignItems={"center"}
          gap={"4px"}
          textColor={"#626871"}
          fontWeight={400}
          fontSize={"14px"}
        >
          <HiOutlineLocationMarker />
          <Text
            fontSize={{ base: "12px", lg: "14px" }}
            width={"100%"}
            isTruncated
          >
            {location}
          </Text>
        </Flex>
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={"4px"}
          textColor={"#626871"}
          fontSize={"14px"}
        >
          <Flex h={"18px"} gap={"8px"} alignItems={"center"}>
            <Box w={"18px"} h={"18px"} borderRadius={"100px"} overflow={"clip"}>
              <Image width={18} height={18} src={`${userImage}`} alt="/" />
            </Box>
            <Text fontWeight={300} fontSize={{ base: "12px", lg: "14px" }}>
              {user}
            </Text>
          </Flex>
          <Box w={"1px"} h={"17px"} bg={"#DDE0E5"} />
          <Text fontWeight={200} fontSize={{ base: "12px", lg: "14px" }}>
            {email}
          </Text>
        </Flex>
        <Box w={"100%"} h={"1.5px"} bg={"#DDE0E5"} />
        <Btn
          m="1px"
          bg={"#fff"}
          textColor={"#000"}
          fontSize={"15px"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          w="100%"
          h="44px"
          border={"1px solid #000"}
          borderRadius={"15px"}
          _hover={{
            bg: "#1A1D66",
            textColor: "#FFF",
          }}
          onClick={handleNavigation}
        >
          View
        </Btn>

        {/* <Btn
            m="1px"
            bg={"#fff"}
            textColor={"#000"}
            fontSize={"15px"}
            display={"flex"}
            cursor={'pointer'}
            justifyContent={"center"}
            alignItems={"center"}
            w="100%"
            h="44px"
            border={"1px solid #000"}
            borderRadius={"15px"}
            _hover={{
              bg: "#1A1D66",
              textColor: "#FFF",
            }}
            isLoading={isVerifying}
            loadingText="Verifying"
            disabled={isVerifying}
            onClick={verifyPropertyFn}
          >
            verify
          </Btn> */}
      </Flex>
    </Box>
  );
};
