import { Footer } from "@/components/footer";
import NavBar from "@/components/navBar";
import { PropertyDetails } from "@/screens/properties/PropertyDetails";
import { Center, Box } from "@chakra-ui/react";

const PropertiesDetailScreen = () => (
  <>
    <NavBar />
    <Center
      position={"relative"}
      top="96px"
      pt={"2em"}
      pb={"6em"}
      className="center"
      mb={"24px"}
    >
      <PropertyDetails clientView />
    </Center>

    <Box>
      <Footer />
    </Box>
  </>
);

export default PropertiesDetailScreen;
