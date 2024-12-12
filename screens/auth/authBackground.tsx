import { Box, Flex, Image } from "@chakra-ui/react";

export const AuthBackground =()=> {
    return(

        <Box
            w={'100%'} h={'100vh'}
            bgImage="url('/AuthBG.png')"
            bgSize="cover"
            bgPosition="center"
            className="robotoF"
            position={'fixed'}
            left={0}
            top={0}
            overflow={'hidden'}
            zIndex={-1}
        >
            <Flex w={'100%'}
                justifyContent={'space-between'}
                mt={12}
            >
            </Flex>
        </Box>

    )
};