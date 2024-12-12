import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";

interface HeroProps {
    bgImage:string;
    bg:string;
    Nav:string;
    header:string;
    details:string;
    buttonPos:string | null;
    w:string | number;
    h:string | number;

}

export const HeroProps:React.FC<HeroProps> =({
    bg, bgImage,Nav, header, details, buttonPos,h,w
}) => (
    <Box
        bgImage={bgImage}
        w={w} h={h}
        bgSize="cover"
        bgPosition="center"
        overflow={'clip'}
    >
        <Flex bg={bg}
          flexDir={'column'}
          justifyContent={'center'}
          width={"100%"} h={"100%"}
          alignItems={'center'} textAlign={'center'}
          py={'4rem'} px={'1rem'}
          textColor={'#FFF'}
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
            >
                {details}
            </Text>
            <Link href={`${Nav}`} className={`${buttonPos}`}>
                <Image src={'/Arrow.gif'} alt="/" width={150} height={150}/>
            </Link>
        </Flex>
    </Box>
)