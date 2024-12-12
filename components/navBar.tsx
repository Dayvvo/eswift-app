import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Flex,
} from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
import Btn from "./Btn";
import { Logo } from "./logo";
import { Background } from "@/screens/home/Background";
import useAuth from "@/hooks/useAuth";
import { CiMenuKebab } from "react-icons/ci";
import { BiLogOutCircle } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { VscSettings } from "react-icons/vsc";


const NavBar = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<any>();
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {

    const handleScroll =()=> {
      if( pathname === '/'){
        setIsScrolled(window.scrollY > 100);
      } else {
        setIsScrolled(window.scrollY >= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  },[]);

  const {token, logout} = useAuth()
  
  const NavLink = [
    {
      id:1,
      Navigator:'Properties',
      Link:'/properties'
    },
    // {
    //   id:2,
    //   Navigator:'Gallery',
    //   Link:'/gallery'
    // },
    {
      id:3,
      Navigator:'About Us',
      Link:'/about'
    },
    {
      id:4,
      Navigator:'Our Team',
      Link:'/team'
    },
    {
      id:5,
      Navigator:'Blog',
      Link:'/blogspot'
    },
    {
      id:6,
      Navigator:'Contact Us',
      Link:'/contact'
    }
  ] 
  
  return (
    <Box 
      position="relative" w="100vw" height="fit-content"
    >
      <Box
        as="nav"
        zIndex={100}
        pr={{ base: "1rem", lg:"2rem", xl:"4rem" }}
        height={{base:'86px',lg:'96px'}} py={'24px'}
        // bg={`${isScrolled ? "#FFFFFF90" : "" }`} 
        // backdropFilter={isScrolled ? 'blur(10px)':'blur(1px)'}
        backgroundColor={'white'}
        _hover={{
          bgOpacity: "0.1",
          backdropfilter:"blur(5px)",
        }}
        color="var(--TextCol)"
        w="100%" h={'72px'}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap={4}
        position="fixed"
        top={0}
        right={0}
        left={0}
      >
        <Logo
          width={150} 
          height={60}
        />
        <Box
          display={{ base: "none", xl: "flex" }}
          gap={{md:'16px', xl:'32px'}}
          alignItems="center"
          justifyContent={"space-between"}
          className="robotoF"
          fontWeight={500}
        >
          { 
            NavLink.map((Links) => (
              <Box key={Links?.id}>
                <Link href={`${Links?.Link}`}>
                  <Text
                    fontWeight="500"
                    color="var(--TextCol)"
                    _active={{ fontWeight: "800" }}
                    fontSize={`${pathname === `${Links?.Link}` ? "16px" : "14px"}`}
                    _hover={{fontSize:'16px'}}
                    transition='font-size'
                    transitionDuration='500'
                    transitionTimingFunction={'ease-in-out'}
                    textOverflow={'no-wrap'}
                    // border={"1px solid var(--TextCol)"}
                  >
                    {Links?.Navigator}
                  </Text>
                </Link>
              </Box>
            ))          
          }     

          <Box
            display={'flex'} gap={{lg:'14px',xl:'24px'}}
            w={'fit-content'} h={'fit-content'}
            ml={{xl:'24em'}} className="urbanist" 
          >
            {
              token?
              <>
                <Menu>
                  <MenuButton>
                    <Btn px="8px" py="2px" color="#3170A6" bg={'transparent'} fontSize={'28px'}>
                      <CiMenuKebab />
                    </Btn>
                  </MenuButton>
                  <MenuList border={'1px solid #E1E4EA'} borderRadius={'8px'} p={'16px'}
                    width={'220px'} shadow={'md'}
                  >
                    <Flex w={'fit-content'} flexDir={'column'} alignItems={'start'} gap={'12px'}>
                      <Btn cursor={'pointer'}  fontSize={'18px'} color="#000" _hover={{color:'#3170A6'}}backgroundColor={'transparent'} 
                        display={'flex'} gap={'4px'} alignItems={'center'}
                      >
                        <RxDashboard />
                        <Link href={'/dashboard'}>
                          Dashboard
                        </Link>
                      </Btn>
                      <Btn cursor={'pointer'} fontSize={'18px'} color='#000' _hover={{color:'#3170A6'}} backgroundColor={'transparent'} 
                        display={'flex'} gap={'4px'} alignItems={'center'} fontWeight={500}
                      >
                        <VscSettings />
                        <Link href={'/settings'}>
                          Settings
                        </Link>
                      </Btn>
                      <Btn cursor={'pointer'} onClick={logout} fontSize={'18px'} color='#000' _hover={{color:'#3170A6'}} backgroundColor={'transparent'} 
                        display={'flex'} gap={'4px'} alignItems={'center'}
                      >
                        <BiLogOutCircle />
                        Logout
                      </Btn>
                    </Flex>
                  </MenuList>
                </Menu>    
              </>
              :
              <>
                <Link href={'/auth'}>
                  <Btn
                    display={'flex'} alignItems={'center'} justifyContent={'center'}
                    bg={'#3170A6'} borderRadius={'99px'} w={'160px'} h={'48px'}
                    textColor={'#FFF'} fontWeight={500} className="roboto"
                    fontSize={'16px'}
                  >
                    Sign In
                  </Btn>
                </Link>
                <Link href={'/auth'}>
                  <Btn
                    display={'flex'} alignItems={'center'} justifyContent={'center'}
                    bg={'#3170A6'} borderRadius={'99px'} w={'160px'} h={'48px'}
                    textColor={'#FFF'} fontWeight={500} className="roboto"
                    fontSize={'16px'}
                  >
                    Join Us
                  </Btn>
                </Link>
              </>              
            }

          </Box>
        </Box>

        <Box
          display={{ base: "block", xl: "none" }}
          cursor={"pointer"}
          ref={btnRef}
          onClick={onOpen}
          textColor={'#3170A6'}
        >
          <GiHamburgerMenu size={"25px"} />
        </Box>

        <Drawer
          isOpen={isOpen}
          placement="top"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent
            bg={"#FFF"}
            height={"100vh"}
            width={"100vw"}
            py={"1em"}
          >
            <Background/>
            <DrawerCloseButton
              color={"#3170A6"}
              fontSize={"20px"}
              mt={"20px"}
              outline={"none"}
            />

            <DrawerBody>
              <Box
                display={"flex"}
                flexDir={"column"}
                w={'100%'} alignItems={'center'}
                gap={"20px"}
                py={"16px"}
                className="robotoF"
                color="#3170A6"
              > 
                <Box onClick={onClose}>
                  <Logo 
                    width={150} 
                    height={60}
                  />
                </Box>

                { token ? 
                      <Btn onClick={onClose} cursor={'pointer'}  fontSize={'14px'} color="#000" _hover={{color:'#3170A6'}}backgroundColor={'transparent'} 
                        display={'flex'} gap={'4px'} alignItems={'center'} fontWeight={500} className="robotoF"
                      >
                        <RxDashboard />
                        <Link href={'/dashboard'}>
                          Dashboard
                        </Link>
                      </Btn>
                      :
                      <></>
                }

                {NavLink.map((Links)=>(
                    <Box key={Links?.id}
                      onClick={onClose}
                      fontSize={"14px"}
                      fontWeight={500}
                      borderBottom={"1px solid var(--Greenlight)"}
                      _hover={{fontSize:'16px'}}
                      px={"16px"}
                    >
                      <Link href={`${Links?.Link}`}>{Links?.Navigator}</Link>
                    </Box>
                  ))
                }
              </Box>

              {token ? 
                <Flex w="100%" flexDir={'column'} alignItems={'center'} mt={8} className="robotoF">
                  <Flex onClick={onClose} w={'fit-content'} >
                    <Btn cursor={'pointer'} fontSize={'14px'} color='#000' _hover={{color:'#3170A6'}} backgroundColor={'transparent'} 
                      display={'flex'} gap={'4px'} alignItems={'center'} fontWeight={500}
                    >
                      <VscSettings />
                      <Link href={'/settings'}>
                        Settings
                      </Link>
                    </Btn>
                  </Flex>
                  <Flex onClick={onClose} w={'fit-content'} >
                    <Btn cursor={'pointer'} onClick={logout} fontSize={'14px'} color='#000' _hover={{color:'#3170A6'}} backgroundColor={'transparent'} 
                      display={'flex'} gap={'4px'} alignItems={'center'} fontWeight={500}
                    >
                      <BiLogOutCircle />
                      Logout
                    </Btn>
                  </Flex>
                </Flex>
                :
                <Box mt={'20px'}
                  display={'flex'} flexDir={'column'} gap={2}
                  w={'fit-content'} h={'fit-content'} width={'100%'} alignItems={'center'}
                >
                  <Link href={'/auth'}>
                    <Btn
                      display={'flex'} alignItems={'center'} justifyContent={'center'}
                      bg={'#3170A6'} borderRadius={'99px'} w={'200px'} h={'42px'}
                      textColor={'#FFF'} fontWeight={500} className="roboto"
                      fontSize={'14px'}
                    >
                      Sign In
                    </Btn>
                  </Link>
                  <Link href={'/auth'}>
                    <Btn
                      display={'flex'} alignItems={'center'} justifyContent={'center'}
                      bg={'#3170A6'} borderRadius={'99px'} w={'200px'} h={'42px'}
                      textColor={'#FFF'} fontWeight={500} className="roboto"
                      fontSize={'14px'}
                    >
                      Join Us
                    </Btn>
                  </Link>
                </Box>
              }
              
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </Box>
  );
};

export default NavBar;
