import { Box, Flex, Text } from "@chakra-ui/react"


export const Video =()=> {
    return (
        <>
            <Box id="video" width={"100%"}>
                <video width={'100%'} height={'100vh'} loop autoPlay >
                    <source src="https://eswift-space-bucket.lon1.cdn.digitaloceanspaces.com/assets/AboutSectionVid.mp4" type="video/mp4"/>
                </video>
            </Box>
        </>
    )
}