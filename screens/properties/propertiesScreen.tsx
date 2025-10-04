import { HeroPropsVideo } from '@/components/heroPropsVideo';
import NavBar from '@/components/navBar';
import {
  Box,
  InputGroup,
  Input,
  InputRightElement,
  Grid,
  Card,
  CardBody,
  Text,
  VStack,
  Stack,
  Skeleton,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { RiSearch2Line } from 'react-icons/ri';
import { PropertiesCard } from './propertiesCard';
import { Footer } from '@/components/footer';
import axios from 'axios';
import Btn from '@/components/Btn';
import { Background } from '../home/Background';
import { TextHeader } from '../home/textHeader';
import { PropertyCardProps } from '../Property/propertyCard';
import { useDebounce } from '@/hooks/useDebounce';
import useProperty from '@/hooks/useProperty'; // Import hook for favorites
import Pagination from '@/components/Pagination';

const PropertiesScreen = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [fetchData, setFetchData] = useState<PropertyCardProps[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1); // Store favorite IDs
  const [pagination, setPagination] = useState<any>(null);

  const debounce = useDebounce();
  const { getFavorites, getVerifiedProperty } = useProperty();

  // Fetch properties based on search and page

  useEffect(() => {
    const getPropertyFunction = async () => {
      setLoading(true);
      try {
        const { data } = await getVerifiedProperty(inputValue, page);
        setFetchData(data?.data);
        setPagination(data?.pagination);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    debounce(() => getPropertyFunction());
  }, [page, inputValue]);

  // Fetch favorites list
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const { data } = await getFavorites();
        // setFavorites(data.map((fav: PropertyCardProps) => fav._id)); // Store favorite IDs
      } catch (error) {
        console.error('Failed to load favorites', error);
      }
    };

    fetchFavorites();
  }, []);

  // Handle add/remove from favorites

  function scrollToSection() {
    const section = document.querySelector('#main') as HTMLElement;
    section.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <Box>
        <NavBar />
        <Box pt={{ base: '10px' }}>
          <HeroPropsVideo
            bg={'#00000070'}
            header={'Find Dream Properties'}
            details={'Explore our extensive listings of properties in Lagos and beyond'}
            buttonPos={null}
            w={'100%'}
            h={'100vh'}
            video={'/PropertiesVideo.mp4'}
            click={scrollToSection}
          />
        </Box>

        <Background />
        <Box
          id="main"
          py={'120px'}
          px={{ base: '1rem', lg: '5rem' }}
          display={'flex'}
          flexDir={'column'}
          alignItems={'center'}
          gap={'20px'}
        >
          <InputGroup
            display={'flex'}
            alignItems={'center'}
            border={'1px'}
            borderRadius={'10px'}
            bg={'#E2EDF3'}
            borderColor={'#26262630'}
            _focusWithin={{ border: '1.5px solid #3170A6' }}
            cursor={'search'}
            fontSize={{ base: 12, lg: 14 }}
            textColor={'var--(sub600)'}
            maxW="1020px"
            h={{ base: '52px', lg: '80px' }}
            className="urbanist"
            overflow={'hidden'}
          >
            <Input
              w={'80%'}
              h={'100%'}
              _placeholder={{
                textColor: '#666666',
                fontSize: { base: '10px', md: '14px', lg: '20px' },
              }}
              border={'none'}
              _focusVisible={'none'}
              type="search"
              placeholder="Search for a property by title, description or category"
              value={inputValue}
              onChange={(e: any) => setInputValue(e.target.value)}
            />
            <InputRightElement
              pointerEvents="none"
              w={'fit-content'}
              h={'max-content'}
              mt={{ base: 2.5, lg: 4 }}
              mx={{ base: 1, lg: 3 }}
              zIndex={30}
            >
              <Btn
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                w={{ base: '60px', lg: '148px' }}
                h={{ base: '32px', lg: '48px' }}
                bg={'#3170A6'}
                borderRadius={'8px'}
                textColor={'white'}
                gap={'8px'}
                _hover={{ opacity: 0.5 }}
                fontSize={{ base: '8px', lg: '14px' }}
              >
                <RiSearch2Line /> Find Property
              </Btn>
            </InputRightElement>
          </InputGroup>
          <TextHeader
            Header={'Discover a World of Possibilities'}
            sub={
              'Our portfolio of properties is as diverse as your dreams. Explore the following categories to find the perfect property that resonates with your vision of home'
            }
          />
          {!isLoading && fetchData?.length > 0 && (
            <Grid
              templateColumns={{
                base: 'repeat(1, 1fr)',
                md: 'repeat(2, 1fr)',
                xl: 'repeat(3, 1fr)',
              }}
              gap={'20px'}
              placeContent={'center'}
            >
              {fetchData.map((item) => (
                <PropertiesCard key={item?._id} {...item} _id={item?._id} view="client" />
              ))}
            </Grid>
          )}
          {isLoading && (
            <Stack w={'100%'}>
              <Skeleton height="40px" />
              <Skeleton height="40px" />
              <Skeleton height="40px" />
            </Stack>
          )}
          {!isLoading && fetchData?.length === 0 && (
            <Card>
              <CardBody>
                <Text>No property available or reload</Text>
              </CardBody>
            </Card>
          )}
          {pagination?.totalCount > fetchData?.length && (
            <VStack align={'center'} gap={'15px'} mt={'20px'}>
              <Pagination
                totalPost={pagination?.totalCount}
                totalPages={pagination?.pages}
                setCurrentPage={setPage}
                currentPage={page}
              />
            </VStack>
          )}
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default PropertiesScreen;
