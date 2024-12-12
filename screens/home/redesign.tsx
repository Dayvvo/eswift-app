import { Logo } from "@/components/logo"
import { Box, Flex,Text } from "@chakra-ui/react"
import Image from "next/image"



export const Resdesign =()=> {
    return(
        <>
            <Box w="100vw" position={'relative'}
                h="100vh"
                overflow="hidden"
                bg={'#FFF'}
                pt={{base:'20px',lg:'60px'}}
                display={'flex'} flexDir={'column'}
            >
                <Flex
                    px={{base:'1rem',lg:'4rem'}}
                    w="100%"
                    h={'auto'}
                >
                    <Logo width={200} height={40}/>
                </Flex>
                <Flex w={'100%'}
                    h={'100%'}
                    flexDir={'column'}
                    px={{base:'2rem',md:'8rem'}}
                >
                    <Flex w={'100%'}
                        justifyContent={'end'}
                    >
                        <Image src="/Blocks.gif" alt="" width={200} height={200}/>
                    </Flex>
                    <Flex w={'100%'}
                    >
                        <Image src="/Redesign.png" alt="" width={500} height={400}/>
                    </Flex>
                    <Box
                        className="inter"
                        mt={2}
                    >
                        <Text fontSize={{base:'24px',lg:'40px'}}
                            fontWeight={400} 
                            textColor={'black'}
                        >
                            to serve you better.
                        </Text>
                        <Flex w={{base:'200px',lg:'367px'}} h={{base:'32px',lg:'38px'}} bg={'#1A1D66'}/>
                    </Box>
                </Flex>
                <Box display={'flex'} alignItems={'end'} pos={'relative'} flexBasis={1}
                    w={'max-content'}>
                    <Image width={300} height={200}
                        src={'/Cloud.gif'} alt="clouds"
                    />
                    <Image width={300} height={200}
                        src={'/Cloud.gif'} alt="clouds"
                    />
                    <Image width={300} height={200}
                        src={'/Cloud.gif'} alt="clouds"
                    />
                    <Image width={300} height={200}
                        src={'/Cloud.gif'} alt="clouds"
                    />
                    <Image width={300} height={200}
                        src={'/Cloud.gif'} alt="clouds"
                    />
                    <Image width={300} height={200}
                        src={'/Cloud.gif'} alt="clouds"
                    />
                    <Image width={300} height={200}
                        src={'/Cloud.gif'} alt="clouds"
                    />
                </Box>
            </Box>
        </>
    )
}