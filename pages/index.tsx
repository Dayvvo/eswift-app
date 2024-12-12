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
  const [onboard, setOnboard] = useState<onBoard>({
    state: "",
    propertyInterest: [],
    locationInterest: [],
  });

 
  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
      setInputValue("");
    }
  };

  const handleRemoveTag = (index: number) => {
    setOnboard((prevOnboard) => ({
      ...prevOnboard,
      locationInterest:
        prevOnboard.locationInterest?.filter((_location, i) => i !== index) ??
        [],
    }));
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

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size={"lg"}>
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
                errorMessage="Select property"
                value={onboard?.propertyInterest}
                onChange={handlePropertyInterest}
                // onBlur={() => onBlurHandler("propertyInterest")}
              />
            </Box>
            <Box>
              <SelectInput
                items={nigerianStates}
                label="State"
                placeholder="Select state"
                name="state"
                errorMessage="Select state"
                // inputIsinvalid={inputIsinvalid("state")}
                value={onboard?.state}
                onChange={(e) =>
                  setOnboard((prevOnboard) => ({
                    ...prevOnboard,
                    state: e.target.value,
                  }))
                }

                // onBlur={() => onBlurHandler("state")}
              />
            </Box>
            <Box mt={5}>
              <Flex gap="8px" alignItems={"end"}>
                <TextInput
                  label="Where are you interested in buying property"
                  name="locationInterest"
                  placeholder="Enter location"
                  errorMessage="enter your location"
                  value={inputValue}
                  onChange={handleTagInput}
                  // onBlur={() => onBlurHandler("locationInterest")}
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

  const { user,isWindow } = useAuth();

  useEffect(() => {
    if (user && !user?.isOnboarded) {
      console.log('user',user)
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
      }, 100);

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
        </>
      )}
    </>
  );
}
