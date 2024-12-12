import { Box, Flex, Grid, Text } from "@chakra-ui/react"
import Image from "next/image"


export const Executives =()=> {
    
    const Executives:string = "" 


    return (
        <>
        <Box
            bg={'transparent'} w={'100%'} h={'fit-content'}
            className="antic" display={'flex'} alignItems={'center'}
            flexDir={'column'} py={{base:'14px',md:'24px'}} borderRadius={'12px'}
            border={'1px solid #262626'} px={'20px'}
        >
            <Box maxW={'920px'} h={''}>
                <Image width={1000} height={500} src={Executives} alt="photo" layout="responsive"/>
            </Box>
        </Box>    
        </>

    )
}