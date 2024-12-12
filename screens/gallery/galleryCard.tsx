import { Box, Flex, Img, Text } from "@chakra-ui/react"
import Image from "next/image"
import moment from "moment";

type GalleryCardProps = {
    picture?:string;
    title?:string;
    date?:string;
    details?:string;
}

export const GalleryCard =({
    picture, title, date, details
}:GalleryCardProps) => {

    return(
        <>
            <Box
                className="roboto"
                bg={'#FFF'}
                maxW={'295px'} h={'400px'}
                pb={'1px'} boxShadow={'lg'}
                overflow={'hidden'}
            >
                <Flex
                    position={'relative'}
                    w='100%' h='295px' 
                >
                    <Image 
                        width={1000} height={1000}
                        layout="responsive"
                        src={`${picture}`} 
                        alt={'project'}
                    />
                </Flex>
                <Flex  
                    className="roboto"
                    flexDir={'column'} gap={'8px'}
                    w={'100%'} 
                    mt={'8px'} 
                    px={2}
                >
                    <Flex  
                        w={'100%'}
                        justifyContent={'space-between'} 
                        alignItems={'center'} textColor={'#000'}
                    >
                        <Text
                            fontSize={{base:'14px', lg:'14px'}} 
                            fontWeight={700}
                        >
                            {title}
                        </Text>
                        <Text
                            display={'flex'} alignItems={'center'}
                            fontSize={{base:'14px', lg:'14px'}} 
                            fontWeight={400}
                        > 
                           {moment(date).format('MMM YYYY')}
                        </Text>
                    </Flex>          
                </Flex>
                <Text mt={3} fontSize={'12px'} fontWeight={400} textColor={'#3A314880'} px={2} className="roboto">
                    {details}
                </Text>
            </Box>
        </>
    )
}