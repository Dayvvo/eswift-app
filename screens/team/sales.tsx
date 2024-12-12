import {  Box, Grid, Text } from "@chakra-ui/react"
import Image from "next/image"


export const Sales =()=> {
    
    const Sales:any[] = [
        {
            id:1,
            person:'Oronnaye Ayomide',
            title:'Web Designer',
            picture:'/Personel.png'
        },
        {
            id:2,
            person:'Opeyemi Adeyemi',
            title:'CEO',
            picture:'/Personel.png'
        },
        {
            id:3,
            person:'Timmy Bagwells',
            title:'Web Developer',
            picture:'/Personel.png'
        },{
            id:4,
            person:'Oronnaye Ayomide',
            title:'Web Designer',
            picture:'/Personel.png'
        },
        {
            id:5,
            person:'Opeyemi Adeyemi',
            title:'CEO',
            picture:'/Personel.png'
        },
        {
            id:6,
            person:'Timmy Bagwells',
            title:'Web Developer',
            picture:'/Personel.png'
        }
        
    ]


    return (
    
        <Box
            w={'100%'} h={''}
            py={'54px'} className="antic" display={'flex'} alignItems={'center'}
            flexDir={'column'} my={'120'}
        >
            <Grid templateColumns={{base:'repeat(1, 1fr)', md:'repeat(3, 1fr)'}} 
                gap={{base:'24px',lg:'40px'}} mt={'80px'} 
            >
                {
                    Sales.map((item)=>{
                        return(
                            <Box key={item.id}
                                display={'flex'} 
                                flexDir={'column'} 
                                gap={'24px'} 
                                maxW={'308px'} 
                                h={'fit-content'} 
                                p={'16px'}
                                borderRadius={'12px'} border={'1px solid #262626'}
                            >
                                <Box 
                                    w={'100%'} 
                                    h={'290px'}
                                    borderRadius={'15px'} overflow={'hidden'}
                                >
                                    <Image src={`${item?.picture}`} alt="" width={275} height={290} />
                                </Box>
                                <Box 
                                    display={'flex'} flexDir={'column'}
                                    textAlign={'center'} justifyContent={'start'}
                                >
                                    <Text
                                        fontWeight={700} fontSize={'24px'}
                                        textColor={'#000'}
                                        className="robotoF"
                                    >
                                        {item?.person}
                                    </Text>
                                    <Text
                                        textAlign={'center'}
                                        fontWeight={400} fontSize={'20px'}
                                        textColor={'#000'}
                                        className="robotoF"
                                    >
                                        {item?.title}
                                    </Text>
                                    <Text
                                        textAlign={'center'}
                                        fontWeight={400} fontSize={'18px'}
                                        textColor={'#000'}
                                        className="antic"
                                    >
                                        {item?.department}
                                    </Text>
                                </Box>
                            </Box>
                        )
                    })
                }
            </Grid>
        </Box>    

    )
}