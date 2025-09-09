import React, { useEffect, useState } from "react"
import Wrapper from "../../components/Wrapper"
import { PropertiesCard } from "@/screens/properties/propertiesCard";
import { Box, Flex, Grid , Skeleton, Stack, Text } from "@chakra-ui/react";
import useProperty, { Favourite } from "@/hooks/useProperty";
import { R } from "@/utils/types";
import { useAppContext } from "@/context";
import { RiSearch2Line } from "react-icons/ri";
import Btn from "@/components/Btn";
import { useRouter } from "next/router";
import useToast from "@/hooks/useToast";



const FavouriteScreen = ()=>{
    const router = useRouter()
    // const [favourites,setFavourites] = useState<Favourite[]>([]);
     const [loading, setLoading] = useState(false);

    const { getFavorites } = useProperty()

    const { globalContext, setGlobalContext} = useAppContext()
    const {toast} = useToast();
    const { favourites } = globalContext;

    useEffect(()=>{
        (async()=>{
            setLoading(true)
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
                toast({
                    status: "error",
                    title: "Error",
                    description: "Failed to fetch favorite properties",
                  });
            } finally {
                setLoading(false)
            }
        })()
    },[])

    return(
      <Box>
            {
                !loading && favourites?.length === 0  ?  
                <Flex flexDir={'column'} alignItems={'start'} rowGap={'10px'} gap={'16px'} justifyContent={'space-between'} className="urbanist">
                    <Text fontSize={'16px'}>
                        No favourites, explore new properties...
                    </Text>
                    <Btn
                        onClick={()=> router.push('/properties')}
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        w={{base:'60px',lg:'148px'}}
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
                <Grid 
                    mt={4}
                    w={"fit-content"}
                    templateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(2, 1fr)",
                    xl: "repeat(3, 1fr)",
                    '2xl': "repeat(4, 1fr)",
                    }}
                    gap={{ base: "24px", lg: "28px" }}
                    // paddingBottom={{ base: "20rem", lg: "3rem" }}
                    paddingY={'2rem'}
                >
                    {
                        favourites.map((fave,index)=> {
                          return  <PropertiesCard 
                                     key={index} {...fave}
                                   />                
                        })
                    }
                </Grid>
            }
            {loading && (
            <Stack>
              <Skeleton height="40px" />
              <Skeleton height="40px" />
              <Skeleton height="40px" />
            </Stack>
          )}
        </Box>  
    )
}


export default FavouriteScreen;