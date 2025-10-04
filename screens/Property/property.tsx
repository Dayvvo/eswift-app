import {
  Flex,
  Box,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Grid,
  Stack,
  Skeleton,
  Card,
  CardBody,
  VStack,
} from '@chakra-ui/react';
import Btn from '@/components/Btn';
import { useEffect, useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import { SearchIcon } from '../../components/svg';
import useProperty from '@/hooks/useProperty';
import { PropertyCard, PropertyCardProps } from './propertyCard';
import { DocumentTypes } from '@/utils/types';
import { IoFilter } from 'react-icons/io5';
import { AddProperties } from './Add';
import { useDebounce } from '@/hooks/useDebounce';
import Pagination from '@/components/Pagination';

export type Documents = {
  [K in DocumentTypes]: File | null;
};

export const PropertyScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [getProperty, setGetProperty] = useState<PropertyCardProps[]>([]);
  const [propertyEl, setPropertyEl] = useState<PropertyCardProps[]>([]);
  const [currentPage, setCurrentPage] = useState<any>(1);
  // const [totalPages, setTotalPages] = useState<any>(1);
  const [inputValue, setInputValue] = useState<any>('');
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<any>(null);

  const { getAdminProperty } = useProperty();

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const debounce = useDebounce();

  const getPropertyFunction = async () => {
    setLoading(true);
    try {
      const { data } = await getAdminProperty(inputValue, currentPage);

      const propertiesToAdd = data?.data.filter((prop: PropertyCardProps) => {
        return getProperty.findIndex((index) => index._id === prop._id) === -1;
      });

      setGetProperty((prev) => [...prev, ...propertiesToAdd]);
      setPropertyEl(data?.data);

      setPagination(data?.pagination);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      debounce(() => getPropertyFunction());
    }
  };

  useEffect(() => {
    debounce(() => getPropertyFunction());
  }, [showModal, inputValue, currentPage]);

  return (
    <>
      <AddProperties showModal={showModal} setShowModal={setShowModal} />
      <Box className="robotoF" px={{ base: '16px', lg: '20px' }} width={'100%'}>
        <Flex
          mb={'24px'}
          // mt={"10px"}
          gap={'12px'}
          w={'100%'}
          h={{ base: 'fit-content', md: '36px' }}
          position="sticky"
          top="0"
          zIndex="10"
          bg="white"
          mt="2em"
        >
          <Flex w={{ base: '100%', lg: '60%', xl: '100%' }}>
            <InputGroup
              display={'flex'}
              alignItems={'center'}
              border={'1px'}
              borderRadius={'8px'}
              borderColor={'var(--soft200)'}
              cursor={'search'}
              fontSize={14}
              textColor={'var--(sub600)'}
              w="100%"
              h={{ base: '36px', md: '100%' }}
              _placeholder={{ textColor: 'var--(soft400)' }}
            >
              <InputLeftElement color={'var(--soft400)'} h="100%" display={'flex'} alignItems={'center'}>
                <Box onClick={getPropertyFunction}>
                  <SearchIcon />
                </Box>
              </InputLeftElement>
              <Input
                w={'100%'}
                h={'100%'}
                type="search"
                placeholder="Search..."
                value={inputValue}
                onChange={(e: any) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </InputGroup>
          </Flex>
          <Flex gap={'12px'} flexDir={{ base: 'column', sm: 'row' }} alignItems={'end'}>
            <Btn
              onClick={toggleModal}
              display={'flex'}
              gap={'4px'}
              alignItems={'center'}
              bg={'#fff'}
              h={{ base: '36px', md: '100%' }}
              w={'131px'}
              border={'1px solid var(--soft200)'}
              borderRadius={'8px'}
              textColor={'var--(sub600)'}
              fontWeight={500}
              fontSize={'14px'}
              px={'6px'}
              pt={'0'}
              pb={'0'}
              _hover={{
                bg: '#1A1D66',
                textColor: '#FFF',
              }}
            >
              <Text fontSize={'14px'}>Add Listing</Text>
              <BsPlus className="icon" />
            </Btn>
            {/* <Btn
              onClick={() => setCurrentPage(inputValue)}
              display={'flex'}
              gap={'4px'}
              alignItems={'center'}
              bg={'#fff'}
              h={{ base: '36px', md: '100%' }}
              w={'80px'}
              border={'1px solid var(--soft200)'}
              borderRadius={'8px'}
              textColor={'var--(sub600)'}
              fontWeight={500}
              fontSize={'14px'}
              px={'6px'}
              pt={'0'}
              pb={'0'}
              _hover={{
                bg: '#1A1D66',
                textColor: '#FFF',
              }}
            >
              <IoFilter className="icon" />
              <Text>Filter</Text>
            </Btn> */}
          </Flex>
        </Flex>

        {/* Scrollable Property Cards Container */}
        <Box>
          {loading && (
            <Stack>
              <Skeleton height="40px" />
              <Skeleton height="40px" />
              <Skeleton height="40px" />
            </Stack>
          )}

          {!loading && propertyEl?.length > 0 && (
            <Grid
              w={'fit-content'}
              templateColumns={{
                base: 'repeat(1, 1fr)',
                md: 'repeat(2, 1fr)',
                xl: 'repeat(3, 1fr)',
                '2xl': 'repeat(4, 1fr)',
              }}
              gap={{ base: '24px', lg: '28px' }}
              paddingY={'2rem'}
            >
              {propertyEl.map((property, index) => {
                return (
                  <PropertyCard
                    key={index}
                    _id={property?._id}
                    images={property?.images}
                    title={property?.title}
                    price={property?.price}
                    address={property?.address}
                    verificationState={property?.verification}
                    userImage={property?.ownerID?.avatar || '/'}
                    email={property?.ownerID?.email}
                    user={`${property?.ownerID?.firstName}`}
                    count={currentPage}
                  />
                );
              })}
            </Grid>
          )}
          {!loading && propertyEl?.length === 0 && (
            <Card>
              <CardBody>
                <Text>No property available or reload</Text>
              </CardBody>
            </Card>
          )}
        </Box>
      </Box>

      {pagination?.totalCount > propertyEl?.length && (
        <VStack align={'center'} gap={'15px'} mt={'20px'}>
          <Pagination
            totalPost={pagination?.totalCount}
            totalPages={pagination?.pages}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </VStack>
      )}
    </>
  );
};
