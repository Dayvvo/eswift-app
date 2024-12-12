import Btn from "@/components/Btn";
import useAuth, { IUsers } from "@/hooks/useAuth";
import { useInputSettings } from "@/hooks/useInput";
import useToast from "@/hooks/useToast";
import useUser from "@/hooks/useUser";
import { Box, Flex, Input, Text, Image, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import ResetPasswordModal from "./reset";
import { SelectInput } from "@/components/Inputs";
import { nigerianStates } from "@/utils/modules";

type ValidationType = {
  [key in keyof IUsers]: (input: string) => boolean;
};

const validation: ValidationType = {
  firstName: (input: string) => (input ? input.trim().length > 1 : false),
  lastName: (input: string) => (input ? input.trim().length > 1 : false),
  email: (input: string) => (input ? /\S+@\S+\.\S+/.test(input) : false),
  phoneNumber: (input: string) => (input ? /^0?\d{10}$/.test(input) : false),
  address: (input: string) => (input ? input.trim().length > 5 : false),
  state: (input: string) => (input ? input.trim().length > 1 : false),
  avatar: (_input: string) => true,
  role: (input: string) => input === "GUEST" || input !== "ADMIN",
};

export const SettingsScreen = () => {
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();

  const navigateToResetPassword = () => {
    router.push("/reset");
  };

  const {
    input: user,
    onChangeHandler,
    setInput: setUser,
    inputIsinvalid,
    inputIsvalid,
    onBlurHandler,
  } = useInputSettings(
    {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
      state: "",
      avatar: "",
      role: "CLIENT",
    },
    validation
  );

  const settings: any[] = [
    {
      id: 1,
      type: "First Name",
      description: "Your first name will be visible to your contacts.",
      info: `${user?.firstName}`,
      name: "firstName",
    },
    {
      id: 2,
      type: "Last Name",
      description: "Your last name will be visible to your contacts.",
      info: `${user?.lastName}`,
      name: "lastName",
    },
    {
      id: 3,
      type: "Email Address",
      description: "Business email address recommended.",
      info: user.email,
      name: "email",
    },
    {
      id: 4,
      type: "Phone Number",
      description: "Business phone number recommended.",
      info: user.phoneNumber,
      name: "phoneNumber",
    },
    {
      id: 5,
      type: "Legal Address",
      description: "Legal residential address for billing details",
      info: user.address,
      name: "address",
    },
  ];

  const { updateUser } = useUser();
  const { toast } = useToast();

  const { user: profile } = useAuth();

  const datas = {
    firstName: user.firstName,
    lastName: user.lastName,
    address: user.address,
    email: user.email,
    phoneNumber: user.phoneNumber,
    state: user.state,
  };

  const updateUserFn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const user = await updateUser(datas);
      if (user.status === 201) {
        const storedData = localStorage.getItem("userData");
        if (storedData) {
          const userData = JSON.parse(storedData);
          userData.user = user.data.data;
          localStorage.setItem("userData", JSON.stringify(userData));
        }
        toast({
          status: "success",
          description: "profile updated",
          title: "Success",
          position: "top",
          duration: 1000,
        });
        setLoading(false);
      }
    } catch (error) {
      toast({
        status: "error",
        description: "Failed to update profile",
        title: "Failed",
        position: "top",
        duration: 1000,
      });
      setLoading(false);
    }
  };

  const getUserFn = async () => {
    setUser(profile as any);
  };

  useEffect(() => {
    if (profile) {
      getUserFn();
    }
  }, [profile]);

  return (
    <>
      <ResetPasswordModal
        isOpen={isOpen}
        onClose={onClose}
        email={user.email}
      />
      <form onSubmit={updateUserFn}>
        <Box w={"100%"}>
          <Flex flexDir={"column"} w={"100%"} className="inter">
            <Flex
              w={"100%"}
              justify={"flex-end"}
              alignItems={"center"}
              py={"20px"}
            >
              <Btn
                p="1.5em 3em"
                bg="#3170A6"
                type={"submit"}
                isLoading={loading}
                // loadingText="submitting"
                disabled={loading}
              >
                Update Profile
              </Btn>
            </Flex>

            <Flex
              w={"100%"}
              alignItems={"center"}
              pt={"24px"}
              pb={"20px"}
              borderBottom={"1px solid var(--soft200)"}
            >
              <Flex w={"100%"} gap={"24px"} justifyContent={"space-between"}>
                <Box>
                  <Text
                    fontWeight={500}
                    fontSize={"14px"}
                    textColor={"var(--strong950)"}
                    mb={"6px"}
                  >
                    Profile Photo
                  </Text>
                  <Text
                    fontWeight={400}
                    fontSize={"12px"}
                    textColor={"var(--sub600)"}
                  >
                    Min 400x400px, PNG or JPEG Formats.
                  </Text>
                </Box>
                <Flex
                  alignItems={"center"}
                  w={"40%"}
                  gap={"20px"}
                  h={"fit-content"}
                >
                  <Box
                    w={"fit-content"}
                    h={"fit-content"}
                    borderRadius={"999px"}
                    overflow={"hidden"}
                  >
                    <Image
                      width={40}
                      height={40}
                      borderRadius={"50%"}
                      src={user.avatar || "/avatar1.png"}
                      alt="/"
                    />
                  </Box>
                  {/* <Btn type={SubmitEvent}
                    bg={"transparent"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    w={"68px"}
                    h={"32px"}
                    borderRadius={"8px"}
                    textColor={"var(--primaryBase)"}
                    fontWeight={500}
                    fontSize={"14px"}
                    border={"1px solid var(--primaryBase)"}
                    _hover={{
                      bg: "#1A1D66",
                      textColor: "#FFF",
                    }}
                  >
                    Update
                  </Btn> */}
                </Flex>
              </Flex>
            </Flex>
            {settings.map((setting) => {
              return (
                <Flex
                  key={setting?.id}
                  w={"100%"}
                  alignItems={"center"}
                  py={"20px"}
                  borderBottom={"1px solid var(--soft200)"}
                >
                  <Flex
                    w={"100%"}
                    gap={"24px"}
                    justifyContent={"space-between"}
                  >
                    <Box w={"50%"}>
                      <Text
                        fontWeight={500}
                        fontSize={"14px"}
                        textColor={"var(--strong950)"}
                        mb={"6px"}
                      >
                        {setting?.type}
                      </Text>
                      <Text
                        fontWeight={400}
                        fontSize={"12px"}
                        textColor={"var(--sub600)"}
                      >
                        {setting?.description}
                      </Text>
                    </Box>
                    <Flex flexDir="column" gap={"12px"} w={"40%"}>
                      {/* <Text
                    fontWeight={500}
                    fontSize={"14px"}
                    textColor={"var(--strong950)"}
                    maxW={"180px"}
                  >
                    {setting?.info}
                  </Text> */}
                      <Input
                        type="text"
                        name={setting?.name}
                        width={"100%"}
                        value={setting?.info}
                        border={
                          inputIsinvalid(setting.name)
                            ? "1px solid var(--errorBase)"
                            : "1px solid #262626"
                        }
                        focusBorderColor={
                          inputIsinvalid(setting.name)
                            ? "1px solid var(--errorBase)"
                            : "1px solid #262626"
                        }
                        onBlur={() => onBlurHandler(setting.name)}
                        onChange={onChangeHandler}
                      />
                      {inputIsinvalid(setting.name) && (
                        <Text color="red.500" fontSize="12px">
                          {setting?.name} is invalid.
                        </Text>
                      )}
                      {/* <Text
                    display={"flex"}
                    alignItems={"center"}
                    fontWeight={500}
                    fontSize={"14px"}
                    textColor={"var(--primaryBase)"}
                  >
                    Edit <IoIosArrowForward />
                  </Text> */}
                    </Flex>
                  </Flex>
                </Flex>
              );
            })}
            <Flex
              w={"100%"}
              alignItems={"center"}
              py={"20px"}
              borderBottom={"1px solid var(--soft200)"}
            >
              <Flex w={"100%"} gap={"24px"} justifyContent={"space-between"}>
                <Box w={"50%"}>
                  <Text
                    fontWeight={500}
                    fontSize={"14px"}
                    textColor={"var(--strong950)"}
                    mb={"6px"}
                  >
                    {"State"}
                  </Text>
                  <Text
                    fontWeight={400}
                    fontSize={"12px"}
                    textColor={"var(--sub600)"}
                  >
                    {"Residential state"}
                  </Text>
                </Box>
                <Flex flexDir="column" gap={"12px"} w={"40%"}>
                  {/* <Text
                    fontWeight={500}
                    fontSize={"14px"}
                    textColor={"var(--strong950)"}
                    maxW={"180px"}
                  >
                    {setting?.info}
                  </Text> */}
                  <SelectInput
                    items={nigerianStates}
                    label=""
                    placeholder="select state"
                    name="state"
                    border={"1px solid #262626"}
                    value={user.state}
                    onChange={onChangeHandler}
                    // border={
                    //   inputIsinvalid(setting.name)
                    //     ? "1px solid var(--errorBase)"
                    //     : "1px solid #262626"
                    // }
                  />
                </Flex>
              </Flex>
            </Flex>
            {user?.role === "ADMIN" ? (
              <Flex w={"100%"} alignItems={"center"} py={"20px"}>
                <Flex
                  w={"100%"}
                  flexDir={{ base: "column", lg: "row" }}
                  justifyContent={"space-between"}
                  gap={"24px"}
                >
                  <Box>
                    <Text
                      fontWeight={500}
                      fontSize={"14px"}
                      textColor={"var(--strong950)"}
                      mb={"6px"}
                    >
                      Change Password
                    </Text>
                    <Text
                      fontWeight={400}
                      fontSize={"12px"}
                      textColor={"var(--sub600)"}
                    >
                      Update password for enhanced account security.
                    </Text>
                  </Box>
                  <Btn
                    bg={"transparent"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    w={"148px"}
                    h={"40px"}
                    borderRadius={"8px"}
                    textColor={"var(--sub600)"}
                    fontWeight={500}
                    fontSize={"14px"}
                    border={"1px solid var(--soft200)"}
                    // border={"1px solid var(--primaryBase)"}
                    _hover={{
                      bg: "#1A1D66",
                      textColor: "#FFF",
                    }}
                    onClick={onOpen}
                  >
                    Reset Password
                  </Btn>
                </Flex>
              </Flex>
            ) : (
              <></>
            )}
          </Flex>
        </Box>
      </form>{" "}
    </>
  );
};
