import { Box, Text, Image } from "@chakra-ui/react"


type props = {
    Header: string;
    sub:string;
}

export const TextHeader =({Header, sub}:props)=> {

    return(
        <Box
            w={'100%'}
            h={'fit-content'}
            my={2}
        >
            <Image src="/Abstract.png" alt="Abstract" w={'54px'} h={'24px'}/>
            <Text
                className="antic"
                fontWeight={400} 
                fontSize={{base:'24px',lg:'38px'}}
                textColor={'black'}
                pl={'4px'}
            >
                {Header}
            </Text>
            <Text
                className="urbanist"
                fontWeight={500} 
                fontSize={{base:'12px',lg:'18px'}}
                textColor={'#999999'}
                pl={'4px'}
            >
                {sub}
            </Text>
        </Box>
    )
} 