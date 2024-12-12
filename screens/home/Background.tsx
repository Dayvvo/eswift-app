import { Box, Flex, Image } from "@chakra-ui/react";

export const Background =()=> {
    return(

        <Box
            w={'100%'} h={'100vh'}
            bgImage="url('/BG2.png')"
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
                <Image src="/coconutLeaf5.png" alt="coco" w="800px" h="500px"/>
                <Image src="/treeLeaf1.png" alt="tree" w="800px" h="500px"/>
            </Flex>
        </Box>

    )
};