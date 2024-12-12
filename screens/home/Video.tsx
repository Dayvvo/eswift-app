import { Box, Flex, Text } from "@chakra-ui/react"
import Image from "next/image"


export const Video =()=> {
    return (
        <>
            <Box id="video" width={"100%"}>
                {/* <iframe src="https://drive.google.com/file/d/1lLKuXskJfQDz6WFn7V8bB6G6uUtjvlGe/preview" width="100%" height="800px"></iframe> */}

                <video width={'100%'} height={'100vh'} loop autoPlay>
                    <source src="https://eswift-space-bucket.lon1.cdn.digitaloceanspaces.com/assets/PropertiesVideo.mp4" type="video/mp4"/>
                </video>
            </Box>
        </>
    )
}