
import NavBar from "@/components/navBar";
import { Box } from "@chakra-ui/react"
import Hero from "./hero";
import { AboutSection } from "./homeAboutSection";
import { SectionTwo } from "./sectionTwo";
import { HeroProps } from "@/screens/home/heroProps";
import { SectionThree } from "./sectionThree";
import { Footer } from "@/components/footer";
import { Background } from "./Background";
import { Video } from "./Video";


const HomePage =()=> {

    function scrollToSection() {
        const section = document.getElementById('#main') as HTMLElement | null;
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        } else {
          console.error('Element #main not found');
        }      
    }

    return (
        <>
            <Box>
                <NavBar/>
                <Hero click={scrollToSection} />
                <Background/>
                <AboutSection/>
                <Video/>
                <SectionTwo/>
                <Box
                    py={'120px'}
                    px={{base:'1rem',lg:'4rem'}}
                    display={'flex'} flexDir={'column'} gap={'120px'}
                >
                    <HeroProps bgImage={"url('/Become-partner.jpg')"} bg={"#00000080"} 
                        Nav={"/contact"} header={"Become Our Partner"} 
                        details={"Join our thriving network of real estate professionals and earn competitive commissions."} 
                        buttonPos={'rotate'} w={'100%'} h={'100vh'}
                    />
                    <SectionThree/>
                </Box>
                <Footer/>
            </Box>
        </>
    )
}

export default HomePage;