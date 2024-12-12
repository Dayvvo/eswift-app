import { Box, Flex, Text, Image, Grid } from "@chakra-ui/react";
import Link from "next/link";
import { FaMoneyBills } from "react-icons/fa6";
import { HiMiniBuildingStorefront } from "react-icons/hi2";
import { IoStatsChart } from "react-icons/io5";
import { MdArrowOutward} from "react-icons/md";
import { PiBuildingOfficeFill } from "react-icons/pi";
import { PropertiesCard } from "../properties/propertiesCard";
import Btn from "@/components/Btn";
import { useEffect, useState } from "react";
import { PropertyCardProps } from "../Property/propertyCard";
import { useRouter } from "next/router";
import useProperty from "@/hooks/useProperty";
import axios from "axios";
import { useDebounce } from "@/hooks/useDebounce";
import { useApiUrl } from "@/hooks/useApi";



const OverviewScreen = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [fetchData, setFetchData] = useState<PropertyCardProps[]>([]);
    const [page , setPage] = useState<number | null>();
    const [inputValue, setInputValue] = useState<any>("");
    
    const debounce = useDebounce()


    const card = [
        {
            id:1, 
            icon:<HiMiniBuildingStorefront />,
            title:'Find Your Dream Home',
            navigate:'',
        },
        {
            id:2, 
            icon:<FaMoneyBills/>,
            title:'Become an agent',
            navigate:'',
        },
        {
            id:3, 
            icon:<PiBuildingOfficeFill />,
            title:'Become Affiliate',
            navigate:'',
        },
        {
            id:4, 
            icon:<IoStatsChart />,
            title:'Statistics',
            navigate:'',
        }
    ]

    

    const copies = 3


    const [propertyList,setPropertyList] = useState<PropertyCardProps[]>([]);

    const { get } = useApiUrl()

    const getPropertyFunction = async()=> {
        setLoading(true);
        try {
          setLoading(false);
          const fetchData = await get(`/property?keyword=${inputValue}&PageNumber={${page}}`);
          setFetchData(fetchData?.data?.data);
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
        
    }

    useEffect(() => {
        debounce(() => getPropertyFunction())
    },[])

    return ( 
        <Box
            w={'100%'}
            minH={'100%'}
            className="robotoF"
        >
            <Flex
                flexDir={'column'}
                w={'100%'} h={'100%'}
            >
                    {/* <Flex
                        w={'fit-content'}
                        bg={'#FFF'}
                        flexWrap={'wrap'}
                        gap={'10px'} 
                        justifyContent={'center'}
                        borderRadius={'10px'}
                    >
                        {
                            card.map((item)=> (
                                <Flex key={item?.id}
                                    bg={'#3170A6'} borderRadius={'10px'}
                                    w={{base:'100%',md:'240px'}} h={'140px'}
                                    p={'16px'}
                                    textColor={'white'}
                                    className="robotoF"
                                    flexDir={'column'} alignItems={'center'}
                                    // _hover={{bg:'#3170A690'}}
                                >
                                    <Flex w={'100%'} justifyContent={'end'}>
                                        <Link href={item?.navigate}>
                                            <Box fontSize={'26px'}>
                                                <MdArrowOutward />
                                            </Box>
                                        </Link>
                                    </Flex>
                                    <Flex position={'relative'}
                                        w={'60px'} h={'60px'}
                                        alignItems={'center'}
                                        justifyContent={'center'}
                                        fontSize={'24px'}
                                    >
                                        <Image src="/Icon-Container.png" alt="" w={'60px'} h={'60px'} position={'absolute'}/>
                                        {item?.icon}
                                    </Flex>
                                    <Text mt={'16px'} fontSize={'14px'} fontWeight={600}>
                                        {item?.title}
                                    </Text>
                                </Flex>
                            ))
                        }
                    </Flex> */}
                    <Flex w={'100%'} mb={'60px'} flexDir={'column'} alignItems={'center'}>
                        <Flex w="100%" 
                            justifyContent={'space-between'}
                            alignItems={'center'}
                        >
                            <Box w={'100%'} className="robotoF" mb={'24px'}>
                                <Text 
                                    fontWeight={500}
                                    textColor={'var(--strong950)'}
                                    fontSize={{base:'14px',lg:'18px'}}
                                >
                                    Properties you might like...
                                </Text>
                                <Text 
                                    fontWeight={400}
                                    textColor={'var(--sub600)'}
                                    fontSize={{base:'10px',lg:'14px'}}
                                >
                                    A Glimpse of the properties we have for you.
                                </Text>
                            </Box>
                            <Btn onClick={()=> router.push('/properties')}
                                w="68px" h="36px" bg={'white'}
                                border="1px solid var(--soft200)"
                                borderRadius={'8px'} textColor="(var--sub600)"
                                fontSize={'14px'} fontWeight={500} 
                                className="robotoF"
                            >
                                See All
                            </Btn>
                        </Flex>
                        <Grid templateColumns={{base:'repeat(1, 1fr)', md:'repeat(2, 1fr)', xl:'repeat(3, 1fr)'}} 
                            gap={'20px'} placeContent={'center'}
                        >
                            {
                                fetchData.slice(0,3).map((item)=>(
                                    <PropertiesCard key={item?._id}
                                        {...item}
                                        _id={item?._id}  
                                        view="client"                                 
                                    />
                                ))
                            }
                        </Grid>
                            
                    </Flex>

            </Flex>
        </Box>
    );
}
 
export default OverviewScreen;