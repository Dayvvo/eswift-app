import React, { useEffect } from "react"
import Wrapper from "../../components/Wrapper"
import { PropertiesCard } from "@/screens/properties/propertiesCard";
import { Box, Flex, Grid , Text } from "@chakra-ui/react";
import useProperty, { Favourite } from "@/hooks/useProperty";
import { R } from "@/utils/types";
import { useAppContext } from "@/context";
import { RiSearch2Line } from "react-icons/ri";
import Btn from "@/components/Btn";
import { useRouter } from "next/router";



const FavouriteScreen = ()=>{
    const router = useRouter()
    // const [favourites,setFavourites] = useState<Favourite[]>([]);

    const { getFavorites } = useProperty()

    const { globalContext, setGlobalContext} = useAppContext()

    const { favourites } = globalContext;

    useEffect(()=>{
        (async()=>{
            try{
                const { data:res } = await getFavorites();
                
                const favorites = {
                    ...res,
                    data: res?.data?.map((res:R)=>({
                        ...res?.property,
                        _id:res?.property?._id,
                        favoriteId:res?._id,
                        isFavorite:true,
                    } as Favourite))
                }

                setGlobalContext &&  setGlobalContext(prev=>({
                    ...prev,
                    favourites:favorites?.data
                }))
            }
            catch(err){
                console.log('err',err);
            }
        })()
    },[])

    return(
      <Box>
            {
                favourites?.length === 0  ?  
                <Flex flexDir={'column'} alignItems={'start'} rowGap={'10px'} gap={'16px'} justifyContent={'space-between'} className="urbanist">
                    <Text fontSize={'16px'}>
                        No favourites, explore new properties...
                    </Text>
                    <Btn
                        onClick={()=> router.push('/properties')}
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        W={{base:'60px',lg:'148px'}}
                        h={{base:'32px'}}
                        bg={'#3170A6'}
                        borderRadius={'8px'}
                        textColor={'white'}
                        gap={'8px'}
                        _hover={{opacity:0.5}}
                        fontSize={{base:'8px', lg:'14px'}}
                    >
                        <RiSearch2Line/> Find Property Now
                    </Btn>
                </Flex>
                : 
                <Grid templateColumns={{lg:'repeat(3,1fr)'}} rowGap={'2em'} columnGap={{md:'1.2em',lg:'1.5em'}}>
                    {
                        favourites.map((fave,index)=>
                            <PropertiesCard key={index} {...fave} />                
                        )
                    }
                </Grid>
            }
        </Box>  
    )
}


export default FavouriteScreen;