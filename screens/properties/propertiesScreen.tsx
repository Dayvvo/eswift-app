
import { HeroPropsVideo } from "@/components/heroPropsVideo";
import NavBar from "@/components/navBar";
import { Box,InputGroup, Input, InputRightElement, Grid, Stack, Skeleton, Card, CardBody, Text } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { PropertiesCard } from "./propertiesCard";
import { Footer } from "@/components/footer";
import axios from "axios";
import Btn from "@/components/Btn";
import { Background } from "../home/Background";
import { TextHeader } from "../home/textHeader";
import { properties } from "@/utils/types";
import { PropertyCardProps } from "../Property/propertyCard";
import { useDebounce } from "@/hooks/useDebounce";
import useProperty from "@/hooks/useProperty";
import useToast from "@/hooks/useToast";


const PropertiesScreen =()=> {

    const [inputValue, setInputValue] = useState<string>('');

    const [fetchData, setFetchData] = useState<PropertyCardProps[]>([]);

    const [isLoading, setLoading] = useState<boolean>(false);

    const [page, setPage] = useState<number>(0);

    const debouce = useDebounce()
    const toast = useToast()

    const {getFavorites} = useProperty()
    const getFavoritesList = async() => {
        try {
            const {data} = await getFavorites()
            console.log('data', data.data)
            
        } catch(error: any) {
            let err = error 
            if(err?.response){
                toast.toast({
                    title:'Request failed',
                    status:'error',
                    description:'Failed to get favorites list'
                })
            }
        }
    }
   useEffect(()=>{
        getFavoritesList()
    
   }, [page, inputValue])
    useEffect(()=> {
        const getPropertyFunction = async () => {
            setLoading(true);
            try {
                const fetchData = await axios.get(`/api/property?keyword=${inputValue}&PageNumber={${page}}`);
                setFetchData(fetchData?.data?.data);
            } 
            catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        debouce(()=>getPropertyFunction())
    },[page, inputValue]);

    function scrollToSection() {
        const section = document.querySelector('#main') as HTMLElement;
        section.scrollIntoView({ behavior: 'smooth' });
    };



    return (

        <>
            <Box>
                <NavBar/>
                <HeroPropsVideo  
                    bg={"#00000070"} header={"Find Dream Properties"}
                    details={"Explore our extensive listings of properties in Lagos and beyond"}
                    buttonPos={null} w={"100%"} h={"100vh"} video={"/PropertiesVideo.mp4"} click={scrollToSection}
                />
                <Background/>
                <Box id='main'
                    py={'120px'}
                    px={{base:'1rem',lg:'5rem'}}
                    display={'flex'} flexDir={'column'} 
                    alignItems={'center'} gap={'20px'}
                >
                    <InputGroup
                        display={'flex'} alignItems={'center'}
                        border={'1px'} borderRadius={'10px'} 
                        bg={'#E2EDF3'}
                        borderColor={'#26262630'}
                        _focusWithin={{border:'1.5px solid #3170A6'}}
                        cursor={'search'}
                        fontSize={{base:12,lg:14}} textColor={'var--(sub600)'}
                        maxW='1020px' h={{base:'52px',lg:'80px'}}
                        className="urbanist" overflow={'hidden'}
                    >
                        <Input 
                         w={'80%'} h={'100%'}
                         _placeholder={{textColor:'#666666', fontSize:{base:'10px',md:'14px',lg:'20px'}}}
                         border={'none'} _focusVisible={'none'}
                         type='search' 
                         placeholder='Search for a property by title, description or category'  
                         value={inputValue}
                         onChange={(e:any) => setInputValue(e.target.value)}                      
                        />
                        <InputRightElement pointerEvents="none" w={'fit-content'} h={'max-content'} mt={{base:2.5,lg:4}} mx={{base:1,lg:3}} zIndex={30}>
                            <Btn
                             display={'flex'}
                             justifyContent={'center'}
                             alignItems={'center'}
                             W={{base:'60px',lg:'148px'}}
                             h={{base:'32px',lg:"48px"}}
                             bg={'#3170A6'}
                             borderRadius={'8px'}
                             textColor={'white'}
                             gap={'8px'}
                             _hover={{opacity:0.5}}
                             fontSize={{base:'8px', lg:'14px'}}
                            >
                                <RiSearch2Line/> Find Property
                            </Btn>
                        </InputRightElement>
                    </InputGroup>

                    <TextHeader Header={"Discover a World of Possibilities"} sub={"Our portfolio of properties is as diverse as yur dreams. Explore the following categories to find the perfect property that resonates with your vision of home"}/>
                    {isLoading && (
                        <Stack spacing={4} width={'100%'} maxW={'1020px'}>
                        <Skeleton height="40px" />
                        <Skeleton height="40px" />
                        <Skeleton height="40px" />
                        </Stack>
                    )}

               {!isLoading && fetchData?.length > 0 && <Grid templateColumns={{base:'repeat(1, 1fr)', md:'repeat(2, 1fr)', xl:'repeat(3, 1fr)'}} 
                        gap={'20px'} placeContent={'center'}
                    >
                        {
                            fetchData.map((item)=>{
                                return(
                                    <PropertiesCard key={item?._id}
                                        {...item}
                                        _id={item?._id}
                                        view='client'
                                    />
                                )
                            })
                        }
                    </Grid>}
               { !isLoading && fetchData?.length === 0 && <Card>
                <CardBody>
                    <Text>No property available or reload</Text>
                </CardBody>
              </Card>}
                    {/* <LoadMore click={()=> page + 1}/> */}
                    
                </Box>
                <Footer/>
            </Box>
            
        </>
    )
}

export default PropertiesScreen;