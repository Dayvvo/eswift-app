
import { HeroPropsVideo } from "@/components/heroPropsVideo";
import NavBar from "@/components/navBar";
import { Box, Grid } from "@chakra-ui/react";
import { useState } from "react";
import { Footer } from "@/components/footer";
import { LoadMore } from "@/components/LoadMore";
import { Background } from "../home/Background";
import { TextHeader } from "../home/textHeader";
import { PropertiesCard } from "../properties/propertiesCard";
import { PropertyCardProps } from "../Property/propertyCard";


const GalleryScreen =( )=> {

    const [inputValue, setInputValue] = useState<string>('')
    const [page, setPage] = useState<number>(0);
    const [projects, setProjects] = useState<PropertyCardProps[]>([]);

    // const projects = [

    //     {
    //         id:'1',
    //         title:'Oluyole estate',
    //         description:'Korem ipsum dolor sit celex dor divorless',
    //         images:['/properties-dummy.png'],
    //         price:'120000'
    //     },
    //     {
    //         id:'2',
    //         title:'Oluyole estate',
    //         description:'Korem ipsum dolor sit celex dor divorless',
    //         images:['/properties-dummy.png'],
    //         price:'120000'
    //     },
        
        
    // ]

    function scrollToSection() {
        const section = document.querySelector('#main') as HTMLElement;
        section.scrollIntoView({ behavior: 'smooth' });
    }

    return (

        <>
            <Box>
                <NavBar/>
                <HeroPropsVideo  
                    bg={"#00000070"} header={"Projects"} 
                    details={"Here are some of our notable projects"} 
                    buttonPos={null} w={"100%"} h={"100vh"} video={"/ProjectVid.mp4"}
                    click={scrollToSection}
                />
                <Background/>
                <Box id="main"
                    py={'120px'}
                    px={{base:'1rem',lg:'4rem'}}
                    display={'flex'} flexDir={'column'} 
                    alignItems={'center'} gap={'20px'}
                >
                    <TextHeader Header={"Discover a World of Possibilities"} sub={"Our portfolio of properties is as diverse as your dreams. Explore the following categories to find the perfect property that resonates with your vision of home"}/>
                    

                    <Grid templateColumns={{base:'repeat(1, 1fr)', md:'repeat(3, 1fr)', xl:'repeat(3, 1fr)'}} 
                        gap={{base:'24px',lg:'28px'}} placeContent={'center'}
                    >
                        {
                            projects.map((item)=>{
                                return(
                                    <PropertiesCard key={item?._id}
                                     images={item?.images} 
                                     title={item?.title} 
                                     // price={item?.price} 
                                     description={item?.description}
                                     _id={item?._id}
                                    />
                                )
                            })
                        }
                    </Grid> 
                    <LoadMore click={()=> page + 1}/> 
                </Box>
                <Footer/>
            </Box>
            
        </>
    )
}

export default GalleryScreen;