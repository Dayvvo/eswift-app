import useAuth, { IUser } from "@/hooks/useAuth";
import HomePage from "@/screens/home/home";
import { Resdesign } from "@/screens/home/redesign";
import { useRouter } from "next/router";
import { useEffect, useState, FormEvent } from "react";
import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import {  SelectInput, TextInput } from "@/components/Inputs";
import { nigerianStates } from "@/utils/modules";
import Btn from "@/components/Btn";
import { HappyIcon } from "@/components/svg";
import Divider from "@/components/Divider";
import { useApiUrl } from "@/hooks/useApi";
import Preloader from "@/components/Preloader";
import { IoCloseOutline } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import useToast from "@/hooks/useToast";

// Onboarding Modal Component
type InformationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};


type onBoard = {
  state?: string;
  propertyInterest?: string[];
  locationInterest?: string[];
};



export const OnboardingModal = ({ isOpen, onClose }: InformationModalProps) => {
  const client = useApiUrl();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useAuth();
  const [inputValue, setInputValue] = useState<string>("");
  const [touched, setTouched] = useState({
    state: false,
    propertyInterest: false,
    locationInterest: false,
  })
  const [errors, setErrors] = useState({
    state: "",
    propertyInterest: '',
    locationInterest: '',
  })
  const [onboard, setOnboard] = useState<onBoard>({
    state: user?.state || "",
    propertyInterest: user?.propertyInterest || [],
    locationInterest:  user?.locationInterest || [],
  });

  const validateOnboard = (key: keyof onBoard) => {
    let isErr = false;
    if (!onboard[key] || (Array.isArray(onboard[key]) && (onboard[key].length === 0 || onboard[key].includes("")))) {
   
      setErrors((prev) => ({ ...prev, [key]: `${key} is required` }));
      isErr = true;
    } else {
      setErrors((prev) => ({ ...prev, [key]: "" }));
      isErr = false;
    }
    return isErr;
  };

  const handleBlur = (field: keyof onBoard) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateOnboard(field);
  };

  
  const handleAddTag = () => {
    const newLocation = inputValue.trim();
    if (
      newLocation &&
      !(onboard?.locationInterest ?? []).includes(newLocation)
    ) {
      setOnboard((prevOnboard) => ({
        ...prevOnboard,
        locationInterest: [
          ...(prevOnboard.locationInterest ?? []),
          newLocation,
        ],
      }));
      handleBlur("locationInterest")
      setInputValue("");
    } else {
      handleBlur("locationInterest")
    }
  };

  const handleRemoveTag = (index: number) => {
    setOnboard((prevOnboard) => ({
      ...prevOnboard,
      locationInterest:
        prevOnboard.locationInterest?.filter((_location, i) => i !== index) ??
        [],
    }));
    if(onboard.locationInterest && (onboard.locationInterest?.length === 0 || onboard.locationInterest.includes(''))) {
      handleBlur("locationInterest")
    }
  };

  // const handleKeyPress =(e:KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === 'Enter'){
  //     handleAddTag()
  //   }
  // }

  const handleTagInput = (e: any) => {
    setInputValue(e.target.value);
  };

  const handlePropertyInterest = (e: any) => {
    setOnboard((prevOnboard) => ({
      ...prevOnboard,
      propertyInterest: Array.isArray(e.target.value)
        ? e.target.value
        : [e.target.value],
    }));
  };

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const hasError = validateOnboard('locationInterest') || validateOnboard('state') || validateOnboard('propertyInterest');
    
    if(!hasError) {
      setLoading(true);
      const {firstName, lastName, email} = user  as IUser;
      try {
        const {data,status} = await client.put(`/user/profile?onboarding=true`, {
          firstName,
          lastName,
          email,
          ...onboard,
        });
        if (status === 201) {
          const storedData = localStorage.getItem("userData");
          if (storedData) {
            const existingTokenStore = JSON.parse(storedData);
            let newUser = {
              ...user,
              ...onboard,
              isOnboarded: true
            } as IUser        
            localStorage.setItem("userData", JSON.stringify({
              ...existingTokenStore,
              user:newUser
            }));
            setUser(newUser)
          }
          onClose();
          setOnboard({
            state: "",
            propertyInterest: [],
            locationInterest: [],
          });
          toast({
            status: "success",
            description: "Preference updated successfully",
            title: "Onboarding Completed",
            position: "top",
            duration: 1000,
          });
          setLoading(false);
        }
      } catch (error) {
        toast({
          status: "error",
          description: "Onboarding failed",
          title: "Failed",
          position: "top",
          duration: 1000,
        });
        setLoading(false);
      }
    } else {
      toast({
        status: "error",
        description: "Please fill all required fields",
        title: "Failed",
        position: "top",
        duration: 1000,
      });
    }

  };

  useEffect(() => {
    if (user) {
      setOnboard({
        state: user.state || "",
        propertyInterest: user.propertyInterest || [],
        locationInterest: user.locationInterest || [],
      });
    }
  }, [user]);
  return (
    <Modal closeOnOverlayClick={false} isCentered isOpen={isOpen} onClose={onClose} size={{base:'sm',md:"md", lg: 'lg'}}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          className={"urbanist"}
        >
          <HappyIcon />
          <Box>
            <Text fontWeight={400} fontSize={"24px"} textAlign={"center"}>
              Welcome to E-Swift 🏠
            </Text>
            <Text
              fontWeight={400}
              fontSize={"12px"}
              color={"#525866"}
              textAlign={"center"}
            >
              Let us help you find your dream property effortlessly using our
              tailored search options. We’re excited to have you join our
              community!
            </Text>
          </Box>
        </ModalHeader>
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <Divider w="90%" h={"1px"} color="#E1E4EA" />
        </Box>

        <form onSubmit={submitHandler} className={"urbanist"}>
          <ModalBody pb={4}>
            <Box mt={1}>
              <Text fontWeight={700} fontSize={"14px"}>
                Preferred Property Type
              </Text>
            </Box>
            <Box my={5}>
              <SelectInput
                items={["Land", "House", "Both"]}
                label="What property are you interested in buying"
                placeholder="Select property"
                name="propertyInterest"
                errorMessage={'Select a valid property you are interested in'}
                value={onboard?.propertyInterest}
                onChange={handlePropertyInterest}
                onBlur={() => handleBlur("propertyInterest")}
                inputIsinvalid={touched.propertyInterest && !!errors.propertyInterest}
              />
            </Box>
            <Box>
              <SelectInput
                items={nigerianStates}
                label="State"
                placeholder="Select a valid state"
                name="state"
                errorMessage="Select state"
                inputIsinvalid={errors.state.length > 0}
                value={onboard?.state}
                onChange={(e) => {
                  setOnboard((prevOnboard) => ({
                    ...prevOnboard,
                    state: e.target.value,
                  }))
                }}

                onBlur={() => handleBlur("state")}
              />
            </Box>
            <Box mt={5}>
              <Flex gap="8px" alignItems={"end"}>
                <TextInput
                  label="Where are you interested in buying property"
                  name="locationInterest"
                  placeholder="Enter location"
                  // errorMessage={"Enter a valid location of intrest"}
                  // inputIsinvalid={touched.locationInterest && !!errors.locationInterest}
                  value={inputValue}
                  onChange={handleTagInput}
                  onBlur={() => handleBlur("locationInterest")}
                />
                <Btn
                  w={"40px"}
                  h={"40px"}
                  fontSize={"36px"}
                  px={"4px"}
                  borderRadius={"10"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  onClick={handleAddTag}
                >
                  <BsPlus />
                </Btn>
              </Flex>
           {touched.locationInterest && !!errors.locationInterest &&  <Text color={"var(--errorBase)"} fontSize={"12px"}>
                {'Enter a valid location you are interested in'}
              </Text>}
              <Flex flexWrap={"wrap"} gap={"8px"} mt={"8px"}>
                {onboard?.locationInterest?.map((location, index) => (
                  <Flex
                    gap="8px"
                    key={index}
                    alignItems={"center"}
                    fontSize={"12px"}
                    bg={"var(--soft200)"}
                    px={"6px"}
                    py={"2px"}
                    borderRadius={"10px"}
                  >
                    {location}
                    <Flex
                      onClick={() => handleRemoveTag(index)}
                      fontSize={"14px"}
                    >
                      <IoCloseOutline />
                    </Flex>
                  </Flex>
                ))}
              </Flex>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Btn
              bg={"transparent"}
              w={"100%"}
              h={"40px"}
              border={"1px solid var(--primaryBase)"}
              borderRadius={"10px"}
              textColor={"var(--primaryBase)"}
              my={"24px"}
              type="submit"
              _hover={{
                bg: "#1A1D66",
                textColor: "#FFF",
              }}
              isLoading={loading}
              disabled={loading}
            >
              Submit
            </Btn>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default function Home() {
  const [building, setBuilding] = useState(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [showPreloaderOnce, setShowPreloaderOnce] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useRouter();

  const { user, isWindow, statusCode, token } = useAuth();
  
  useEffect(() => {
    if (user && !user?.isOnboarded) {
      setShowModal(true);
    }
  }, [user]);

  useEffect(() => {
    if (isWindow) {
      const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
          return decodeURIComponent(parts.pop()?.split(";").shift() || "");
        }
      };

      const myCookie = getCookie("auth-cookie");
      if (myCookie) {
        const userData = localStorage.getItem('userData');
        !userData && localStorage.setItem("userData", myCookie);
        const authRoute = sessionStorage.getItem("authRoute");
        if (authRoute) {
          navigate.push(authRoute);
        }
      }
    }

    return () => localStorage.removeItem("authRoute");
  }, [isWindow]);

  useEffect(() => {
    const preloaderShown = sessionStorage.getItem("preloaderShown");

    if (preloaderShown) {
      setShowLoadingScreen(false);
    } else {
      sessionStorage.setItem("preloaderShown", "true");

      // Hide the preloader after a timeout (e.g., 3 seconds)
      const timer = setTimeout(() => {
        setShowLoadingScreen(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      {showLoadingScreen && !showPreloaderOnce ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#f0f0f0",
          }}
        >
          <Preloader />
        </div>
      ) : (
        <>
          <OnboardingModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
          />
          {building ? <Resdesign /> : <HomePage />}
          {/* {building ? <Resdesign /> : <Box>HOme</Box>} */}
        </>
      )}
    </>
  );
}
