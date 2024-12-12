import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import Btn from "@/components/Btn";
import { IoPlayOutline } from "react-icons/io5";
import { Stats } from "./homeAboutSection";


const Hero = ({click}:{click:()=> void}) => {

  return (
    <>
      <Box id="hero" width={"100%"} height={"100vh"} pos={'relative'}
        bgImage="url('/BG.png')"
        bgSize="cover"
        bgPosition="center"
        className="robotoF"
        overflow={'clip'}
      >
        <Flex bg={"transparent"}
          flexDir={{base:'column',lg:'row'}}
          py={{base:'80px',lg:"140px"}} 
          width={"100%"} h={"100%"}
          alignItems={{base:"start", lg:"start"}}
        >
          <Flex 
            px={{ base: "1rem", lg:"6rem" }}
            flexDir={"column"} gap={{base:'12px',sm:"16px"}} color={"var(--TextCol)"}
            w={{base:"100%", xl:"50%"}} className="robotoF"
          >
            <Text textAlign={{base:'center', lg:'start'}} fontSize={{base:"32px",md:'42px', lg:'38px', xl:"64px"}} fontWeight={400} className="antic">
              We Provide Dream Properties
            </Text>
            <Text textAlign={{base:'center', lg:'start'}} fontSize={{base:"14px", xl:"18px"}} fontWeight={400}>
              Discover your perfect space with our expert guidance and extensive listings.
            </Text>
            <Flex mt={{base:'24px', lg:'34px'}}
              justifyContent={{base:'center',lg:'start'}}
              alignItems={'center'} w={'100%'} gap={'8px'}
            >
              <Text fontSize={{base:"12px",md:"14px",lg:"16px"}} fontWeight={700}>
                SEARCH PROPERTIES NOW
              </Text>
              <Flex w={'80px'} h={'2px'} bg={'var(--TextCol)'}/>
              <Link href={'/properties'}>
                <Btn
                  display={'flex'} alignItems={'center'} justifyContent={'center'}
                  py="14px" w={'fit-content'} h={'fit-content'}
                  px="14px" _hover={{borderColor:'#3170A8'}}
                  borderRadius={'999px'} bg={'transparent'}
                  border={'2px solid var(--TextCol)'} textColor={'var(--TextColor)'} fontSize={'20px'}
                >
                  <IoPlayOutline />
                </Btn>
              </Link>
            </Flex>
            <Stats/>
            
          </Flex>
          <Flex
              w={{base:"100%", xl:"50%"}} className="robotoF"
              bg={'transparent'} alignItems={'end'} justifyContent={'flex-end'}
            >
              <Image width={'100%'} height={'100%'} src="/Hero.png" alt="hero"/> 
          </Flex>
          
        </Flex>

        <Box position={'absolute'} bottom={40} display={'flex'} w={'100%'} justifyContent={'center'} fontSize={'30px'}
          opacity={0.4}
        >
          <Box zIndex={50}>
            <Image onClick={click} src="/HeroPulsing.gif" alt="pulsing" w={78} h={78} className="upside"/>
          </Box>
        </Box>
        <Image src="/Underlay.png" alt="" 
          position={'absolute'} zIndex={40} bottom={0}
          w={'100%'} h={'20%'}
        />
      </Box>
    </>
  );
};

export default Hero;
