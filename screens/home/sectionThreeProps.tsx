import { Box, Flex, Text, Image } from "@chakra-ui/react"
import { LuDot } from "react-icons/lu";

interface props {
    mobile:string;
    web:string;
    view:string;
    gap:string | null;
    w:string | number;
    h: string | number;
    wid: string | number;
    hei: string | number;
    listData: {id: number; point: string}[];
}

export const SectionThreeProps:React.FC<props> =(
    {
        mobile, web, view,
        wid, hei, w , h, gap, listData ,
    }
)=> {

    const ListData = listData;

    const mobileDirection = mobile as ('row' | 'column');
    const webDirection = web as ('row' | 'column');

    return (
        <>
            
            <Flex bg={"transparent"}
                w={'100%'} h={'fit-content'}
                flexDirection={{base:`${mobileDirection}`, lg:`${webDirection}`}}
                width={"100%"} gap={`${gap}`}
                alignItems={'center'}
                px={{base:'1rem',lg:'2rem'}} 
            >
                <Flex w={{base:'100%',lg:`${wid}`}} h={`${hei}`}>
                    <Image src={`${view}`} alt="" w={'100%'} h={'100%'} />
                </Flex>
                <Flex flexDir={'column'}
                    justifyContent={'center'}
                    w={{base:'100%',lg:`${w}`}} h={`${h}`}
                    className="roboto" gap={'8px'}

                >
                    <Box>
                        {
                            ListData.map((list) => (
                                <Flex 
                                    key={list?.id}
                                    alignItems={'start'}
                                    gap={'4px'}
                                    textColor={'var(--TextCol)'}
                                >
                                    <Text as={'span'} mt={'8px'}>
                                        <LuDot/>
                                    </Text>
                                    <Text fontSize={{base:'16px', lg:'20px'}} fontWeight={300}>
                                        {list?.point}
                                    </Text>
                                </Flex>
                            ))
                        }
                    </Box>
                </Flex>
                
            </Flex>
        
        </>
    )
}