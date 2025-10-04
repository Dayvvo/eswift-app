import { HeroPropsVideo } from '@/components/heroPropsVideo';
import NavBar from '@/components/navBar';
import { Box, Card, CardBody, Grid, Skeleton, Stack, Text, VStack } from '@chakra-ui/react';
import { Background } from '../home/Background';
import { TextHeader } from '../home/textHeader';
import { Footer } from '@/components/footer';
import { useEffect, useState } from 'react';
import { PropertyCardProps } from '../Property/propertyCard';
import { PropertiesCard } from '../properties/propertiesCard';
import useProperty from '@/hooks/useProperty';
import Pagination from '@/components/Pagination';

const ProjectScreen = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [fetchData, setFetchData] = useState<PropertyCardProps[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pagination, setPagination] = useState<any>(null);

  const { getVerifiedProjects } = useProperty();

  useEffect(() => {
    const getPropertyFunction = async () => {
      setLoading(true);
      try {
        const { data } = await getVerifiedProjects(currentPage);
        setFetchData(data?.data);
        setPagination(data?.pagination);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getPropertyFunction();
  }, [currentPage]);

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
            fontSize={{ base: '30px', md: '42px', lg: '72px', xl: '80px' }}
            header={'Investment Opportunities'}
            details={'Secure your position in our carefully curated collection of high-potential developments.'}
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
          <TextHeader
            Header={"Building Tomorrow's Landmarks Today"}
            sub={
              'Join our portfolio of exclusive investment opportunities where premium locations meet exceptional returns. Partner with us to transform visionary projects into lasting wealth.'
            }
          />
          {isLoading && (
            <Stack spacing={4} p={4} w={'100%'}>
              <Skeleton height="40px" />
              <Skeleton height="40px" />
              <Skeleton height="40px" />
            </Stack>
          )}

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
              {fetchData.map((data) => {
                return <PropertiesCard key={data?._id} {...data} _id={data?._id} view="client" />;
              })}
            </Grid>
          )}

          {!isLoading && fetchData?.length === 0 && (
            <Card mt={'60px'}>
              <CardBody>
                <Text>No project found please try again</Text>
              </CardBody>
            </Card>
          )}

          {pagination?.totalCount > fetchData?.length && (
            <VStack align={'center'} gap={'15px'} mt={'20px'}>
              <Pagination
                totalPost={pagination?.totalCount}
                totalPages={pagination?.pages}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            </VStack>
          )}
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default ProjectScreen;
