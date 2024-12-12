import { Box, Flex, Image, Text, Tooltip } from "@chakra-ui/react";
import { TbCurrencyNaira } from "react-icons/tb";
import router from "next/router";
import { MdLocationOn } from "react-icons/md";
import Btn from "@/components/Btn";
import useToast from "../../hooks/useToast";
import { PropertyCardProps } from "../Property/propertyCard";
import { IoIosHeartEmpty, IoIosHeartDislike } from "react-icons/io";
import useAuth from "@/hooks/useAuth";
import useProperty, { Favourite } from "@/hooks/useProperty";
import { AxiosError, AxiosResponse } from "axios";
import { useAppContext } from "@/context";


interface propertiesCard extends PropertyCardProps {
    view?: 'client' | 'admin',
    isInFavorites?: boolean;
    onClick?: () => void;
    favoriteId?: string;
}

export const PropertiesCard =({images, title, price, description, address, _id, onClick, view, favoriteId, isInFavorites}:propertiesCard) => {

    const toast = useToast();

    const  {setGlobalContext} = useAppContext()

    const {  authProtectedFn } = useAuth();

    const { addToFavorites, deleteFromFavorites } = useProperty();

    const Navigate = () => {
        onClick && onClick();
        router.push(`/properties/${_id}`)
    }

    const pathName = router.pathname;

    const addToFave = async(id:string)=>{
        try{
            const {data} = await addToFavorites(id)  as AxiosResponse ; 
            if(data){
                toast.toast({
                    title:'Request successful',
                    status:'success',
                    description:'Property added to favoriites'
                });
                setGlobalContext && setGlobalContext(prev=>({
                    ...prev,
                    favourites: [...prev.favourites, data as Favourite] 
                }))
                
            };
        }
        catch(err){
            let error = err as AxiosError;
            if(error?.response){
                toast.toast({
                    status:'error',
                    title:'Request successful',
                    description:'Failed to add property added to favoriites'
                })
            }   
        }
    }

    const deleteFromFave = async(id:string)=>{
        try{
            const {data} = await deleteFromFavorites(id)  as AxiosResponse ; 
            if(data){
                toast.toast({
                    title:'Request successful',
                    status:'success',
                    description:'Property removed from favoriites'
                });
                setGlobalContext && setGlobalContext(prev=>({
                    ...prev,
                    favourites: prev.favourites.filter(prop=> prop?.favoriteId !==id) 
                }))
                
            };
        }
        catch(err){
            let error = err as AxiosError;
            if(error?.response){
                toast.toast({
                    title:'Request successful',
                    description:'Failed to remove property from favoriites'
                })
            }   
        }
    }

    return(
        <>
            <Box 
                className="roboto"
                bg={'#fff'}
                maxW={'400px'} h={'fit-content'}
                p={{base:'14px',sm:'20px'}} borderRadius={'12px'}
                border={'1px solid #262626'} 
                overflow={'hidden'}
                cursor={'pointer'}
            >
                <Flex
                    position={'relative'}
                    w='100%' h='250px' 
                    borderRadius={'10px'}
                    overflow={'hidden'}
                >
                    <Image 
                     width={1000} height={1000}
                     src={`${images}`} 
                     alt={'property'}
                    />
                </Flex>
                <Flex  
                    className="robotoF"
                    flexDir={'column'} gap={'16px'}
                    w={'100%'} 
                    my={'24px'} 
                >
                    <Flex 
                        w={'100%'}
                        h={'32px'}
                        alignItems={'center'}
                        px={'12px'} borderRadius={'28px'}
                        border={'1px solid #262626'} gap={'4px'}
                        textColor={'black'} fontSize={'16px'}
                        className="robotoF" fontWeight={500}
                    >
                        <MdLocationOn />
                        <Text fontSize="14px" maxW={'90%'} overflow={'hidden'} textOverflow={'ellipsis'} whiteSpace={'nowrap'}>
                            {address}
                        </Text>
                    </Flex>
                    <Flex  
                        flexDir={'column'}
                        w={'100%'} 
                        textColor={'#191919'}
                    >
                        <Text
                            fontSize={{base:'20px', lg:'20px'}} 
                            fontWeight={600}
                        >
                            {title}
                        </Text>
                        <Text h={'48px'} overflow={'hidden'}  textOverflow={'ellipsis'} fontSize={'16px'} fontWeight={500} textColor={'#999999'} className="roboto">
                            {description}
                        </Text>
                    </Flex>          
                </Flex>
                <Flex 
                    w={'100%'} 
                    justifyContent={'space-between'}
                    alignItems={'end'}
                    gap={'10px'} className="robotoF"
                >
                    <Flex 
                        flexDir={'column'}
                        justifyContent={'space-between'}
                    >
                        <Text fontWeight={500} fontSize={'14px'} textColor={'#999999'}>
                            Price
                        </Text>
                        <Text
                            display={'flex'} alignItems={'center'}
                            fontSize={'20px'} 
                            fontWeight={600} textColor={'#191919'}
                        >
                            <TbCurrencyNaira /> 
                            {price?.amount}
                        </Text>
                    </Flex>

                    <Flex gap='1em' align={'center'}>
                        {
                            !isInFavorites?
                                <Tooltip content='add to favorites' >
                                    <IoIosHeartEmpty onClick={()=>authProtectedFn(()=> addToFave(_id as string), pathName )} cursor={'pointer'} className="empty"  fontSize={'30px'} color='#3170A6' />
                                </Tooltip>
                            :
                                <Tooltip content='remove from favorites'>
                                   <IoIosHeartDislike onClick={()=>deleteFromFave(favoriteId as string)} cursor={'pointer'} className="dislike" fontSize={'30px'} color='#3170A6'/>
                               </Tooltip>
               

                        }


                         
                        <Btn onClick={Navigate}
                            display={'flex'}
                            justifyContent={'center'}
                            alignItems={'center'}
                            maxW={'208px'}
                            h="48px"
                            bg={'#3170A6'}
                            borderRadius={'8px'}
                            textColor={'white'}
                            className="robotoF" fontSize={{base:'10px', xl:'14px'}} fontWeight={500}
                        >
                            View Details
                        </Btn>
                    </Flex>
                </Flex>
                        
            </Box>
        </>
    )
}