import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import Arrow from "../public/Arrow.gif"
import { useState, useRef } from 'react';


interface HeroProps {
    bg:string;
    header:string;
    details:string;
    buttonPos:string | null;
    w:string | number;
    h:string | number;
    video:string;
    click: ()=> void;

}

export const HeroPropsVideo:React.FC<HeroProps> =({
    bg, video, header, details, buttonPos,h,w, click
}) => {

    
    
    return(
        <Box
            w={w} h={h}
            position={'relative'}
            overflow={'hidden'}
        >
            <video autoPlay muted loop className="video">
                <source src={`${video}`} type="video/mp4"/>
            </video>

            <Flex bg={bg}
            flexDir={'column'}
            justifyContent={'center'}
            width={"100%"} h={"100%"}
            alignItems={'center'} textAlign={'center'}
            pt={'4rem'} px={'1rem'}
            textColor={'#FFF'}
            position={'absolute'}
            zIndex={60}
            inset={0}
            >
                <Text
                    className="antic"
                    fontSize={{base:'40px', md:'72px',lg:'100px'}}
                    fontWeight={400}
                    maxW={'1000px'}
                >
                    {header}
                </Text>                    
                <Text
                    className="roboto"
                    fontSize={{base:'16px', md:'24px',lg:'32px'}}
                    fontWeight={300}
                    maxW={'650px'}
                    mb={'200px'}
                >
                    {details}
                </Text>
                <Box onClick={click} className={`${buttonPos}`}>
                    <Image src={Arrow} alt="/" width={150} height={150}/>
                </Box>
            </Flex>
        </Box>
    )
}